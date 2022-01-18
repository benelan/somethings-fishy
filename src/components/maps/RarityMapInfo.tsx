import React from "react";
import styled from "styled-components";
import "@esri/calcite-components/dist/components/calcite-link";
import { CalciteLink } from "@esri/calcite-components-react";
import "./RarityMap.css";

const InfoContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: -1rem;
  overflow: hidden;
`;

const InfoItem = styled.div`
  flex: 1 1 40vw;
  margin: 1rem;
`;

const Link = styled.a`
  font-size: 0.7em;
  vertical-align: super;
`;

const StepsImg = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export default (): JSX.Element => (
  <InfoContainer>
    <div style={{ textAlign: "center" }}>
      <h2> Are we protecting the aquatic ecosystems of endangered/rare species? </h2>
      <p>
        <b>
          <i>
            We investigate this question with spatial analysis and display the results using the map
            below.
          </i>
        </b>
      </p>
      <p>
        The concept of rarity has several definitions in common usage, but in the lexicon of
        conservation biology a species' rarity is most simply based on its distribution and
        abundance (Gaston 1994). According to Reveal (1981,42) "rarity is merely the current status
        of an extant organism which ... is restricted either in numbers or area to a level that is
        demonstrably less than the majority of other organisms of comparable taxonomic entities."
      </p>
    </div>
    <InfoItem>
      <h3>
        <b>Why protect marine life? </b>
      </h3>
      <ul>
        <li>
          Healthy marine species like whales, sea turtles, coral, and salmon are important for
          maintaining balanced and thriving ocean ecosystems.{" "}
          <Link
            as={CalciteLink}
            href="https://www.fisheries.noaa.gov/protecting-marine-life"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </Link>
        </li>
        <li>
          Marine animals can help protect us from the impacts of climate change.{" "}
          <Link
            as={CalciteLink}
            href="https://www.onegreenplanet.org/environment/saving-marine-animals-can-protect-us-from-climate-change/"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </Link>
        </li>
        <li>
          To provide opportunities for people to experience and study marine life that are
          undisturbed by human activity.{" "}
          <Link
            as={CalciteLink}
            href="https://wildcoast.org/why-marine-protected-areas-are-important-for-the-future/"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </Link>
        </li>
      </ul>
      <h3>
        <b>Why species rarity is important?</b>
      </h3>
      <ul>
        <li>
          Rare species contribute a lot to the ecosystems; rare species loss reduces the functional
          diversity of communities.{" "}
          <Link
            as={CalciteLink}
            href="https://phys.org/news/2016-04-rare-species-important-believed.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </Link>
        </li>
        <li>
          Many individual species are uniquely important as indicators of environmental quality.{" "}
          <Link
            as={CalciteLink}
            href="https://www.worldanimalfoundation.org/advocate/wild-earth/params/post/1285404/why-save-endangered-species"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </Link>
        </li>
        <li>
          A well-balanced ecosystem maintains the health of the environment. This ensures that human
          beings have access to clean air and water, as well as fertile land for agriculture.{" "}
          <Link
            as={CalciteLink}
            href="https://www.gviusa.com/blog/why-should-we-save-endangered-species/"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </Link>
        </li>
        <li>
          Each living thing contains a unique reservoir of genetic material that has evolved over
          eons. This material cannot be retrieved or duplicated if lost.{" "}
          <Link
            as={CalciteLink}
            href="https://www.worldanimalfoundation.org/advocate/wild-earth/params/post/1285404/why-save-endangered-species"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </Link>
        </li>
      </ul>
    </InfoItem>
    <InfoItem>
      <h3>
        <b>Our Spatial Analysis Workflow</b>
      </h3>
      <ol>
        <li>
          <p>
            Acquired the protected areas and marine species rarity scores within the Gulf of Mexico,
            using the
            <b>Overlay Layers</b> tool on the input data (sources below): a layer of worldwide
            protected areas, a grid cell layer with marine species rarity scores, and the Gulf of
            Mexico boundary.
          </p>
        </li>
        <li>
          <p>
            Considering that we used the grid cells as the unit of analysis, and since some
            protected areas spread across multiple cells, we used <b>Overlay Layers</b> again to
            split the protected areas by cells.
          </p>
        </li>
        <li>
          <p>
            Dissolved the protected areas that were within the same cell, using{" "}
            <b>Dissolve Boundaries.</b>
          </p>
        </li>
        <li>
          <p>
            Used the <b>Summarize Within</b> tool to generate the result layer, which includes the
            areas that have been marked as protected and the marine species rarity score, within
            each grid cells.
          </p>
        </li>
        <li>
          <p>
            Added the result layer to a map and configured symbology to show the relationship
            between the protected proportion and marine species rarity score.
          </p>
        </li>
      </ol>
    </InfoItem>
    <InfoItem>
      <h3>
        <b>Flowchart</b>
      </h3>
      <img
        alt="Flowchart"
        src={process.env.PUBLIC_URL + "/img/spatial_analysis_flowchart_rarity_protection.png"}
        style={{ height: "auto", width: "100%", maxWidth: "800px" }}
      />
      <h3>
        <b>Input Data Source</b>
      </h3>
      <ul>
        <li>
          <a
            href="https://www.arcgis.com/home/item.html?id=bf2862f403b94411ac2428dc9c9bce03"
            target="_blank"
          >
            Global Marine Species Patterns (55km), by Map of Life (MoL)
          </a>
        </li>
        <li>
          <a
            href="https://www.arcgis.com/home/item.html?id=ae78aeb913a343d69e950b53e29076f7"
            target="_blank"
          >
            WDPA - World Database of Protected Areas, by UN Environment World Conservation
            Monitoring Centre
          </a>
        </li>
        <li>
          <a href="https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html" target="_blank">
            Gulf of Mexico region with GSHHS and/or NaturalEarth shorelines, by GSHHG - A Global
            Self-consistent, Hierarchical, High-resolution Geography Database
          </a>
        </li>
      </ul>
    </InfoItem>
    <InfoItem>
      <h3>
        <b>Step-by-step Screen Record</b>
      </h3>
      <StepsImg src={process.env.PUBLIC_URL + "/img/rarity-analysis-steps.gif"} />
      <h3>How to use the App</h3>
      <ol>
        <li>
          <p>Click on the cell grids to see our spatial analysis results on a pop-up!</p>
          <p>
            The result includes the proportion of area that has been marked as protected area, and
            the marine species rarity scores of all taxa (all species), fish, and mammals.
          </p>
        </li>
        <li>
          <p>
            Consult the relationship renderer on the legend widget (which is on the right) and
            interpret patterns of the spatial analysis result.{" "}
          </p>
          <p>
            The grid cells that need the most attention are the ones in dark red. These cells have
            high rarity scores but low protected proportions.
          </p>
        </li>
        <li>
          <p>There is also a filtering tool in the lower left of the app!</p>
          <p>
            {" "}
            Drag the slider to a number to show only the cell grids where rarity of all species is
            greater than the number selected.
          </p>
          <p>
            The renderer will be updated according to the filter you set. Click "Reset Filter" to
            reverse back to the default symbology.
          </p>
        </li>
      </ol>
    </InfoItem>
  </InfoContainer>
);
