import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import BioMap from "./BioMap";
import RarityMap from "./RarityMap";
import CollectionMap from "./CollectionMap";
import Map from "./Map";
import ErrorBoundary from "../ErrorBoundary";

import "@arcgis/core/assets/esri/themes/light/main.css";

const SectionContainer = styled.div`
  height: 100vh;
`;
const MapContainer = styled.div<{ height: string }>`
  height: ${(props) => props.height};
`;

const MapHeader = styled.div`
  text-align: center;
  font-size: 2.5em;
  color: #237cbd;
`;

const MapDeck: React.FC<{ height: string }> = ({ height }): JSX.Element => {
  return (
    <>
      <ErrorBoundary>
        <SectionContainer>
          <LazyLoad height={height} offset={100}>
            <MapContainer height={height}>
              <MapHeader>Sea Surface Temperature Map</MapHeader>
              <Map />
            </MapContainer>
          </LazyLoad>
        </SectionContainer>
      </ErrorBoundary>

      <ErrorBoundary>
        <SectionContainer>
          <LazyLoad height={height} offset={100}>
            <MapContainer height={height}>
              <MapHeader>Biodiversity Map</MapHeader>
              <BioMap />
            </MapContainer>
          </LazyLoad>
        </SectionContainer>
      </ErrorBoundary>

      <ErrorBoundary>
        <SectionContainer>
          <LazyLoad height={height} offset={100}>
            <MapContainer height={height}>
              <MapHeader>Marine Species Rarity vs. Protected Area Map</MapHeader>
              <RarityMap />
            </MapContainer>
          </LazyLoad>
        </SectionContainer>
      </ErrorBoundary>

      <ErrorBoundary>
        <SectionContainer>
          <LazyLoad height={height} offset={100}>
            <MapContainer height={height}>
              <MapHeader>Data Collection Map</MapHeader>
              <CollectionMap />
            </MapContainer>
          </LazyLoad>
        </SectionContainer>
      </ErrorBoundary>
    </>
  );
};

export default MapDeck;
