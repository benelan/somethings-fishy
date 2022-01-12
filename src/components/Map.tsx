import React, { useRef, useEffect } from "react";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";
import LayerList from "@arcgis/core/widgets/LayerList";
import TimeSlider from "@arcgis/core/widgets/TimeSlider";

const mapDivStyle = {
  padding: 0,
  margin: 0,
  height: "100%",
  width: "100%"
};

function Map() {
  const mapDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const globalApikey =
        "AAPK66d0fa7f737142fcb780f9fd1c8155f04YBLPof_SmYB-dzJgafylrodNieETG6SVXdYeo75C5eFIt9NykPed6jRtTI_c01w";
      esriConfig.apiKey = globalApikey;
      const webmap = new WebMap({
        portalItem: {
          id: "71be6dbf62ca43db8f2658e9e440f139"
        }
      });

      const view = new MapView({
        container: mapDiv?.current,
        map: webmap
      });

      const bookmarks = new Bookmarks({
        view,
        // allows bookmarks to be added, edited, or deleted
        editingEnabled: true
      });

      const bkExpand = new Expand({
        view,
        content: bookmarks,
        expanded: true
      });

      const layerList = new LayerList({
        view: view
      });

      const lyrlistExpand = new Expand({
        view,
        content: layerList,
        expanded: true
      });

      // Add the widget to the top-right corner of the view
      view.ui.add(bkExpand, "top-right");
      // Adds widget below other elements in the top left corner of the view
      view.ui.add(lyrlistExpand, {
        position: "top-left"
      });

      // bonus - how many bookmarks in the webmap?
      webmap.when(() => {
        if (webmap.bookmarks && webmap.bookmarks.length) {
          console.log("Bookmarks: ", webmap.bookmarks.length);
        } else {
          console.log("No bookmarks in this webmap.");
        }
      });
    }
  }, [mapDiv]);

  return <div ref={mapDiv} style={mapDivStyle} />;
}

export default Map;
