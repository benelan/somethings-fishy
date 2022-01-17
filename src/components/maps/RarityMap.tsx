import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import Legend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as colorRendererCreator from "@arcgis/core/smartMapping/renderers/color";

const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
`;

const RarityMap: React.FC = (): JSX.Element => {
  const mapDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (mapDiv.current) {
      //Add global API key from environment variables to access data
      const { REACT_APP_GLOBAL_API_KEY } = process.env;
      if (!REACT_APP_GLOBAL_API_KEY) {
        throw new Error("API key not found");
      }
      esriConfig.apiKey = REACT_APP_GLOBAL_API_KEY;

      //Add webmap
      const webmap = new WebMap({
        portalItem: {
          id: "f3845511fa5a43e8a41e4f2c4de1dff5"
        }
      });

      const view = new MapView({
        container: mapDiv?.current,
        map: webmap
      });

      //Add legend from webmap
      const legend = new Legend({
        view
      });
      const legendExpand = new Expand({
        view,
        content: legend,
        expanded: true
      });
      view.ui.add(legendExpand, "top-right");

      webmap.when(() => {
        //Find rarity layer
        const layer = webmap.allLayers.find((layer) => {
          return layer.title === "Result_Protected_Areas_Rarity";
        });
        //Cast layer to Feature layer to set up smart mapping
        const rarityLayer = layer as FeatureLayer;
        rarityLayer.when(() => {
          //Do stuff to renderer
        });
      });
    }
  }, [mapDiv]);

  return <MapDiv ref={mapDiv} />;
};

export default RarityMap;
