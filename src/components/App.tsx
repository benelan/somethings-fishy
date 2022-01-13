import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import Map from "./Map";
import BioMap from "./BioMap";
import CollectionMap from "./CollectionMap";
import MapSwiper from "./MapSwiper";
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

const MapContainer = styled.div`
  height: ${lazyHeight};
`;

const SlideContainer = styled.div`
  height: ${lazyHeight};
  text-align: center;
`;

const SlideHeader = styled.div`
  font-size: 2.5em;
  color: #237cbd;
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
            <MapSwiper>
              <SlideContainer>
                <SlideHeader>Sea Temperature Map</SlideHeader>
                <Map />
              </SlideContainer>
              <SlideContainer>
                <SlideHeader>Biodiversity Map</SlideHeader>
                <BioMap />
              </SlideContainer>
              <SlideContainer>
                <SlideHeader>Data Collection Map</SlideHeader>
                <CollectionMap />
              </SlideContainer>
            </MapSwiper>
          </MapContainer>
        </LazyLoad>
      </ContentContainer>
    </>
  );
};

export default App;
