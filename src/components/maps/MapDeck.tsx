import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import BioMap from "./bio/BioMap";
import BioMapInfo from "./bio/BioMapInfo";
import RarityMap from "./rarity/RarityMap";
import RarityMapInfo from "./rarity/RarityMapInfo";
import CollectionMap from "./collection/CollectionMap";
import CollectionMapInfo from "./collection/CollectionMapInfo";
import SSTMap from "./sst/SSTMap";
import SSTMapInfo from "./sst/SSTMapInfo";
import ErrorBoundary from "../ErrorBoundary";

import "@arcgis/core/assets/esri/themes/light/main.css";

const MapContainer = styled.div<{ height: string }>`
  margin-top: 2rem;
  height: ${(props) => props.height};
`;

const MapInfo = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const MapHeader = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 2.5em;
  color: #237cbd;
`;

const MapDeck: React.FC<{ height: string }> = ({ height }): JSX.Element => {
  return (
    <>
      <ErrorBoundary>
        <LazyLoad height={height} offset={100}>
          <MapHeader>Sea Surface Temperature Map</MapHeader>
          <MapInfo as={SSTMapInfo} />
          <MapContainer height={height}>
            <SSTMap />
          </MapContainer>
        </LazyLoad>
      </ErrorBoundary>

      <ErrorBoundary>
        <LazyLoad height={height} offset={100}>
          <MapHeader>Marine Species Rarity vs. Protected Area Map</MapHeader>
          <RarityMapInfo />
          <MapContainer height={height}>
            <RarityMap />
          </MapContainer>
        </LazyLoad>
      </ErrorBoundary>

      <ErrorBoundary>
        <LazyLoad height={height} offset={100}>
          <MapHeader>Data Collection Map</MapHeader>
          <MapInfo as={CollectionMapInfo} />
          <MapContainer height={height}>
            <CollectionMap />
          </MapContainer>
        </LazyLoad>
      </ErrorBoundary>

      <ErrorBoundary>
        <LazyLoad height={height} offset={100}>
          <MapHeader>Biodiversity Map</MapHeader>
          <MapInfo as={BioMapInfo} />
          <MapContainer height={height}>
            <BioMap />
          </MapContainer>
        </LazyLoad>
      </ErrorBoundary>
    </>
  );
};

export default MapDeck;
