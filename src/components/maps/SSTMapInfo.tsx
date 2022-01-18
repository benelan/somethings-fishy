import React from "react";
import "@esri/calcite-components/dist/components/calcite-link";
import { CalciteLink } from "@esri/calcite-components-react";
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
        <b>Effects of Global Sea Temperatures Rising</b>
      </h3>
      <img
        alt="Effects of global sea temperatures rising."
        src="/img/EmissionsTrends.png"
        style={{}}
      />
      <p>
        {"   "}
        <Link
          as={CalciteLink}
          href="https://www.iucn.org/resources/issues-briefs/ocean-warming"
          rel="noopener noreferrer"
          target="_blank"
        >
          source
        </Link>
      </p>
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
        <b>How Humans Impact Sea Surface Temperature</b>
      </h3>
      <ul>
        <li>
          The ocean absorbs most of the excess heat from greenhouse gas emissions, leading to rising
          ocean temperatures.{"   "}
          <Link
            as={CalciteLink}
            href="https://www.iucn.org/resources/issues-briefs/ocean-warming"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </Link>
        </li>
        <li>
          Increasing ocean temperatures affect marine species and ecosystems. Rising temperatures
          cause coral bleaching and the loss of breeding grounds for marine fishes and mammals.
          {"   "}
          <Link
            as={CalciteLink}
            href="https://www.iucn.org/resources/issues-briefs/ocean-warming"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </Link>
        </li>
        <li>
          Rising ocean temperatures also affect the benefits humans derive from the ocean -
          threatening food security, increasing the prevalence of diseases and causing more extreme
          weather events and the loss of coastal protection.{"   "}
          <Link
            as={CalciteLink}
            href="https://www.iucn.org/resources/issues-briefs/ocean-warming"
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
        <b>Trends in Global Emissions</b>
      </h3>
      <img alt="Trends of Global Emissions." src="../../../public/img/" style={{}} />
      {"   "}
      <Link
        as={CalciteLink}
        href="https://www.epa.gov/ghgemissions/global-greenhouse-gas-emissions-data"
        rel="noopener noreferrer"
        target="_blank"
      >
        source
      </Link>
    </InfoItem>

    <InfoItem>
      <h3>How to use the Application</h3>
      <p>
        The Sea Surface Temperature Map Application allows you to visualize how the SST has
        fluctuated over the last decade.
      </p>
      <ol>
        <li>
          <p>Zoom to an area of intersest to visualize Sea Surface Temperature (SST).</p>
        </li>
        <li>
          <p>
            Click the "Play" button on the Time Slider to visualize the change in SST from March 31,
            2008 to present.
          </p>
        </li>
        <li>
          <p>
            Alternatively, click and drag the marker on the slider to choose a specific date within
            the time range to visualize.
          </p>
        </li>
      </ol>
    </InfoItem>
  </InfoContainer>
);
