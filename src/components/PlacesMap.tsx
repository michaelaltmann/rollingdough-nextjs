import Typography from "@mui/material/Typography";

import { Container } from "@mui/material";
import { features } from "process";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from "react";
import * as React from "react";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsdG1hbm4iLCJhIjoiQjgzZTEyNCJ9.0_UJWIO6Up0HkMQajYj6Ew";

export default function PlacesMap(props: any) {
  const { places } = props;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-93.2);
  const [lat, setLat] = useState(44.9);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  const features = places.map((place: any) => {
    return {
      type: "Feature",
      properties: {
        message: place.name,
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [place.lat, place.lon],
      },
    };
  });
  const geojson = {
    type: "FeatureCollection",
    features: features,
  };

  return (
    <React.Fragment>
      <div>Map of Places</div>
      <div ref={mapContainer} style={{ height: "600px", width: "800px" }} />
    </React.Fragment>
  );
}
