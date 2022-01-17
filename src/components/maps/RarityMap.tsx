//UI Imports
import React, { useRef, useEffect } from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-button";
import {
  CalciteButton,
  CalciteCard,
  CalciteLabel,
  CalciteSlider
} from "@esri/calcite-components-react";
import styled from "styled-components";

//JS API Imports
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import Legend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as relationshipRendererCreator from "@arcgis/core/smartMapping/renderers/relationship";

import "./RarityMap.css";

const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 95%;
  width: 100%;
`;

//Global Vars
let rarityLayer: FeatureLayer;
let view: MapView;

let slider;
let resetButton;

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

      view = new MapView({
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
      view.ui.add("controls", "bottom-left");

      webmap.when(() => {
        //Find rarity layer
        const layer = webmap.allLayers.find((layer) => {
          return layer.title === "Spatial Analysis Result: Protected Proportion vs. Species Rarity";
        });
        rarityLayer = layer as FeatureLayer;
        //console.log(rarityLayer);
        rarityLayer.renderer.authoringInfo.field1.label = "All Species Rarity";
        rarityLayer.renderer.authoringInfo.field2.label = "Protected Proportion";
        slider = document.getElementById("all-species-slider") as HTMLCalciteSliderElement;
        slider.addEventListener("calciteSliderInput", updateRenderer);
        resetButton = document.getElementById("reset-slider-button") as HTMLCalciteButtonElement;
        resetButton.addEventListener("click", resetFilter);
      });
    }
  }, [mapDiv]);

  //Functions
  function updateRenderer(event: Event) {
    const propName = (event.target as HTMLCalciteSliderElement).id;
    const propValue = (event.target as HTMLCalciteSliderElement).value;
    if (propName && propValue != null) {
      const tempLayer = rarityLayer;
      tempLayer.definitionExpression = "Rar_all > " + propValue;
      //let tempRenderer = rarityLayer.renderer.clone();
      const params = {
        layer: tempLayer,
        view,
        field1: {
          field: "Rar_all"
        },
        field2: {
          field: "sum_Area_SquareKilometers",
          label: "Summarized Area"
        },
        focus: "HH", // changes orientation of the legend
        numClasses: 3 // 2x2 grid (value can also be 3 or 4)
      };
      // That's it! Now apply the renderer to your layer
      relationshipRendererCreator.createRenderer(params).then((response) => {
        rarityLayer.renderer = response.renderer;
      });
    }
  }
  function resetFilter() {
    rarityLayer.definitionExpression = "";
    slider = document.getElementById("all-species-slider") as HTMLCalciteSliderElement;
    slider.value = 30;
    const params = {
      layer: rarityLayer,
      view,
      field1: {
        field: "Rar_all"
      },
      field2: {
        field: "sum_Area_SquareKilometers",
        label: "Summarized Area",
        normalizationField: "AREA_KM2"
      },
      focus: "HH", // changes orientation of the legend
      numClasses: 3, // 2x2 grid (value can also be 3 or 4)
      defaultSymbolEnabled: false
    };
    // That's it! Now apply the renderer to your layer
    relationshipRendererCreator.createRenderer(params).then((response) => {
      rarityLayer.renderer = response.renderer;
    });
  }
  //return <MapDiv ref={mapDiv} />;
  return (
    <div style={{ padding: "0", margin: "0", height: "100%", width: "100%" }}>
      <MapDiv ref={mapDiv} />
      <CalciteCard class="calcite-theme-light" id="controls">
        <div slot="title">Relationship Filters</div>
        <div slot="subtitle">
          This slider allows you to filter the renderer based on the rarity of all species.
        </div>
        <CalciteLabel>
          All Species
          <CalciteSlider
            id="all-species-slider"
            labelHandles
            labelTicks
            max={100}
            min={30}
            min-value="30"
            step={10}
            ticks={10}
            value={30}
          />
        </CalciteLabel>
        <CalciteButton id="reset-slider-button" label="Reset" name="reset-button">
          Reset Filter
        </CalciteButton>
      </CalciteCard>
    </div>
  );
};

export default RarityMap;
