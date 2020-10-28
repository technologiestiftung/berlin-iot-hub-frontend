/** @jsx jsx */
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, WebMercatorViewport } from "react-map-gl";
import { bbox, featureCollection, point } from "@turf/turf";
import { jsx } from "theme-ui";
import { MarkerType } from "../common/interfaces";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

type ClickHandlerType = (markerId: number) => void;

interface ViewportType {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  maxZoom: number;
  width: number;
  height: number;
}

export const MarkerMap: React.FC<{
  markers: MarkerType[];
  clickHandler: ClickHandlerType;
  mapWidth: number;
  mapHeight: number;
}> = ({ markers, clickHandler, mapWidth, mapHeight }) => {
  const [viewport, setViewport] = useState<ViewportType>({
    latitude: markers.length === 1 ? markers[0].latitude : 52.520952,
    longitude: markers.length === 1 ? markers[0].longitude : 13.400033,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    maxZoom: 16,
    width: mapWidth,
    height: mapHeight,
  });

  useEffect(() => {
    if (markers.length === 1) return;

    const features = featureCollection(
      markers.map((marker: MarkerType) => {
        return point([marker.longitude, marker.latitude]);
      })
    );

    const [minX, minY, maxX, maxY] = bbox(features);

    const { latitude, longitude, zoom } = new WebMercatorViewport({
      ...viewport,
      width: mapWidth,
      height: mapHeight,
    }).fitBounds(
      [
        [minX, minY],
        [maxX, maxY],
      ],
      { padding: 24 }
    );

    const newViewport: ViewportType = {
      ...viewport,
      longitude,
      latitude,
      zoom,
    };

    setViewport(newViewport);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, mapWidth, mapHeight]);

  const handleClick: ClickHandlerType = (markerId: number) => {
    clickHandler(markerId);
  };

  return (
    <ReactMapGL
      {...viewport}
      width={mapWidth}
      height={mapHeight}
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
                bg: marker.active ? "primary" : "mediumgrey",
                cursor: "pointer",
                transform: "translate(-12px, -12px)",
              }}
              onClick={() => handleClick(marker.id)}
            ></div>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
};
