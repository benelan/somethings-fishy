import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import Map from "./components/Map";
import Landing from "./components/landing/Landing";
import Introduction from "./components/InfoCards";
import "@esri/calcite-components/dist/calcite/calcite.css";

const lazyHeight = "70vh";

const ContentContainer = styled.div`
  margin-left: 3rem;
  margin-right: 3rem;
  height: 100%;

  & > * {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const MapContainer = styled.div`
  height: ${lazyHeight};
`;

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <LazyLoad height={lazyHeight}>
        <Landing />
      </LazyLoad>
      <ContentContainer>
        <Introduction />
        <LazyLoad height={lazyHeight} offset={100}>
          <MapContainer>
            <Map />
          </MapContainer>
        </LazyLoad>
      </ContentContainer>
    </>
  );
};

export default App;
