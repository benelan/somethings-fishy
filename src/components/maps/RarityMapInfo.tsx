import React from "react";
import "@esri/calcite-components/dist/components/calcite-panel";
import { CalcitePanel, CalciteLink } from "@esri/calcite-components-react";
import "./RarityMap.css";
import styled from "styled-components";

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

export default (): JSX.Element => (
  <InfoContainer>
    <div style={{ textAlign: "center" }}>
      <h2>How are we doing in protecting living areas of rare species? </h2>
      <p>
        <b>
          <i>
            We are trying to answer this question with spatial analysis and display the results
            using the map below.
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
        <b>Why marine protected areas are important? </b>
      </h3>
      <ul>
        <li> Item 1 </li>
        <li> Item 2 </li>
        <li>
          To provide opportunities for people to experience and study marine life that are
          undisturbed by human activity.
        </li>
      </ul>
    </InfoItem>

    <InfoItem>
      <h3>
        <b>Why species rarity is important?</b>
      </h3>
      <ul>
        <li>
          Rare species contribute a lot to the ecosystems; rare species loss reduces the functional
          diversity of communities."{" "}
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
          Enrivonmental monitors: Many individual species are uniquely important as indicators of
          environmental quality.{" "}
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
          beings have access to clean air and water, and fertile land for agriculture.{" "}
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
          Contribution to medicine: Each living thing contains a unique reservoir of genetic
          material that has evolved over eons. This material cannot be retrieved or duplicated if
          lost.
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
      <p>
        <ol>
          <li>
            <p>
              Acquired the protected areas and rarity scores within the Gulf of Mexico, using the
              <b>Overlay Layers</b> tool on the input data (see below for the sources of the input
              data): a layer of worldwide protected areas, a grid cell layer with species rarity
              scores, and the Gulf of Mexico boundary.
            </p>
          </li>
          <li>
            <p>
              Considering that we used the gird cells as the unit of analysis, and since some
              protected areas spread across multiple cells, called <b>Overlay Layers</b> again to
              split the protected areas by cells.
            </p>
          </li>
          <li>
            <p>
              After drawing the first area, click on the area button to draw an area around the
              second community of species you would like to compare the first community with.
            </p>
          </li>
          <li>
            <p>Once the second area is drawn, you will see the results!</p>
          </li>
          <li>
            <p>
              The Shannon Index numbers for both communities will be shown, along with screen
              captures of the area you selected.
            </p>
          </li>
          <li>
            <p>
              Click on the trash button to clear the areas and start drawing another two areas of
              interest if you would like to compare another two communities.
            </p>
          </li>
          <li>
            <p>
              You can click on the animal images on the right to start adding new points on the map!
            </p>
          </li>
          <li>
            <p>
              The LayerList widget can be used to show and hide some of the species on the map as
              well.
            </p>
          </li>
        </ol>
        2. 3. Then, we dissolved the areas that were within the same cell, using Dissolve
        Boundaries." 4. Finally, we called the Summarize Within tool to generate a layer that
        includes both the portion of areas being protected and marine species rarity score, within
        each grid cells.
      </p>
    </InfoItem>
    <InfoItem>
      <h3>
        <b>Flowchart</b>
      </h3>
      <p>
        <img
          alt="Flowchart"
          src="public/img/spatial_analysis_flowchart_rarity_protection.png"
          style={{ position: "absolute", right: "0.5rem", top: "0.5rem" }}
        />
      </p>
    </InfoItem>

    <InfoItem as={CalcitePanel} heading="Shannon-Wiener Index">
      <div id="info-panel-content">
        <p className="p-math">
          H = &#8212;<span className="span-math">&Sigma;</span>P<sub>i</sub> ln(P<sub>i</sub>)
        </p>
        <p>
          <b>
            P<sub>i</sub>
          </b>{" "}
          - the proportion of individuals in a species
          <br />
          <b>H</b> - the index
        </p>
      </div>
    </InfoItem>

    <InfoItem>
      <h3>
        <b>Input Date Source</b>
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
        <b>Shannon-Wiener Index Comparison App</b>
      </h3>
      <p>
        The app below allows users to measure and compare species diversity with the Shannon-Wiener
        Index formula. The app is simple and easy to use and helps illustrate some of the work
        scientists do when comparing species diversity. It is intended to allow the user to feel
        like they are scientists on the field comparing species evenness. The app also has some
        great information on actual species in the Gulf of Mexico with links to the{" "}
        <a href="https://www.noaa.gov/" target="_blank">
          NOAA
        </a>{" "}
        site. It allows users to add more living organism onto the map with some editing features.
      </p>
    </InfoItem>
    <InfoItem>
      <p>
        <h3>How to use the App</h3>
      </p>
      <ol>
        <li>
          <p>Click on the area button to start drawing your first area of interest.</p>
        </li>
        <li>
          <p>
            Draw an area around the species you would like to use as your first community to
            compare.
          </p>
        </li>
        <li>
          <p>
            After drawing the first area, click on the area button to draw an area around the second
            community of species you would like to compare the first community with.
          </p>
        </li>
        <li>
          <p>Once the second area is drawn, you will see the results!</p>
        </li>
        <li>
          <p>
            The Shannon Index numbers for both communities will be shown, along with screen captures
            of the area you selected.
          </p>
        </li>
        <li>
          <p>
            Click on the trash button to clear the areas and start drawing another two areas of
            interest if you would like to compare another two communities.
          </p>
        </li>
        <li>
          <p>
            You can click on the animal images on the right to start adding new points on the map!
          </p>
        </li>
        <li>
          <p>
            The LayerList widget can be used to show and hide some of the species on the map as
            well.
          </p>
        </li>
      </ol>
    </InfoItem>
  </InfoContainer>
);
