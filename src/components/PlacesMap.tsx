import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from "react";
import * as React from "react";
import { Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Place } from "@prisma/client";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsdG1hbm4iLCJhIjoiQjgzZTEyNCJ9.0_UJWIO6Up0HkMQajYj6Ew";

export default function PlacesMap(props: { places: Place[] }) {
  const { places } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-93.26);
  const [lat, setLat] = useState(44.95);

  function generateMarkers() {
    if (!map.current) return;
    for (const place of places) {
      if (place.lat != null && place.lon != null) {
        const popUp = new Popup({ closeButton: false, anchor: "left" }).setHTML(
          `<div class="popup">${place.name}</div>`
        );
        new mapboxgl.Marker({
          color: "#000000",
          scale: 0.7,
        })
          .setLngLat([place.lon, place.lat])
          .setPopup(popUp)
          .addTo(map.current);
      }
    }
  }
  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 12,
    });
    map.current.on("load", () => generateMarkers());

    return () => {
      map.current?.off("load", generateMarkers);
    };
  });

  return (
    <React.Fragment>
      <div>Map of Places</div>
      <div ref={mapContainer} style={{ height: "800px", width: "1200px" }} />
    </React.Fragment>
  );
}
