import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import LayerList from "@arcgis/core/widgets/LayerList";
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import TimeInterval from "@arcgis/core/TimeInterval";
import Legend from "@arcgis/core/widgets/Legend";

const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 95%;
  width: 100%;
`;

const SSTMap: React.FC = (): JSX.Element => {
  const mapDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      // Add global API key from environment variables to access data
      const { REACT_APP_GLOBAL_API_KEY } = process.env;
      if (!REACT_APP_GLOBAL_API_KEY) {
        throw new Error("API key not found");
      }
      esriConfig.apiKey = REACT_APP_GLOBAL_API_KEY;

      // Add webmap
      const webmap = new WebMap({
        portalItem: {
          id: "91b99738c05c4f2a9d63c351947a08b6"
        }
      });

      const view = new MapView({
        container: mapDiv?.current,
        map: webmap
      });

      // don't zoom while scrolling until map is clicked
      const wheelEvtHandler = view.on("mouse-wheel", (event) => {
        event.stopPropagation();
      });
      view.on("click", () => wheelEvtHandler.remove());

      // Add Widgets
      const layerList = new LayerList({
        view
      });

      const lyrlistExpand = new Expand({
        view,
        content: layerList,
        expanded: false,
        expandTooltip: "LayerList Widget"
      });

      const timeSlider = new TimeSlider({
        container: document.createElement("div"),
        mode: "instant",
        view,
        timeVisible: true
      });

      const timeExpand = new Expand({
        view,
        content: timeSlider.container,
        expanded: window.innerWidth > 650,
        expandTooltip: "TimeSlider Widget"
      });

      const legend = new Legend({
        view
      });

      // Add the widget to bottom left corner of view
      view.ui.add(legend, "bottom-left");
      // Add the widget to the top-right corner of the view
      view.ui.add(timeExpand, "top-right");
      // Add the widget to the top left corner of the view
      view.ui.add(lyrlistExpand, "top-left");

      webmap.when(() => {
        // Find time aware layer
        const layer = webmap.allLayers.find((layer) => {
          return layer.title === "Sea Surface Temperature (\u00B0C)";
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
          // Configure the ticks on the time slider so it goes once per year
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

export default SSTMap;
