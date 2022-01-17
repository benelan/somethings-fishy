import "./BioMap.css";
import React, { useRef, useEffect } from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-link";
import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-popover";
import "@esri/calcite-components/dist/components/calcite-popover-manager";
import {
  CalciteCard,
  CalciteAction,
  CalcitePanel,
  CalciteIcon,
  CalciteBlock,
  CalciteButton,
  CalciteLink,
  CalciteModal,
  CalcitePopover,
  CalcitePopoverManager
} from "@esri/calcite-components-react";
import styled from "styled-components";

// jsapi imports
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import SubtypeGroupLayer from "@arcgis/core/layers/SubtypeGroupLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import LayerList from "@arcgis/core/widgets/LayerList";
import Expand from "@arcgis/core/widgets/Expand";
import FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";

// import esriConfig from "@arcgis/core/config";

const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
`;

interface featureSet {
  features: any;
  area: any;
  screenshot: any;
  H: number;
}

// globals
let selectedFeatures: any = [];
let highlight: any;
let featureLayerView: FeatureLayerView;
let graphicsLayer: GraphicsLayer;
let view: MapView;
let sketchViewModel: SketchViewModel;
let stgl: SubtypeGroupLayer;

const editableFeature: any = { feature: null, species: null };
let featureSet1: featureSet = { features: null, area: null, screenshot: null, H: 0 };
let featureSet2: featureSet = { features: null, area: null, screenshot: null, H: 0 };
const webStyleSymbolUrl =
  "https://arcgis.com/sharing/rest/content/items/beb787401c41401ba1eef6ce161d6664/data";

// ui
let rectangleBtn: any;
let clearBtn: any;
let cancelBtnTwo: any;
let cancelBtnThree: any;
let fishCard: any;
let whaleCard: any;
let lobsterCard: any;
let turtleCard: any;

const BioMap: React.FC = (): JSX.Element => {
  const mapDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (mapDiv.current) {
      graphicsLayer = new GraphicsLayer({ title: "Area Layer", listMode: "hide" });

      const sublayers: any = [
        {
          subtypeCode: 1, // Fish
          visible: true,
          renderer: createMarineSymbol("Fish"),
          title: "Fish"
        },
        {
          subtypeCode: 2, // Dolphin
          visible: true,
          renderer: createMarineSymbol("Dolphin"),
          title: "Dolphin"
        },
        {
          subtypeCode: 3, // Whale
          visible: true,
          renderer: createMarineSymbol("Whale"),
          title: "Whale"
        },
        {
          subtypeCode: 4, // Crab
          visible: true,
          renderer: createMarineSymbol("Crab"),
          title: "Crab"
        },
        {
          subtypeCode: 5, // Lobster
          visible: true,
          renderer: createMarineSymbol("Lobster"),
          title: "Lobster"
        },
        {
          subtypeCode: 6, // Seal/Sea Lion
          visible: true,
          renderer: createMarineSymbol("SealSeaLion"),
          title: "Seal/Sea Lion"
        },
        {
          subtypeCode: 7, // Manatee
          visible: true,
          renderer: createMarineSymbol("Manatee"),
          title: "Manatee"
        },
        {
          subtypeCode: 8, // Oyster/Clam
          visible: true,
          renderer: createMarineSymbol("OysterClam"),
          title: "Oyster/Clam"
        },
        {
          subtypeCode: 9, // Turtle
          visible: true,
          renderer: createMarineSymbol("Turtle"),
          title: "Turtle"
        },
        {
          subtypeCode: 10, // Echinoderm
          visible: false,
          renderer: createMarineSymbol("Echinoderm"),
          title: "Echinoderm"
        }
      ];

      // initializing a SubtypeGroupLayer
      stgl = new SubtypeGroupLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/MarineLife/FeatureServer/0",
        outFields: ["*"],
        sublayers: sublayers
      });

      const map = new Map({
        basemap: "streets-night-vector",
        layers: [stgl, graphicsLayer]
      });

      view = new MapView({
        container: mapDiv.current,
        map,
        zoom: 6,
        center: [-90.21093696355662, 27.08863619791193]
      });

      const wheelEvtHandler = view.on("mouse-wheel", (event) => {
        event.stopPropagation();
        window.scrollBy(0, 30);
      });
      view.on("click", () => wheelEvtHandler.remove());

      sketchViewModel = new SketchViewModel({
        view,
        layer: graphicsLayer
      });

      sketchViewModel.on("create", (createEvent) => {
        if (createEvent.state === "complete") {
          if (createEvent.graphic.geometry.type === "point") {
            handlePointCreate(createEvent.graphic.geometry);
            return;
          }
          queryIntersectingFeatures(createEvent.graphic.geometry);
          const filteredPolygons = filterPolygons(graphicsLayer.graphics);
          if (filteredPolygons.items.length > 1) {
            // disable the select area button
            // can only create two rectangles at a time
            toggleAreaBtn(false);
          }
        }
      });

      // initializing the LayerList widget
      const layerList = new LayerList({
        view: view
      });
      // add the widget to the view
      view.ui.add(layerList, "bottom-left");

      const infoExpand = new Expand({
        view,
        content: "info-panel",
        expanded: false,
        expandIconClass: "esri-icon-description",
        expandTooltip: "About the Diversity Index"
      });

      view.ui.add(infoExpand, "top-left");

      view.when(() => {
        console.log("loaded biodiversity map");
        // set the layerview for client-side querying and highlighting
        view.whenLayerView(stgl).then((layerView) => {
          featureLayerView = layerView as FeatureLayerView;
        });

        openModal("initial-area-modal");
      });

      // ui
      rectangleBtn = document.getElementById("rectangleBtn");
      clearBtn = document.getElementById("clearBtn");
      cancelBtnTwo = document.getElementById("cancel-second-modal");
      cancelBtnThree = document.getElementById("cancel-screenshot-modal");
      fishCard = document.getElementById("fishCard");
      whaleCard = document.getElementById("whaleCard");
      lobsterCard = document.getElementById("lobsterCard");
      turtleCard = document.getElementById("turtleCard");

      openPopover("popover");

      rectangleBtn.onclick = () => {
        chooseArea();
      };
      clearBtn.onclick = () => {
        clearAreas(highlight);
      };
      cancelBtnTwo.onclick = () => {
        closeModal("second-area-modal");
      };
      cancelBtnThree.onclick = () => {
        closeModal("screenshot-index-modal");
      };
      fishCard.addEventListener("click", (evt: MouseEvent) => {
        handleCardSelection(evt, "Fish");
      });
      whaleCard.addEventListener("click", (evt: MouseEvent) => {
        handleCardSelection(evt, "Whale");
      });
      lobsterCard.addEventListener("click", (evt: MouseEvent) => {
        handleCardSelection(evt, "Lobster");
      });
      turtleCard.addEventListener("click", (evt: MouseEvent) => {
        handleCardSelection(evt, "Turtle");
      });
    }
  }, [mapDiv]);

  // FUNCTIONS
  // create web style symbol from the symbol name
  function createMarineSymbol(name: string) {
    return {
      type: "simple",
      symbol: new WebStyleSymbol({
        styleUrl: webStyleSymbolUrl,
        name: name
      })
    };
  }

  function unselectFeatures(highlight: any) {
    if (highlight) {
      highlight.remove();
    }
  }

  async function queryIntersectingFeatures(area: any) {
    // Query for the features in the layerview that are within the extent of
    // the area drawn
    const intersectingFeatures = await featureLayerView.queryFeatures({
      geometry: area,
      outFields: featureLayerView.availableFields,
      returnGeometry: true
    });

    // remove highlight of the first selection
    // workaround to highlight clearing issue
    unselectFeatures(highlight);

    intersectingFeatures.features.forEach((feature: any) => {
      selectedFeatures.push(feature);
    });
    highlight = featureLayerView.highlight(selectedFeatures);

    // keep track of how many polygons there are on the map to handle
    // modal instruction display timing and store the two datasets
    // to calculate and screenshot the areas
    const filteredPolygons = filterPolygons(graphicsLayer.graphics);
    if (filteredPolygons.items.length === 1) {
      openModal("second-area-modal");
      featureSet1.features = intersectingFeatures.features;
      featureSet1.area = area.extent;
    } else if (filteredPolygons.items.length === 2) {
      featureSet2.features = intersectingFeatures.features;
      featureSet2.area = area.extent;
      calculateShannonIndex(featureSet1, featureSet2);
    }
  }

  function clamp(value: any, from: any, to: any) {
    return value < from ? from : value > to ? to : value;
  }

  async function storeScreenshot(area: any) {
    const screenshot = await view.takeScreenshot({ area: area, format: "png" });
    return screenshot;
  }

  function toggleAreaBtn(isVisible: boolean) {
    rectangleBtn.style.display = isVisible ? "block" : "none";
  }

  function chooseArea() {
    closePopover("popover");

    let area: any = null;

    // listen for drag events and compute the selected area
    const dragHandler = view.on("drag", async (event) => {
      // prevent navigation in the view
      event.stopPropagation();

      // when the user starts dragging or is dragging
      if (event.action !== "end") {
        // calculate the extent of the area selected by dragging the cursor
        const xmin = clamp(Math.min(event.origin.x, event.x), 0, view.width);
        const xmax = clamp(Math.max(event.origin.x, event.x), 0, view.width);
        const ymin = clamp(Math.min(event.origin.y, event.y), 0, view.height);
        const ymax = clamp(Math.max(event.origin.y, event.y), 0, view.height);
        area = {
          x: xmin,
          y: ymin,
          width: xmax - xmin,
          height: ymax - ymin
        };
      }
      // when the user stops dragging
      else {
        // remove the drag event listener from the SceneView
        dragHandler.remove();
        const filteredPolygons = filterPolygons(graphicsLayer.graphics);
        if (filteredPolygons.items.length === 1) {
          featureSet1.screenshot = await storeScreenshot(area);
        } else if (filteredPolygons.items.length === 2) {
          featureSet2.screenshot = await storeScreenshot(area);
        }
      }
    });

    sketchViewModel.create("rectangle");
  }

  function filterPolygons(graphics: any) {
    return graphics.filter((graphic: Graphic) => graphic.geometry.type === "polygon");
  }

  function clearAreas(highlight: any) {
    graphicsLayer.removeAll();
    toggleAreaBtn(true);
    unselectFeatures(highlight);
    selectedFeatures = [];
    featureSet1 = { features: null, area: null, screenshot: null, H: 0 };
    featureSet2 = { features: null, area: null, screenshot: null, H: 0 };
  }

  function calculateProportion(frequency: number, total: number) {
    return frequency / total;
  }

  // get total number of individuals (N)
  // also known as total biomass
  function getTotalNumOfSpecies(speciesData: any) {
    let sum = 0;
    speciesData.forEach((record: any) => {
      sum += record.frequency;
    });
    return sum;
  }

  // calculate the natural log of a species proportion
  function calculateNaturalLog(proportion: number) {
    return Math.log(proportion);
  }

  function getSWIndex(data: any): number {
    let H: any = 0;

    data.forEach((record: any) => {
      // 1. Add proportion to the dataset
      const totalSpecies = getTotalNumOfSpecies(data);
      record["pi"] = calculateProportion(record.frequency, totalSpecies);

      // 2. Calculate the naturla log of each proportion
      // and add it to the dataset
      record["ln_pi"] = calculateNaturalLog(record.pi);

      // 3. Multiply the proportions by the natural log of the
      // proportions
      record["pi_ln_pi"] = record.pi * record.ln_pi;

      // 4. Add the sum of the (pi) * ln(pi)
      H += record.pi_ln_pi;
    });

    return (H = H.toFixed(2) * -1);
  }

  // formula to calulate Shannon-Weiner Index
  function calculateShannonIndex(fs1: featureSet, fs2: featureSet) {
    const community1 = createDataSchema(fs1.features);
    const community2 = createDataSchema(fs2.features);

    const H1 = getSWIndex(community1);
    const H2 = getSWIndex(community2);

    featureSet1.H = H1;
    featureSet2.H = H2;
    console.log(`community 1: ${H1} vs community 2: ${H2}`);
    showPreview(featureSet1.screenshot, featureSet2.screenshot);
  }

  /**
   * expected output Schema
   * const data = [
   *  { species: "A", frequency: 40 },
   *  { species: "B", frequency: 10 },
   *  ...
   * ]
   */
  function createDataSchema(features: any) {
    const speciesTempStore: any = [];
    const data: any = [];
    features.forEach((feature: any) => {
      const speciesType = feature.attributes.TYPE;
      // species does not exist in the store yet
      if (!speciesTempStore.includes(speciesType)) {
        speciesTempStore.push(speciesType);
        data.push({ species: speciesType, frequency: 1 });
      } else {
        // species is already in the store, increment the frequency
        const existingSpeciesRecord = data.find((element: any) => element.species === speciesType);
        existingSpeciesRecord.frequency += 1;
      }
    });
    return data;
  }

  function showPreview(screenshot1: any, screenshot2: any) {
    const img1: any = document.getElementById("img1");
    const img2: any = document.getElementById("img2");
    const indexDiv1: any = document.getElementById("indexDiv1");
    const indexDiv2: any = document.getElementById("indexDiv2");
    const resultSpan: any = document.getElementById("resultsSpan");

    if (img1 && img2) {
      img1.width = screenshot1.data.width;
      img1.height = screenshot1.data.height;
      img1.src = screenshot1.dataUrl;
      img2.width = screenshot2.data.width;
      img2.height = screenshot2.data.height;
      img2.src = screenshot2.dataUrl;

      if (indexDiv1 && indexDiv2 && resultSpan) {
        indexDiv1.innerHTML = featureSet1.H;
        indexDiv2.innerHTML = featureSet2.H;
        resultSpan.innerText =
          featureSet1.H > featureSet2.H
            ? "Community 1 has a better species diversity index!"
            : "Community 2 has a better species diversity index!";

        openModal("screenshot-index-modal");
      }
    }
  }

  function handleCardSelection(evt: any, speciesName: string) {
    if (sketchViewModel.state === "active") {
      sketchViewModel.cancel();
    }
    setSketchViewModelSymbol(speciesName);
    sketchViewModel.create("point");
    editableFeature.species = speciesName;
  }

  function handlePointCreate(geometry: any) {
    const attributes: any = {};
    attributes["TYPE"] = getSubtypeCode(editableFeature.species);

    const newMarineFeauture = new Graphic({
      geometry,
      attributes
    });

    stgl
      .applyEdits({
        addFeatures: [newMarineFeauture]
      })
      .then(() => console.log("added feature successfully"))
      .catch(() => console.log("failed to add this feature"));
  }

  function getSubtypeCode(name: string) {
    let code: any = null;
    switch (name) {
      case "Fish":
        code = 1;
        break;
      case "Dolphin":
        code = 2;
        break;
      case "Whale":
        code = 3;
        break;
      case "Crab":
        code = 4;
        break;
      case "Lobster":
        code = 5;
        break;
      case "SealSeaLion":
        code = 6;
        break;
      case "Manatee":
        code = 7;
        break;
      case "OysterClam":
        code = 8;
        break;
      case "Turtle":
        code = 9;
        break;
      case "Echinoderm":
        code = 10;
        break;
      default:
        console.log("no species found to get subtype code...");
    }
    return code;
  }

  function setSketchViewModelSymbol(name: string) {
    const renderer = createMarineSymbol(name);
    sketchViewModel.pointSymbol = renderer.symbol;
  }

  function openModal(id: string) {
    const modal: any = document.getElementById(id);
    if (modal) {
      modal.active = true;
    }
  }

  function closeModal(id: string) {
    const modal: any = document.getElementById(id);
    if (modal) {
      modal.active = false;
    }
  }

  function closePopover(id: string) {
    const popover: any = document.getElementById(id);
    if (popover) {
      popover.open = false;
    }
  }

  function openPopover(id: string) {
    const popover: any = document.getElementById(id);
    if (popover) {
      popover.open = true;
    }
  }

  //return <MapDiv ref={mapDiv} />;
  return (
    <div style={{ padding: "0", margin: "0", height: "100%", width: "100%" }}>
      <MapDiv ref={mapDiv} />
      <CalcitePanel heading="Shannon Diversity Index" id="cardPanel">
        <CalciteBlock heading="" id="headingBlock">
          <CalciteAction id="rectangleBtn" slot="control" text="" title="Draw an area">
            <CalciteIcon icon="cursor-marquee" scale="m" />
          </CalciteAction>
          <CalciteAction id="clearBtn" slot="control" text="" title="Clear areas">
            <CalciteIcon icon="trash" scale="m" />
          </CalciteAction>
          <CalciteAction id="infoBtn" slot="control" text="" title="About">
            <CalciteIcon icon="information" scale="m" />
          </CalciteAction>
        </CalciteBlock>
        <div id="fishCard" style={{ width: "280px" }}>
          <CalciteCard className="editable-card" id="fishCard">
            <span slot="title">Red Snapper</span>
            <div slot="subtitle">
              Yound red snappers are food for large fish that share their habitat.
            </div>
            <img
              alt="fish"
              slot="thumbnail"
              src="https://jbanuelos1.esri.com/images/red_snapper.png"
            />
            <div slot="footer-leading">
              <CalciteButton icon-start="plus" scale="s" slot="footer-leading" />
            </div>
            <div slot="footer-trailing">
              <CalciteLink
                href="https://www.fisheries.noaa.gov/species/red-snapper"
                target="_blank"
              >
                About the Species
              </CalciteLink>
            </div>
          </CalciteCard>
        </div>
        <div style={{ width: "280px" }}>
          <CalciteCard className="editable-card" id="turtleCard">
            <span slot="title">Green Turtle</span>
            <div slot="subtitle">Green turtles can live for 70 years or more!</div>
            <img
              alt="turtle"
              slot="thumbnail"
              src="https://jbanuelos1.esri.com/images/green_turtle.jpg"
            />
            <div slot="footer-leading">
              <CalciteButton icon-start="plus" scale="s" slot="footer-leading" />
            </div>
            <div slot="footer-trailing">
              <CalciteLink
                href="https://www.fisheries.noaa.gov/species/green-turtle"
                target="_blank"
              >
                About the Species
              </CalciteLink>
            </div>
          </CalciteCard>
        </div>
        <div style={{ width: "280px" }}>
          <CalciteCard class="editable-card" id="whaleCard">
            <span slot="title">Baleen Whale</span>
            <div slot="subtitle">
              The Baleen whale can weight up to 60,000 pounds! (5 times an elephant)
            </div>
            <img
              alt="whale"
              slot="thumbnail"
              src="https://jbanuelos1.esri.com/images/baleen_whale.jpg"
            />
            <div slot="footer-leading">
              <CalciteButton icon-start="plus" scale="s" slot="footer-leading" />
            </div>
            <div slot="footer-trailing">
              <CalciteLink
                href="https://www.fisheries.noaa.gov/feature-story/new-species-baleen-whale-gulf-mexico"
                target="_blank"
              >
                About the Species
              </CalciteLink>
            </div>
          </CalciteCard>
        </div>
        <div style={{ width: "280px" }}>
          <CalciteCard class="editable-card" id="lobsterCard">
            <span slot="title">Spiny Lobster</span>
            <div>Spiny lobster is a common lobster found in the Gulf of Mexico</div>
            <img
              alt="lobster"
              slot="thumbnail"
              src="https://jbanuelos1.esri.com/images/spiny_lobster.jpg"
            />
            <div slot="footer-leading">
              <CalciteButton icon-start="plus" scale="s" slot="footer-leading" />
            </div>
            <div slot="footer-trailing">
              <CalciteLink
                href="https://www.fisheries.noaa.gov/management-plan/gulf-mexico-and-south-atlantic-spiny-lobster-fishery-management-plan"
                target="_blank"
              >
                About the Species
              </CalciteLink>
            </div>
          </CalciteCard>
        </div>
      </CalcitePanel>
      <CalcitePanel heading="Shannon-Wiener Index" id="info-panel">
        <div id="info-panel-content">
          <p className="p-math">
            `H = &#8212;<span className="span-math">&Sigma;</span>P<sub>i</sub> ln(P<sub>i</sub>)`
          </p>
          <p>
            <b>
              P<sub>i</sub>
            </b>{" "}
            - the proportion of individuals in a species
            <br />
            <b>H</b> - the index
          </p>
          <p>
            The <b>Shannon-Wiener Index</b> is a diversity index widely used to compare species
            diversity. This index is not meant to be a measurement of diversity, but a tool to
            compare diversity between one or more communities of species.
          </p>
        </div>
      </CalcitePanel>
      <CalciteModal aria-labelledby="modal-title" id="second-area-modal">
        <div id="modal-title" slot="header">
          Choose Another Community!
        </div>
        <div slot="content">Almost Done! Draw your second area to compare communities!</div>
        <CalciteButton appearance="outline" id="cancel-second-modal" slot="secondary" width="full">
          Okay
        </CalciteButton>
      </CalciteModal>
      <CalciteModal aria-labelledby="modal-title" id="screenshot-index-modal">
        <div id="modal-title" slot="header">
          <span id="resultsSpan" />
        </div>
        <div className="card-container" id="screenshotDiv" slot="content">
          <CalciteCard>
            <img alt="community1" id="img1" slot="thumbnail" />
            <h3 slot="title">
              Diversity Index: <span id="indexDiv1" />
            </h3>
            <span slot="subtitle">Community 1</span>
          </CalciteCard>
          <CalciteCard>
            <img alt="community2" id="img2" slot="thumbnail" />
            <h3 slot="title">
              Diversity Index: <span id="indexDiv2" />
            </h3>
            <span slot="subtitle">Community 2</span>
          </CalciteCard>
        </div>
        <CalciteButton
          appearance="outline"
          id="cancel-screenshot-modal"
          slot="secondary"
          width="full"
        >
          Okay
        </CalciteButton>
      </CalciteModal>
      <CalcitePopoverManager>
        <CalcitePopover
          id="popover"
          label="Example label"
          placement="bottom-leading"
          referenceElement="rectangleBtn"
        >
          <h4 style={{ padding: "0 10px", display: "flex;flex-direction:row" }}>
            Click to start drawing your area!
          </h4>
        </CalcitePopover>
      </CalcitePopoverManager>
    </div>
  );
};

export default BioMap;
