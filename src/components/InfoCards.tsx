import React from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-link";
import { CalciteCard, CalciteLink } from "@esri/calcite-components-react";
import styled from "styled-components";

const CardDeck = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  overflow-x: hidden;
  margin: -1rem;

  & > * {
    flex: 1 1 300px;
    margin: 1rem;
    --calcite-font-size--2: 1em;
    --calcite-font-size--1: 1.3em;
  }
`;

const Card = styled.div`
  height: 100%;
`;

const ListItem = styled.li`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Link = styled.a`
  font-size: 0.7em;
  vertical-align: super;
`;

const InfoCards: React.FC = (): JSX.Element => (
  <CardDeck>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">The Problem</h3>
        <ul>
          <ListItem>
            Global warming may reduce fish and other sea life by 17% by the year 2100.{" "}
            <Link
              as={CalciteLink}
              href="https://www.pnas.org/content/116/26/12907.short?rss=1"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </Link>
          </ListItem>
          <ListItem>
            Over the last decade, the rate of plastic consumption has doubled, increasing by 2.4
            percent every year.{" "}
            <Link
              as={CalciteLink}
              href="https://news.stanford.edu/2021/02/09/plastic-ingestion-fish-growing-problem/"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </Link>
          </ListItem>
          <ListItem>
            386 marine fish species are known to have ingested plastic debris, including 210 species
            that are commercially important.{" "}
            <Link
              as={CalciteLink}
              href="https://www.civilbeat.org/2021/03/the-fish-we-eat-are-eating-plastic-thats-not-a-good-thing/"
              rel="noopener noreferrer"
              style={{ "--calcite-font-size--2": "0.1em" }}
              target="_blank"
            >
              source
            </Link>
          </ListItem>
        </ul>
      </Card>
    </div>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">The Solutions</h3>
        <ul>
          <ListItem>Buy local, sustainable food and products.</ListItem>
          <ListItem>Carry a reusable bottle instead of buying single-use plastics.</ListItem>
          <ListItem>Volunteer your time to pickup trash at a local beach.</ListItem>
          <ListItem>
            Ask your representatives to create more protected areas to save endangered fish
            populations.
          </ListItem>
        </ul>
      </Card>
    </div>
  </CardDeck>
);

export default InfoCards;
