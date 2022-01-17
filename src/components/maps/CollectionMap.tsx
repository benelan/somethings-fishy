import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";

const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
`;

const CollectionMap: React.FC = (): JSX.Element => {
  const mapDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (mapDiv.current) {
      //Add global API key from environment variables to access data
      const { REACT_APP_GLOBAL_API_KEY } = process.env;
      if (!REACT_APP_GLOBAL_API_KEY) {
        throw new Error("API key not found");
      }
      esriConfig.apiKey = REACT_APP_GLOBAL_API_KEY;

      //Add webmap
      const webmap = new WebMap({
        portalItem: {
          id: "a4d82c6dacf745798270ba3dcac4bd12"
        }
      });

      const view = new MapView({
        container: mapDiv?.current,
        map: webmap
      });

      view.when(() => console.log("loaded collection map..."));
    }
  }, [mapDiv]);

  return <MapDiv ref={mapDiv} />;
};

export default CollectionMap;
