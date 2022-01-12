import React from "react";
import styled from "styled-components";
import Map from "./components/Map";
import Landing from "./components/Landing";
import Introduction from "./components/InfoCards";
import "@esri/calcite-components/dist/calcite/calcite.css";

const ContentContainer = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
  height: 100%;

  & > * {
    margin: 2rem;
  }
`;

const MapContainer = styled.div`
  height: 70vh;
`;

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Landing />
      <ContentContainer>
        <Introduction />
        <MapContainer>
          <Map />
        </MapContainer>
      </ContentContainer>
    </>
  );
};

export default App;
