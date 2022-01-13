import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import LayerList from "@arcgis/core/widgets/LayerList";
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import TimeInterval from "@arcgis/core/TimeInterval";
import Legend from "@arcgis/core/widgets/Legend";
import "@arcgis/core/assets/esri/themes/light/main.css";

const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
`;

const Map: React.FC = (): JSX.Element => {
  const mapDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      //Add global API key from environment variables to access data
      const { REACT_APP_GLOBAL_API_KEY } = process.env;
      if (!REACT_APP_GLOBAL_API_KEY) {
        throw new Error("API key not found");
      }
      esriConfig.apiKey = `${REACT_APP_GLOBAL_API_KEY}`;

      //Add webmap
      const webmap = new WebMap({
        portalItem: {
          id: "71be6dbf62ca43db8f2658e9e440f139"
        }
      });

      const view = new MapView({
        container: mapDiv?.current,
        map: webmap
      });

      const bookmarks = new Bookmarks({
        view,
        // allows bookmarks to be added, edited, or deleted
        editingEnabled: true
      });

      const bkExpand = new Expand({
        view,
        content: bookmarks,
        expanded: false
      });

      const layerList = new LayerList({
        view
      });

      const lyrlistExpand = new Expand({
        view,
        content: layerList,
        expanded: false
      });
      // time slider widget initialization
      const timeSlider = new TimeSlider({
        container: "timeSlider",
        mode: "instant",
        view,
        timeVisible: true
      });

      const legend = new Legend({
        view
      });

      view.ui.add(legend, "bottom-left");
      //Add widget to the bottom-left corner of view
      view.ui.add(timeSlider, "bottom-right");
      // Add the widget to the top-right corner of the view
      view.ui.add(bkExpand, "top-right");
      // Adds widget below other elements in the top left corner of the view
      view.ui.add(lyrlistExpand, {
        position: "top-left"
      });

      // bonus - how many bookmarks in the webmap?
      webmap.when(() => {
        if (webmap.bookmarks && webmap.bookmarks.length) {
          console.log("Bookmarks: ", webmap.bookmarks.length);
        } else {
          console.log("No bookmarks in this webmap.");
        }
        //Find time aware layer
        const layer = webmap.allLayers.find((layer) => {
          return layer.title === "REMSS_SeaSurfaceTemp";
        });

        //Cast layer to MapImageLayer to access time info and set up TimeSlider
        const timeLayer = layer as MapImageLayer;
        timeLayer.when(() => {
          const fullTimeExtent = timeLayer.timeInfo.fullTimeExtent;
          // set up time slider properties
          timeSlider.fullTimeExtent = fullTimeExtent;
          timeSlider.stops = {
            interval: new TimeInterval({
              value: 1,
              unit: "years"
            })
          };
          timeSlider.tickConfigs = [
            {
              mode: "position",
              values: [
                // dates to be used for ticks and labels
                new Date(2010, 0, 1),
                new Date(2012, 0, 1),
                new Date(2014, 0, 1),
                new Date(2016, 0, 1),
                new Date(2018, 0, 1),
                new Date(2020, 0, 1)
              ].map((date) => date.getTime()),
              labelsVisible: true, // display labels for the ticks
              labelFormatFunction: (value) => {
                // format the labels for the ticks
                const date = new Date(value);
                return `${date.getUTCFullYear()}`; // show full year values
              }
            }
          ];
        });
      });
    }
  }, [mapDiv]);

  return <MapDiv ref={mapDiv} />;
};

export default Map;
