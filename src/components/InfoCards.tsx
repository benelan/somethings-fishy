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

const Link = styled.a`
  font-size: 0.7em;
  vertical-align: super;
`;

const Introduction: React.FC = (): JSX.Element => (
  <CardDeck>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">Research</h3>
        <ul>
          <li>
            Global warming may reduce fish and other sea life by 17% by the year 2100.{" "}
            <Link
              as={CalciteLink}
              href="https://www.pnas.org/content/116/26/12907.short?rss=1"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </Link>
          </li>
          <li>
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
          </li>
          <li>
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
          </li>
        </ul>
      </Card>
    </div>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">Lorem ipsum </h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Neque ornare aenean euismod elementum nisi quis eleifend quam
        adipiscing. Quam nulla porttitor massa id neque aliquam. Diam quis enim lobortis scelerisque
        fermentum dui faucibus. Massa tempor nec feugiat nisl pretium fusce. Integer quis auctor
        elit sed vulputate mi sit. Sed felis eget velit aliquet sagittis id.
      </Card>
    </div>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">Lorem ipsum </h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Facilisis sed odio morbi quis commodo odio aenean sed. Nibh
        nisl condimentum id venenatis. Penatibus et magnis dis parturient. Lectus arcu bibendum at
        varius vel pharetra vel turpis nunc.
      </Card>
    </div>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">Lorem ipsum </h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Sed tempus urna et pharetra pharetra massa massa ultricies.
        Feugiat pretium nibh ipsum consequat. Cursus risus at ultrices mi tempus imperdiet nulla
        malesuada. Donec massa sapien faucibus et. Ligula ullamcorper malesuada proin libero nunc
        consequat interdum varius sit.
      </Card>
    </div>
  </CardDeck>
);

export default Introduction;
