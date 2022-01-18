import React from "react";
import "@esri/calcite-components/dist/components/calcite-panel";
import { CalcitePanel } from "@esri/calcite-components-react";
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

export default (): JSX.Element => (
  <InfoContainer>
    <div style={{ textAlign: "center" }}>
      <h2>Ocean Warming</h2>
      <p>
        <b>
          <i>
            Sea Surface Tempurature (SST) is the water temperature close to the ocean's surface. The
            "surface" can range from 1 millimeter to 20 meters below the sea level. SST provides
            fundamental information about our global climate system and how it is changing.
          </i>
        </b>
      </p>
    </div>
    <InfoItem>
      <h3>
        <b>Title</b>
      </h3>
      <p>Image</p>
    </InfoItem>

    <InfoItem>
      <h3>
        <b>Why is the sea temperature rising important?</b>
      </h3>
      <p>
        Rising sea temperature leads to a reduction in the amount of oxygen dissolved in the ocean
        and sea level rise causing negative effects for marine species and ecosystems along with the
        fundamental benefits humans get from the ocean.
      </p>
    </InfoItem>

    <InfoItem>
      <h3>
        <b>Shannon-Wiener Diversity Index</b>
      </h3>
      <p>
        The Shannon-Wiener Index is one of the most widely used indices. It is used to measure and
        compare species evenness, or the relative abundance of species. The following is the Shannon
        Index formula:
      </p>
      <p>
        If H = 0, then this means the community only has one species. There is no diversity because
        all the living organism in the community belong to the same species. The higher the value of
        H, the more diverse the community is (webpages.uidaho.edu).
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
