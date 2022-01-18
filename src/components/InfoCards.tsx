import React from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-link";
import { CalciteCard, CalciteLink } from "@esri/calcite-components-react";
import { CardDeck, Card, SourceLink } from "./sharedStyledComponents";
import styled from "styled-components";

const ListItem = styled.li`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const InfoCards: React.FC = (): JSX.Element => (
  <CardDeck>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">The Problem</h3>
        <ul>
          <ListItem>
            Global warming may reduce fish and other sea life by 17% by the year 2100.{"   "}
            <SourceLink
              as={CalciteLink}
              href="https://www.pnas.org/content/116/26/12907.short?rss=1"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </SourceLink>
          </ListItem>
          <ListItem>
            Over the last decade, the rate of plastic consumption [by fish] has doubled, increasing
            by 2.4 percent every year.{"   "}
            <SourceLink
              as={CalciteLink}
              href="https://news.stanford.edu/2021/02/09/plastic-ingestion-fish-growing-problem/"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </SourceLink>
          </ListItem>
          <ListItem>
            386 marine fish species are known to have ingested plastic debris, including 210 species
            that are commercially important.{"   "}
            <SourceLink
              as={CalciteLink}
              href="https://onlinelibrary.wiley.com/doi/full/10.1111/gcb.15533"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </SourceLink>
          </ListItem>
          <ListItem>
            Ocean pollution is a widespread, worsening, and poorly controlled problem that is
            directly affecting human and ecosystem health.{"   "}
            <SourceLink
              as={CalciteLink}
              href="https://www.niehs.nih.gov/research/programs/geh/geh_newsletter/2021/2/articles/new_study_finds_ocean_pollution_a_threat_to_human_health.cfm"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </SourceLink>
          </ListItem>
        </ul>
      </Card>
    </div>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">The Solutions</h3>
        <ul>
          <ListItem>
            Buy local, sustainable fish when possible.{"   "}
            <SourceLink
              as={CalciteLink}
              href="https://www.seafoodwatch.org/recommendations/search?query="
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </SourceLink>
          </ListItem>
          <ListItem>
            Carry a reusable bottle instead of buying single-use plastics.{"   "}
            <SourceLink
              as={CalciteLink}
              href="https://blogs.nicholas.duke.edu/env212/single-use-plastic-and-its-effects-on-our-oceans"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </SourceLink>
          </ListItem>
          <ListItem>
            Volunteer your time to pickup trash at a local beach.{"   "}
            <SourceLink
              as={CalciteLink}
              href="https://oceanconservancy.org/trash-free-seas/"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </SourceLink>
          </ListItem>
          <ListItem>
            Ask your representatives to create and fund more Marine Protected Areas to save
            endangered aquatic ecosystems.{"   "}
            <SourceLink
              as={CalciteLink}
              href="https://www.americanprogress.org/article/marine-protected-areas-help-fisheries-ocean-ecosystems/"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </SourceLink>
          </ListItem>
          <ListItem>
            Reduce greenhouse gas emissions one step at a time.{"   "}
            <SourceLink
              as={CalciteLink}
              href="https://scied.ucar.edu/learning-zone/climate-solutions/reduce-greenhouse-gases/"
              rel="noopener noreferrer"
              target="_blank"
            >
              source
            </SourceLink>
          </ListItem>
        </ul>
      </Card>
    </div>
  </CardDeck>
);

export default InfoCards;
