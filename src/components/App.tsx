import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import MapDeck from "./maps/MapDeck";
import Landing from "./landing/Landing";
import InfoCards from "./InfoCards";
import "@esri/calcite-components/dist/calcite/calcite.css";

const lazyHeight = "90vh";

const ContentContainer = styled.div`
  margin-left: 3rem;
  margin-right: 3rem;
  height: 100%;

  & > * {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <LazyLoad height={lazyHeight}>
        <Landing />
      </LazyLoad>
      <ContentContainer>
        <InfoCards />
        <MapDeck height={lazyHeight} />
      </ContentContainer>
    </>
  );
};

export default App;
