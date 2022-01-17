import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import * as route from "@arcgis/core/rest/route";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import Locate from "@arcgis/core/widgets/Locate";
import * as locator from "@arcgis/core/rest/locator";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Point from "@arcgis/core/geometry/Point";
import Color from "@arcgis/core/Color";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

import { ApiKey } from "@esri/arcgis-rest-auth";
import {
  queryDemographicData,
  IQueryDemographicDataResponse
} from "@esri/arcgis-rest-demographics";

import "@esri/calcite-components/dist/components/calcite-alert";
import { CalciteAlert } from "@esri/calcite-components-react";

const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 95%;
  width: 100%;
`;

type DataAttributes = { TOTPOP: string; AVGHHSZ: string };

const CollectionMap: React.FC = (): JSX.Element => {
  const mapDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  const routeUrl =
    "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
  const geocoderUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  useEffect(() => {
    if (mapDiv.current) {
      //Add global API key from environment variables to access data
      const { REACT_APP_GLOBAL_API_KEY } = process.env;
      if (!REACT_APP_GLOBAL_API_KEY) {
        throw new Error("API key not found");
      }
      esriConfig.apiKey = REACT_APP_GLOBAL_API_KEY;
      const authentication = new ApiKey({
        key: REACT_APP_GLOBAL_API_KEY
      });

      const map = new WebMap({
        portalItem: {
          // autocasts as new PortalItem()
          id: "fa1a0336d3a9475ca4099c9fe1ee697f"
        }
      });
      // Create the MapView
      const view = new MapView({
        container: mapDiv.current,
        map
      });

      // GeoEnrichment
      const getDemographicData = (address: string, city: string, point: Point) => {
        // Request demographic data
        queryDemographicData({
          studyAreas: [
            {
              geometry: {
                x: point.longitude,
                y: point.latitude
              }
            }
          ],
          authentication
        }).then(({ results }: IQueryDemographicDataResponse) => {
          if (
            !!results &&
            results[0].value.FeatureSet.length > 0 &&
            results[0].value.FeatureSet[0].features.length > 0
          ) {
            const attributes = results[0].value.FeatureSet[0].features[0]
              .attributes as DataAttributes;
            showData(address, city, attributes, point);
          } else {
            showAddress(address, point);
          }
        });
      };

      const showData = (
        address: string,
        city: string,
        attributes: DataAttributes,
        location: Point
      ) => {
        const title = `Global facts near ${city}`;
        const content = `Address: ${address}<br>Population: ${attributes.TOTPOP}<br>Average Household Size: ${attributes.AVGHHSZ}`;
        view.popup.open({
          location,
          title,
          content
        });

        const buffer: any = geometryEngine.geodesicBuffer(location, 1, "miles");
        const graphicBuffer = new Graphic({
          geometry: buffer,
          symbol: new SimpleFillSymbol({
            color: [50, 50, 50, 0.1],
            outline: {
              color: [0, 0, 0, 0.25],
              width: 0.5
            }
          })
        });
        view.graphics.removeAll();
        view.graphics.add(graphicBuffer);
      };

      const showAddress = (address: string, pt: Point) => {
        view.popup.open({
          title:
            +Math.round(pt.longitude * 100000) / 100000 +
            ", " +
            Math.round(pt.latitude * 100000) / 100000,
          content: address,
          location: pt
        });
      };

      view.on("click", function (evt) {
        view.hitTest(evt).then(function (response) {
          if (response.results.length === 1) {
            const params = {
              location: evt.mapPoint
            };
            locator.locationToAddress(geocoderUrl, params).then(
              function (response) {
                // Show the address found
                const address = response.address;
                const city = response.attributes.City || response.attributes.Region;
                getDemographicData(address, city, params.location);
              },
              function () {
                // Show no address found
                showAddress("No address found.", evt.mapPoint);
              }
            );
          }
        });
      });

      // Routing
      const routeLayer = new GraphicsLayer();
      map.add(routeLayer);
      const locate = new Locate({
        view,
        useHeadingEnabled: false,
        goToLocationEnabled: false
      });

      const routeParams = new RouteParameters({
        stops: new FeatureSet(),
        outSpatialReference: new SpatialReference({ wkid: 3857 })
      });

      const routeMe = () => {
        (document.getElementById("routing") as HTMLCalciteAlertElement).active = true;
        locate.locate().then(() => {
          //Get location of user and debris
          const userLocation = locate.graphic;
          const debrisLocation = view.popup.selectedFeature;
          //Add routeParamter stops
          (routeParams.stops as FeatureSet).features.push(userLocation, debrisLocation);
          if ((routeParams.stops as FeatureSet).features.length >= 2) {
            (document.getElementById("routing") as HTMLCalciteAlertElement).active = false;
            route
              .solve(routeUrl, routeParams)
              .then((data: any) => {
                // Adds the solved route to the map as a graphic
                const routeResult = data.routeResults[0].route;

                view.goTo(routeResult, {
                  animate: true,
                  duration: 2000,
                  easing: "ease-in-out"
                });

                routeResult.symbol = new SimpleLineSymbol({
                  color: new Color({ r: 200, g: 255, b: 255, a: 0.5 }),
                  width: "4px"
                });

                routeLayer.add(routeResult);
              })
              .catch((e) => {
                console.log(e);
                (document.getElementById("routing_alert") as HTMLCalciteAlertElement).active = true;
              });
          }
        });
      };
      view.when(() => {
        const layer: any = map.layers.getItemAt(1);
        // const layer = map.layers.getItemAt(1) as __esri.FeatureLayer;

        layer.popupTemplate.actions = [
          new ActionButton({
            title: "Route me",
            id: "route-to-debris",
            className: "esri-icon-directions2"
          })
        ];

        // Event handler that fires each time an action is clicked.
        view.popup.on("trigger-action", (event) => {
          // Execute the measureThis() function if the measure-this action is clicked
          if (event.action.id === "route-to-debris") {
            routeMe();
          }
        });
      });
    }
  }, [mapDiv]);

  return (
    <>
      <MapDiv ref={mapDiv} />
      <CalciteAlert color="green" icon="route-to" id="routing" label="">
        <div slot="message">Calculating route... </div>
      </CalciteAlert>

      <CalciteAlert color="red" icon="information" id="routing_alert" label="">
        <div slot="message">
          Oops! No route was found to this point. Please try again with other points that are on or
          closer to the continent.{" "}
        </div>
      </CalciteAlert>
    </>
  );
};

export default CollectionMap;
