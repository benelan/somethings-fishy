import React from "react";
import "@esri/calcite-components/dist/components/calcite-link";
import "@esri/calcite-components/dist/components/calcite-card";
import { CalciteLink, CalciteCard } from "@esri/calcite-components-react";
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
  --calcite-font-size--2: 1em;
  --calcite-font-size--1: 1.3em;
`;

const CardDeck = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  overflow-x: hidden;
  margin: -1rem;

  & > * {
    flex: 1 1 30vw;
    margin: 1rem;
    --calcite-font-size--2: 1em;
    --calcite-font-size--1: 1.3em;
  }
`;

const Card = styled.div`
  height: 100%;
`;

const Link = styled.a`
  font-size: 0.7em;
  vertical-align: super;
`;

export default (): JSX.Element => (
  <>
    <div style={{ textAlign: "center", margin: "1rem" }}>
      <p>
        <b>
          <i>
            Sea Surface Temperature (SST) is the water temperature close to the ocean's surface. The
            "surface" can range from 1 millimeter to 20 meters below the sea level. SST provides
            fundamental information about our global climate system and how it is changing.
          </i>
        </b>
      </p>
    </div>
    <CardDeck>
      <div>
        <Card as={CalciteCard}>
          <h3 slot="title">Effects of Global Sea Temperatures Rising</h3>
          <img
            alt="Effects of global sea temperatures rising."
            src="/img/GlobalSurfaceTemperatureRising.png"
            style={{ height: "auto", width: "100%", maxWidth: "900px" }}
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
        </Card>
      </div>

      <div>
        <Card as={CalciteCard}>
          <h3 slot="title">Why is the rise in sea temperature important?</h3>
          <p>
            Rising sea temperature leads to a reduction in the amount of oxygen dissolved in the
            ocean and sea level rise, which causes negative effects for marine species and
            ecosystems. Additionally, this harms fundamental benefits that humans get from the
            ocean.
          </p>
        </Card>
      </div>
      <div>
        <Card as={CalciteCard}>
          <h3 slot="title">How Humans Impact Sea Surface Temperature</h3>
          <ul>
            <li>
              The ocean absorbs most of the excess heat from greenhouse gas emissions, leading to
              rising ocean temperatures.{"   "}
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
              Increasing ocean temperatures affect marine species and ecosystems. Rising
              temperatures cause coral bleaching and the loss of breeding grounds for marine fishes
              and mammals.
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
              threatening food security, increasing the prevalence of diseases, and causing extreme
              weather events and loss of coastal protection.{"   "}
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
        </Card>
      </div>
      <div>
        <Card as={CalciteCard}>
          <h3 slot="title">Trends in Global Emissions</h3>
          <div style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <img
              alt="Trends of Global Emissions."
              src="/img/EmissionsTrends.png"
              style={{ height: "auto", width: "100%", maxWidth: "500px" }}
            />
            <p style={{ textAlign: "center" }}>
              {"   "}
              <Link
                as={CalciteLink}
                href="https://www.epa.gov/ghgemissions/global-greenhouse-gas-emissions-data"
                rel="noopener noreferrer"
                target="_blank"
              >
                source
              </Link>
            </p>
          </div>
        </Card>
      </div>
      <div>
        <Card as={CalciteCard}>
          <h3 slot="title">How to use the Application</h3>
          The Sea Surface Temperature Map Application allows you to visualize how the SST has
          fluctuated over the last decade.
          <ol>
            <li>
              <p>Zoom to an area of interest to visualize Sea Surface Temperature (SST).</p>
            </li>
            <li>
              <p>
                Click the "Play" button on the Time Slider to visualize the change in SST from March
                31, 2008 to present.
              </p>
            </li>
            <li>
              <p>
                Alternatively, click and drag the marker on the slider to see a specific date within
                the time range.
              </p>
            </li>
          </ol>
        </Card>
      </div>
    </CardDeck>
  </>
);
