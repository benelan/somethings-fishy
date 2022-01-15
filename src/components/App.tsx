import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import MapSwiperDeck from "./maps/MapSwiperDeck";
import Landing from "./landing/Landing";
import Introduction from "./InfoCards";
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
        <Introduction />
        <LazyLoad height={lazyHeight}>
          <MapSwiperDeck height={lazyHeight} />
        </LazyLoad>
      </ContentContainer>
    </>
  );
};

export default App;
