/** @jsx jsx */
import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { jsx } from "theme-ui";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

interface MarkerType {
  latitude: number;
  longitude: number;
  id: number;
}

type ClickHandlerType = (markerId: number) => void;

export const Map: React.FC<{ markers: MarkerType[], clickHandler: ClickHandlerType }> = ({ markers, clickHandler }) => {
  const [viewport, setViewport] = useState({
    latitude: 52.520952,
    longitude: 13.400033,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const handleClick: ClickHandlerType = (markerId: number) => {
    clickHandler(markerId)
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/light-v10"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      {markers.map((marker: MarkerType) => {
        return (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}
          >
            <div
              sx={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                bg: "primary",
                cursor: "pointer",
              }}
              onClick={() => handleClick(marker.id)}>
            ></div>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
};
