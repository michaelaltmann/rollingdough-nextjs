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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsdG1hbm4iLCJhIjoiQjgzZTEyNCJ9.0_UJWIO6Up0HkMQajYj6Ew";
import mbxDirectionsClient from "@mapbox/mapbox-sdk/services/directions";
import type { DirectionsWaypoint } from "@mapbox/mapbox-sdk/services/directions";
import { DirectionsProfileExclusion } from "@mapbox/mapbox-sdk/services/directions";
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
    map.current.on("click", (e) => handleClick(e));
    return () => {
      map.current?.off("load", generateLayer);
    };
  });

  function handleClick(e: MapMouseEvent) {
    console.log(e);
  }

  function generateMarkers() {
    if (!map.current) return;
    if (!places) return;

    for (const place of places) {
      console.log(`${place.id} ${place.lat || ""} ${place.lon || ""}`);
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
      const x = [...tripPlaces];
      x.splice(index, 1);
      setTripPlaces(x);
    } else {
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
    /*
        const exclusions = { profile: "cycling" } as DirectionsProfileExclusion;
    const options = {
      waypoints: tripPlaces.map((place) => {
        return {
          coordinates: [place.lon || 0, place.lat || 0],
        } as DirectionsWaypoint;
      }),
    };
    const directionsClient = mbxDirectionsClient({
      accessToken: mapboxgl.accessToken,
    });
    directionsClient
      .getDirections({ ...options, ...exclusions })
      .send()
      .then((response) => {
        const json = response.body;
        const data = json?.routes[0];
        const geojson = data?.geometry?.coordinates;
        if (map.current?.getSource("route")) {
          map.current?.getSource("route")?.setData(geojson);
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
              "line-color": "green",
              "line-width": 2,
            },
          });
        }
      });
      */
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
          "line-color": "green",
          "line-width": 2,
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
          10,
          "MURAL",
          4,
          "ART",
          4,
          4,
        ],
        "circle-color": [
          "match",
          ["get", "category"],
          "BAKERY",
          "orange",
          "MURAL",
          "blue",
          "ART",
          "purple",
          "gray",
        ],
      },
    });
    map.current.on("click", "places", (e) => {
      const features = e.features;
      if (features) {
        const selected =
          places.find((x) => x.id === features[0]?.properties?.place_id) ||
          null;
        setSelectedPace(selected);
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
                  {tripPlaces.includes(bakery) ? (
                    ""
                  ) : (
                    <AddCircleOutlineIcon
                      onClick={() => toggleTripPlace(bakery)}
                    />
                  )}
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
                <Stack direction="column">
                  {tripPlaces.map((place: Place) => {
                    return (
                      <Paper key={place.id} sx={{ margin: 1 }}>
                        {place.name}{" "}
                        <Button
                          size="small"
                          onClick={() => toggleTripPlace(place)}
                        >
                          <RemoveCircleOutlineIcon />
                        </Button>
                      </Paper>
                    );
                  })}
                </Stack>
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
