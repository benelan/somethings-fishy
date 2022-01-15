import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
// import esriConfig from "@arcgis/core/config";

const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
`;

const BioMap: React.FC = (): JSX.Element => {
  const mapDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (mapDiv.current) {
      // Add global API key from environment variables to access data
      // const { REACT_APP_GLOBAL_API_KEY } = process.env;
      // if (!REACT_APP_GLOBAL_API_KEY) {
      //   throw new Error("API key not found");
      // }
      // esriConfig.apiKey = REACT_APP_GLOBAL_API_KEY;

      const map = new Map({
        basemap: "gray-vector"
      });

      const view = new MapView({
        container: mapDiv?.current,
        map,
        center: [-94, 32],
        zoom: 4
      });
      view.when(() => console.log("loaded biodiversity map..."));
    }
  }, [mapDiv]);

  return <MapDiv ref={mapDiv} />;
};

export default BioMap;
