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
import FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import Geometry from "@arcgis/core/geometry/Geometry";
import Collection from "@arcgis/core/core/Collection";
import Extent from "@arcgis/core/geometry/Extent";
import SubtypeSublayer from "@arcgis/core/layers/support/SubtypeSublayer";
// import esriConfig from "@arcgis/core/config";
import "./BioMap.css";

const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 95%;
  width: 100%;
`;

interface featureSet {
  features: Array<Graphic>;
  area: Extent;
  screenshot: __esri.Screenshot | null;
  H: number;
}

interface ScreenshotArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface speciesData {
  frequency: number;
  species: number | null;
  pi?: number;
  ln_pi?: number;
  pi_ln_pi?: number;
}

// globals
let selectedFeatures: Array<Graphic> = [];
let highlight: __esri.Handle;
let featureLayerView: FeatureLayerView;
let graphicsLayer: GraphicsLayer;
let view: MapView;
let sketchViewModel: SketchViewModel;
let stgl: SubtypeGroupLayer;

const editableFeature: { feature: Graphic | null; species: string } = {
  feature: null,
  species: ""
};
let featureSet1: featureSet = { features: [], area: new Extent(), screenshot: null, H: 0 };
let featureSet2: featureSet = { features: [], area: new Extent(), screenshot: null, H: 0 };
const webStyleSymbolUrl =
  "https://arcgis.com/sharing/rest/content/items/beb787401c41401ba1eef6ce161d6664/data";

// ui
let rectangleBtn: HTMLCalciteButtonElement;
let clearBtn: HTMLCalciteButtonElement;
let cancelBtnTwo: HTMLCalciteButtonElement;
let cancelBtnThree: HTMLCalciteButtonElement;
let fishCard: HTMLCalciteCardElement;
let whaleCard: HTMLCalciteCardElement;
let lobsterCard: HTMLCalciteCardElement;
let turtleCard: HTMLCalciteCardElement;

const BioMap: React.FC = (): JSX.Element => {
  const mapDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (mapDiv.current) {
      graphicsLayer = new GraphicsLayer({ title: "Area Layer", listMode: "hide" });

      const sublayers = [
        new SubtypeSublayer({
          subtypeCode: 1, // Fish
          renderer: createMarineSymbol("Fish"),
          title: "Fish"
        }),
        new SubtypeSublayer({
          subtypeCode: 2, // Dolphin
          renderer: createMarineSymbol("Dolphin"),
          title: "Dolphin"
        }),
        new SubtypeSublayer({
          subtypeCode: 3, // Whale
          renderer: createMarineSymbol("Whale"),
          title: "Whale"
        }),
        new SubtypeSublayer({
          subtypeCode: 4, // Crab
          renderer: createMarineSymbol("Crab"),
          title: "Crab"
        }),
        new SubtypeSublayer({
          subtypeCode: 5, // Lobster
          renderer: createMarineSymbol("Lobster"),
          title: "Lobster"
        }),
        new SubtypeSublayer({
          subtypeCode: 6, // Seal/Sea Lion
          renderer: createMarineSymbol("SealSeaLion"),
          title: "Seal/Sea Lion"
        }),
        new SubtypeSublayer({
          subtypeCode: 7, // Manatee
          renderer: createMarineSymbol("Manatee"),
          title: "Manatee"
        }),
        new SubtypeSublayer({
          subtypeCode: 8, // Oyster/Clam
          renderer: createMarineSymbol("OysterClam"),
          title: "Oyster/Clam"
        }),
        new SubtypeSublayer({
          subtypeCode: 9, // Turtle
          renderer: createMarineSymbol("Turtle"),
          title: "Turtle"
        }),
        new SubtypeSublayer({
          subtypeCode: 10, // Echinoderm
          renderer: createMarineSymbol("Echinoderm"),
          title: "Echinoderm"
        })
      ];

      // initializing a SubtypeGroupLayer
      stgl = new SubtypeGroupLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/MarineLife/FeatureServer/0",
        outFields: ["*"],
        sublayers
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

      // don't zoom while scrolling until map is clicked
      const wheelEvtHandler = view.on("mouse-wheel", (event) => {
        event.stopPropagation();
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
          if (filteredPolygons.length > 1) {
            // disable the select area button
            // can only create two rectangles at a time
            toggleAreaBtn(false);
          }
        }
      });

      // initializing the LayerList widget
      const layerList = new LayerList({
        view
      });
      // add the widget to the view
      view.ui.add(layerList, "bottom-left");

      view.when(() => {
        console.log("loaded biodiversity map");
        // set the layerview for client-side querying and highlighting
        view.whenLayerView(stgl).then((layerView) => {
          featureLayerView = layerView as FeatureLayerView;
        });

        openModal("initial-area-modal");
      });

      // ui
      rectangleBtn = document.getElementById("rectangleBtn") as HTMLCalciteButtonElement;
      clearBtn = document.getElementById("clearBtn") as HTMLCalciteButtonElement;
      cancelBtnTwo = document.getElementById("cancel-second-modal") as HTMLCalciteButtonElement;
      cancelBtnThree = document.getElementById(
        "cancel-screenshot-modal"
      ) as HTMLCalciteButtonElement;
      fishCard = document.getElementById("fishCard") as HTMLCalciteCardElement;
      whaleCard = document.getElementById("whaleCard") as HTMLCalciteCardElement;
      lobsterCard = document.getElementById("lobsterCard") as HTMLCalciteCardElement;
      turtleCard = document.getElementById("turtleCard") as HTMLCalciteCardElement;

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
        name
      })
    };
  }

  function unselectFeatures(highlight: __esri.Handle) {
    if (highlight) {
      highlight.remove();
    }
  }

  async function queryIntersectingFeatures(geometry: Geometry) {
    // Query for the features in the layerview that are within the extent of
    // the area drawn
    const intersectingFeatures = await featureLayerView.queryFeatures({
      geometry,
      outFields: featureLayerView.availableFields,
      returnGeometry: true
    });

    // remove highlight of the first selection
    // workaround to highlight clearing issue
    unselectFeatures(highlight);

    intersectingFeatures.features.forEach((feature: Graphic) => {
      selectedFeatures.push(feature);
    });
    highlight = featureLayerView.highlight(selectedFeatures);

    // keep track of how many polygons there are on the map to handle
    // modal instruction display timing and store the two datasets
    // to calculate and screenshot the areas
    const filteredPolygons = filterPolygons(graphicsLayer.graphics);
    if (filteredPolygons.length === 1) {
      openModal("second-area-modal");
      featureSet1.features = intersectingFeatures.features;
      featureSet1.area = geometry.extent;
    } else if (filteredPolygons.length === 2) {
      featureSet2.features = intersectingFeatures.features;
      featureSet2.area = geometry.extent;
      calculateShannonIndex(featureSet1, featureSet2);
    }
  }

  function clamp(value: number, from: number, to: number) {
    return value < from ? from : value > to ? to : value;
  }

  async function storeScreenshot(area: ScreenshotArea) {
    const screenshot = await view.takeScreenshot({ area: area, format: "png" });
    return screenshot;
  }

  function toggleAreaBtn(isVisible: boolean) {
    rectangleBtn.style.display = isVisible ? "block" : "none";
  }

  function chooseArea() {
    closePopover("popover");

    let area: ScreenshotArea;

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
        if (filteredPolygons.length === 1) {
          featureSet1.screenshot = await storeScreenshot(area);
        } else if (filteredPolygons.length === 2) {
          featureSet2.screenshot = await storeScreenshot(area);
        }
      }
    });

    sketchViewModel.create("rectangle");
  }

  function filterPolygons(graphics: Collection<Graphic>) {
    return graphics.filter((graphic: Graphic) => graphic.geometry.type === "polygon");
  }

  function clearAreas(highlight: __esri.Handle) {
    graphicsLayer.removeAll();
    toggleAreaBtn(true);
    unselectFeatures(highlight);
    selectedFeatures = [];
    featureSet1 = { features: [], area: new Extent(), screenshot: null, H: 0 };
    featureSet2 = { features: [], area: new Extent(), screenshot: null, H: 0 };
  }

  function calculateProportion(frequency: number, total: number) {
    return frequency / total;
  }

  // get total number of individuals (N)
  // also known as total biomass
  function getTotalNumOfSpecies(speciesData: Array<speciesData>) {
    let sum = 0;
    speciesData.forEach((record: speciesData) => {
      sum += record.frequency;
    });
    return sum;
  }

  // calculate the natural log of a species proportion
  function calculateNaturalLog(proportion: number) {
    return Math.log(proportion);
  }

  function getSWIndex(data: Array<speciesData>): number {
    let H = 0;

    data.forEach((record: speciesData) => {
      // 1. Add proportion to the dataset
      const totalSpecies = getTotalNumOfSpecies(data);
      record["pi"] = calculateProportion(record.frequency, totalSpecies);

      // 2. Calculate the natural log of each proportion
      // and add it to the dataset
      record["ln_pi"] = calculateNaturalLog(record.pi);

      // 3. Multiply the proportions by the natural log of the
      // proportions
      record["pi_ln_pi"] = record.pi * record.ln_pi;

      // 4. Add the sum of the (pi) * ln(pi)
      H += record.pi_ln_pi;
    });
    return +H.toFixed(2) * -1;
  }

  // formula to calculate Shannon-Weiner Index
  function calculateShannonIndex(fs1: featureSet, fs2: featureSet) {
    const community1 = createDataSchema(fs1.features);
    const community2 = createDataSchema(fs2.features);

    const H1 = getSWIndex(community1);
    const H2 = getSWIndex(community2);

    featureSet1.H = H1;
    featureSet2.H = H2;
    console.log(`community 1: ${H1} vs community 2: ${H2}`);
    if (featureSet1.screenshot && featureSet2.screenshot) {
      showPreview(featureSet1.screenshot, featureSet2.screenshot);
    }
  }

  /**
   * expected output Schema
   * const data = [
   *  { species: "A", frequency: 40 },
   *  { species: "B", frequency: 10 },
   *  ...
   * ]
   */

  function createDataSchema(features: Array<Graphic>) {
    const speciesTempStore: Array<number | null> = [];
    const data: Array<speciesData> = [];
    features.forEach((feature: Graphic) => {
      const speciesType = feature.attributes.TYPE;
      // species does not exist in the store yet
      if (!speciesTempStore.includes(speciesType)) {
        speciesTempStore.push(speciesType);
        data.push({ species: speciesType, frequency: 1 });
      } else {
        // species is already in the store, increment the frequency
        const existingSpeciesRecord = data.find(
          (element: speciesData) => element.species === speciesType
        );

        if (!!existingSpeciesRecord) {
          existingSpeciesRecord.frequency += 1;
        }
      }
    });
    return data;
  }

  function showPreview(screenshot1: __esri.Screenshot, screenshot2: __esri.Screenshot) {
    const img1 = document.getElementById("img1") as HTMLImageElement;
    const img2 = document.getElementById("img2") as HTMLImageElement;
    const indexDiv1 = document.getElementById("indexDiv1") as HTMLDivElement;
    const indexDiv2 = document.getElementById("indexDiv2") as HTMLDivElement;
    const resultSpan = document.getElementById("resultsSpan") as HTMLSpanElement;

    if (img1 && img2) {
      img1.width = screenshot1.data.width;
      img1.height = screenshot1.data.height;
      img1.src = screenshot1.dataUrl;
      img2.width = screenshot2.data.width;
      img2.height = screenshot2.data.height;
      img2.src = screenshot2.dataUrl;

      if (indexDiv1 && indexDiv2 && resultSpan) {
        indexDiv1.innerHTML = `${featureSet1.H}`;
        indexDiv2.innerHTML = `${featureSet2.H}`;
        resultSpan.innerText =
          featureSet1.H > featureSet2.H
            ? "Community 1 has a better species diversity index!"
            : "Community 2 has a better species diversity index!";

        openModal("screenshot-index-modal");
      }
    }
  }

  function handleCardSelection(evt: Event, speciesName: string) {
    if (sketchViewModel.state === "active") {
      sketchViewModel.cancel();
    }
    setSketchViewModelSymbol(speciesName);
    sketchViewModel.create("point");
    editableFeature.species = speciesName;
  }

  function handlePointCreate(geometry: Geometry) {
    const type = getSubtypeCode(editableFeature.species);
    const newMarineFeature = new Graphic({
      geometry,
      attributes: { type }
    });

    stgl
      .applyEdits({
        addFeatures: [newMarineFeature]
      })
      .then(() => console.log("added feature successfully"))
      .catch(() => console.log("failed to add this feature"));
  }

  function getSubtypeCode(name: string) {
    let code: number | null = null;
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
    const modal = document.getElementById(id) as HTMLCalciteModalElement;
    if (modal) {
      modal.active = true;
    }
  }

  function closeModal(id: string) {
    const modal = document.getElementById(id) as HTMLCalciteModalElement;
    if (modal) {
      modal.active = false;
    }
  }

  function closePopover(id: string) {
    const popover = document.getElementById(id) as HTMLCalcitePopoverElement;
    if (popover) {
      popover.open = false;
    }
  }

  function openPopover(id: string) {
    const popover = document.getElementById(id) as HTMLCalcitePopoverElement;
    if (popover) {
      popover.open = true;
    }
  }

  return (
    <>
      <MapDiv ref={mapDiv}>
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
        </CalcitePanel>
      </MapDiv>
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
    </>
  );
};

export default BioMap;
