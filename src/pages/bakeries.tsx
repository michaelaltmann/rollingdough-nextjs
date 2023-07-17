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
import { Place, PlaceCategory } from "@prisma/client";
import { usePlace } from "~/lib/hooks";
import mapboxgl, { MapLayerTouchEvent, MapMouseEvent } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from "react";
import * as React from "react";
import { Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsdG1hbm4iLCJhIjoiQjgzZTEyNCJ9.0_UJWIO6Up0HkMQajYj6Ew";

export default function Bakeries() {
  const { data: bakeries } = usePlace().findMany({
    where: { category: PlaceCategory.BAKERY },
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
    if (!bakeries) return;

    for (const place of bakeries) {
      console.log(`${place.id} ${place.lat} ${place.lon}`);
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
      var x = [...tripPlaces];
      x.splice(index, 1);
      setTripPlaces(x);
    } else {
      setTripPlaces([...tripPlaces, place]);
    }
  }
  function generateLayer() {
    if (!map.current) return;
    if (!bakeries) return;
    const features = bakeries
      .filter((place: Place) => place.lat && place.lon)
      .map((place: Place) => {
        return {
          type: "Feature",
          properties: {
            place_id: place.id,
            description: place.name,
          },
          geometry: {
            type: "Point",
            coordinates: [place.lon, place.lat],
          },
        };
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
        "circle-color": "red",
      },
    });
    map.current.on("click", "places", (e) => {
      const features = e.features;
      if (features) {
        const selected =
          bakeries.find((x) => x.id === features[0]?.properties?.place_id) ||
          null;
        setSelectedPace(selected);
      }
    });
  }

  if (bakeries) {
    return (
      <Stack direction="row">
        <Container
          sx={{
            margin: "3px",
            height: "1000px",
            width: "300px",
            overflow: "scroll",
          }}
        >
          {bakeries.map((bakery) => {
            return (
              <Card
                key={bakery.id}
                sx={{
                  maxWidth: 345,
                  margin: "3px",
                  borderColor: selectedPlace == bakery ? "gray" : "white",
                  borderStyle: "solid",
                }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={bakery.image || ""}
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
            Trip
            <Stack direction="column">
              {tripPlaces.map((place: Place) => {
                return (
                  <Paper key={place.id} sx={{ margin: 1 }}>
                    {place.name}{" "}
                    <Button size="small" onClick={() => toggleTripPlace(place)}>
                      <RemoveCircleOutlineIcon />
                    </Button>
                  </Paper>
                );
              })}
            </Stack>
          </div>
        </Stack>
      </Stack>
    );
  } else {
    return <>Loading ...</>;
  }
}
