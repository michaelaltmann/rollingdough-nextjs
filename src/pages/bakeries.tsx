import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Icon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Place } from "@prisma/client";
import { usePlace } from "~/lib/hooks";
import mapboxgl, { GeoJSONSource, MapMouseEvent } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from "react";
import * as React from "react";
import { Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsdG1hbm4iLCJhIjoiQjgzZTEyNCJ9.0_UJWIO6Up0HkMQajYj6Ew";

import { TripPlaces } from "../components/TripPlaces";

export default function Bakeries() {
  const { data: places } = usePlace().findMany({
    // where: { category: PlaceCategory.BAKERY },
    include: {
      placeImage: true,
    },
  });

  const [tripPlaces, setTripPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPace] = useState<Place | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-93.26);
  const [lat, setLat] = useState(44.95);
  const refs = useRef<Map<string, any> | null>(null);

  function getRefs() {
    if (!refs.current) refs.current = new Map();
    return refs.current;
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
    map.current.on("load", () => generateLayer());
    return () => {
      map.current?.off("load", generateLayer);
    };
  });

  function generateMarkers() {
    if (!map.current) return;
    if (!places) return;

    for (const place of places) {
      //      console.log(`${place.id} ${place.lat || ""} ${place.lon || ""}`);
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
  function toggleTripPlace(place: Place) {
    const index = tripPlaces.indexOf(place);
    if (index >= 0) {
      console.log("removing " + place.id);
      const x = [...tripPlaces];
      x.splice(index, 1);
      setTripPlaces(x);
    } else {
      console.log("adding " + place.id);
      setTripPlaces([...tripPlaces, place]);
    }
  }
  async function typedRequest<TResponse>(
    url: string,
    config: RequestInit
  ): Promise<TResponse> {
    const response = await fetch(url, config);
    return (await response.json()) as Promise<TResponse>;
  }

  async function generateTripPath() {
    const coords = tripPlaces
      .map((place) => `${place.lon || 0},${place.lat || 0}`)
      .join(";");
    const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${coords}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

    type JSONResponse = {
      routes: Array<{ geometry: { coordinates: Array<number[]> } }>;
    };

    const { routes }: JSONResponse = await typedRequest<JSONResponse>(url, {
      method: "GET",
    });
    const route = routes[0];
    const coordinates = route?.geometry?.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
    } as GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>;
    if (map.current?.getSource("route")) {
      (map.current?.getSource("route") as GeoJSONSource)?.setData(geojson);
    } else {
      map.current?.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {},
        paint: {
          "line-color": "blue",
          "line-opacity": 0.5,
          "line-width": 6,
        },
      });
    }
    // if the route already exists on the map, we'll reset it using setData
  }
  function generateLayer() {
    if (!map.current) return;
    if (!places) return;
    const features = places
      .filter((place: Place) => place.lat && place.lon)
      .map((place: Place) => {
        const f: GeoJSON.Feature = {
          type: "Feature",
          properties: {
            place_id: place.id,
            description: place.name,
            category: place.category,
          },
          geometry: {
            type: "Point",
            coordinates: [place.lon || 0, place.lat || 0],
          },
        };
        return f;
      });
    map.current.addSource("places", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features,
      },
    });

    map.current.addLayer({
      id: "places",
      type: "circle",
      source: "places",
      layout: {},
      paint: {
        "circle-radius": [
          "match",
          ["get", "category"],
          "BAKERY",
          12,
          "MURAL",
          6,
          "ART",
          6,
          6,
        ],
        "circle-color": [
          "match",
          ["get", "category"],
          "BAKERY",
          "orange",
          "MURAL",
          "green",
          "ART",
          "purple",
          "gray",
        ],
      },
    });
    map.current.on("click", "places", (e) => {
      const features = e.features;
      if (features) {
        const place_id = features[0]?.properties?.place_id;
        const selected = places.find((x) => x.id === place_id) || null;
        setSelectedPace(selected);
        const map = getRefs();
        const node = map.get(place_id);
        node?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  if (places) {
    return (
      <Stack direction="row">
        <Container
          sx={{
            margin: "3px",
            height: "1000px",
            minWidth: 340,
            overflow: "scroll",
          }}
        >
          {places.map((bakery) => {
            return (
              <Card
                key={bakery.id}
                sx={{
                  width: 270,
                  margin: "3px",
                  borderColor: selectedPlace == bakery ? "gray" : "white",
                  borderStyle: "solid",
                }}
                ref={(node) => {
                  const map = getRefs();
                  if (node) {
                    map.set(bakery.id, node);
                  } else {
                    map.delete(bakery.id);
                  }
                }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={bakery.placeImage[0]?.url || ""}
                  title="bakery item"
                />
                <CardContent>
                  {" "}
                  <Typography gutterBottom variant="h5" component="div">
                    {bakery.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.primary"
                    component="div"
                  >
                    {bakery.address}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    component="div"
                  >
                    {bakery.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button disabled={tripPlaces.includes(bakery)}>
                    <AddCircleOutlineIcon
                      onClick={() => toggleTripPlace(bakery)}
                    />
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Container>
        <Stack direction="column">
          <div
            ref={mapContainer}
            style={{ height: "800px", width: "1200px" }}
          />
          <div>
            {tripPlaces?.length ? (
              <>
                <Button size="small" onClick={() => generateTripPath()}>
                  Build Route{" "}
                </Button>
                <TripPlaces
                  tripPlaces={tripPlaces}
                  setTripPlaces={setTripPlaces}
                  toggleTripPlace={toggleTripPlace}
                />
              </>
            ) : (
              <Typography sx={{ alignContent: "center" }}>
                Select Places to Visit
              </Typography>
            )}
          </div>
        </Stack>
      </Stack>
    );
  } else {
    return <>Loading ...</>;
  }
}
