import React from "react";
import styled from "styled-components";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-modal";
import { CalciteButton, CalciteModal } from "@esri/calcite-components-react";
import BioMap from "./BioMap";
import RarityMap from "./RarityMap";
import CollectionMap from "./CollectionMap";
import Map from "./Map";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination } from "swiper";
import ErrorBoundary from "../ErrorBoundary";
import "@arcgis/core/assets/esri/themes/light/main.css";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/pagination/pagination.min.css";

const MapSwiperDeck: React.FC<{ height: string }> = ({ height }): JSX.Element => {
  const [isModalDisplayed, showModal] = React.useState(false);

  const SlideContainer = styled.div<{ height: string }>`
    height: ${(props) => props.height};
    text-align: center;
  `;

  const SlideHeader = styled.div`
    font-size: 2.5em;
    color: #237cbd;
  `;

  const SplashModal = () => (
    <CalciteModal active aria-labelledby="modal-title" id="splashModal">
      <div slot="header">Choose a community!</div>
      <div slot="content">
        Use the Area button to select a group of marine animal species! You will need to create two
        areas in order to compare the Species Diversity Index.
      </div>
      <CalciteButton
        appearance="outline"
        onClick={() =>
          ((document.getElementById("splashModal") as HTMLCalciteModalElement).active = false)
        }
        slot="secondary"
        width="full"
      >
        Okay
      </CalciteButton>
    </CalciteModal>
  );

  return (
    <ErrorBoundary>
      <Swiper
        allowTouchMove={false}
        modules={[Navigation, Pagination]}
        navigation
        onSlideChange={({ activeIndex }) => {
          if (activeIndex === 1) {
            showModal(true);
          }
        }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        style={{ height: "100%", width: "100%" }}
      >
        {isModalDisplayed ? <SplashModal /> : null}
        <SwiperSlide>
          <SlideContainer height={height}>
            <SlideHeader>Sea Surface Temperature Map</SlideHeader>
            <Map />
          </SlideContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SlideContainer height={height}>
            <SlideHeader>Biodiversity Map</SlideHeader>
            <BioMap />
          </SlideContainer>
          <SlideContainer height={height}>
            <SlideHeader>Marine Species Rarity vs. Protected Area Map</SlideHeader>
            <RarityMap />
          </SlideContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SlideContainer height={height}>
            <SlideHeader>Data Collection Map</SlideHeader>
            <CollectionMap />
          </SlideContainer>
        </SwiperSlide>
      </Swiper>
    </ErrorBoundary>
  );
};

export default MapSwiperDeck;
