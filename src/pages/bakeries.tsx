import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Icon,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Place, PlaceGroup } from "@prisma/client";
import { PlaceImage } from "@prisma/client";
import { usePlace } from "~/lib/hooks";
import mapboxgl, { GeoJSONSource } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect, useCallback } from "react";
import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsdG1hbm4iLCJhIjoiY20wZmY0eWJrMHZmdDJqcHIzZm1udHlucyJ9.SntRg7Qa2MckRngH_dD7hg";

import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
export default function Bakeries() {
  const { data: places } = usePlace().findMany({
    where: { grouping: PlaceGroup.SOUTH },
    orderBy: [{ lon: "asc" }],
    include: {
      placeImage: true,
    },
  });

  const [tripPlaces, setTripPlaces] = useState<Place[]>([]);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState<number | null>(
    null
  );
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-93.27);
  const [lat, setLat] = useState(44.94);
  const refs = useRef<Map<string, any> | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [instructions, setInstructions] = useState<
    Array<Array<String>> | undefined
  >([["Route Instructions:"]]);
  const [tripDistance, setTripDistance] = useState(0);
  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType, eventName: string) => {
      setSelectedPlaceIndex(emblaApi.selectedScrollSnap());
    },
    []
  );

  useEffect(() => {
    if (emblaApi) emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  function generateGoogleMapsUrl() {
    function asLatLon(place: Place | undefined) {
      if (place) {
        return `${place.lat || 0},${place.lon || 0}`;
      } else {
        return "";
      }
    }
    if (tripPlaces && tripPlaces.length > 1) {
      const origin = asLatLon(tripPlaces[0]);
      const destination = asLatLon(tripPlaces[tripPlaces.length - 1]);
      const waypoints = tripPlaces
        .slice(1, tripPlaces.length - 1)
        .map((place) => asLatLon(place))
        .join(";");
      const url = `https://www.google.com/maps/dir/?api=1&travelmode=bicycling&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
      return url;
    } else {
      return "";
    }
  }

  const generateTripPath = React.useCallback(async () => {
    var coordinates;
    if (tripPlaces && tripPlaces.length > 1) {
      const coords = tripPlaces
        .map((place) => `${place.lon || 0},${place.lat || 0}`)
        .join(";");
      const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${coords}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

      type JSONResponse = {
        routes: Array<{
          distance: number;
          geometry: { coordinates: Array<number[]> };
          legs: Array<{ steps: Array<{ maneuver: { instruction: String } }> }>;
        }>;
      };

      const { routes }: JSONResponse = await typedRequest<JSONResponse>(url, {
        method: "GET",
      });
      const bestRoute = routes[0];
      coordinates = bestRoute?.geometry?.coordinates;
      const instructionTexts = bestRoute?.legs?.map((leg) =>
        leg.steps.map((x) => x.maneuver.instruction)
      );
      setInstructions(instructionTexts);
      setTripDistance(bestRoute?.distance || 0);
    } else {
      coordinates = [];
    }
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
  }, [tripPlaces]);

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
      zoom: 11,
      dragPan: false,
    });
    map.current.on("load", () => generateLayer());
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
    return () => {
      map.current?.off("load", generateLayer);
    };
  });

  useEffect(() => {
    generateTripPath();
  }, [generateTripPath]);

  useEffect(() => {
    if (!map.current) return;
    if (!map.current.loaded()) return;
    let features: Feature<Geometry, GeoJsonProperties>[] = [];
    if (selectedPlaceIndex != null) {
      emblaApi?.scrollTo(selectedPlaceIndex);
      const index = selectedPlaceIndex;
      const place = places ? places[index] : null;
      if (place) {
        //  map.current.panTo([place.lon || 0, place.lat || 0]);
        const f: GeoJSON.Feature = {
          type: "Feature",
          properties: {
            index: index,
            place_id: place.id,
            description: place.name,
            category: place.category,
          },
          geometry: {
            type: "Point",
            coordinates: [place.lon || 0, place.lat || 0],
          },
        };
        features = [f];
      }
    }
    if (!map.current.getSource("selectedPlace")) {
      map.current.addSource("selectedPlace", {
        type: "geojson",
      });
      map.current.addLayer({
        id: "selectedPlace",
        type: "circle",
        source: "selectedPlace",
        layout: {},
        paint: {
          "circle-radius": 14,
          "circle-color": "black",
          "circle-stroke-width": 2,
          "circle-opacity": 0,
        },
      });
    }
    if (features.length) {
      (map.current.getSource("selectedPlace") as GeoJSONSource)?.setData({
        type: "FeatureCollection",
        features: features,
      });
    }
  }, [selectedPlaceIndex, map, emblaApi, places]);
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

  function generateLayer() {
    if (!map.current) return;
    if (!map.current.loaded()) return;
    if (!places) return;

    const features = places
      .filter((place: Place) => place.lat && place.lon)
      .map((place: Place, index: number) => {
        const f: GeoJSON.Feature = {
          type: "Feature",
          properties: {
            index: index,
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
          ["get", "selected"],
          "false",
          9,
          "true",
          12,
          6,
        ],
        "circle-color": [
          "match",
          ["get", "category"],
          "BAKERY",
          "#B87116",
          "MURAL",
          "#D787CD",
          "ART",
          "#D787CD",
          "gray",
        ],
      },
    });
    map.current.on("click", "places", (e) => {
      const features = e.features;
      if (features) {
        const index = features[0]?.properties?.index;
        setSelectedPlaceIndex(index);
      }
    });
  }
  function buildLoading() {
    return (
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <CircularProgress
          sx={{
            marginTop: "120px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </Box>
    );
  }
  function buildSlide(bakery: Place & { placeImage: PlaceImage[] }, i: number) {
    return (
      <Card
        key={bakery.id}
        sx={{
          flex: "0 0 100%",
          minWidth: 0,
          width: "100%",
          maxWidth: "480px",
          height: "300px",
          borderColor: "gray",
          borderWidth: 1,
          borderStyle: "solid",
          marginRight: 1,
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
        <Typography gutterBottom variant="h6" component="span">
          <Button
            sx={{
              minWidth: "24px",
              padding: 0,
              marginLeft: "16px",
              marginRight: "4px",
            }}
          >
            {tripPlaces.includes(bakery) ? (
              <HighlightOffOutlinedIcon
                onClick={() => toggleTripPlace(bakery)}
              />
            ) : (
              <AddCircleOutlineIcon onClick={() => toggleTripPlace(bakery)} />
            )}
          </Button>

          {bakery.name}
        </Typography>
        {" | "}
        <Typography
          gutterBottom
          variant="body2"
          color="text.primary"
          component="span"
        >
          {bakery.address}
        </Typography>
        <CardMedia
          sx={{ height: 200, width: "100%" }}
          image={bakery.placeImage[0]?.url || ""}
          title="bakery item"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            component="div"
          >
            {bakery.description}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    );
  }

  const carouselFragment = (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {(places || []).map((bakery, i) => {
            return buildSlide(bakery, i);
          })}
        </div>
      </div>
    </div>
  );
  const caloriesPerPastry = 50;
  const caloriesPerKilometer = 30;
  const scones = Math.round(
    ((tripDistance / 1000) * caloriesPerKilometer) / caloriesPerPastry
  );
  if (places)
    return (
      <Stack direction="column">
        <div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 100,
              color: "blue",
              backgroundColor: "beige",
            }}
          >
            Your ride will burn {scones} {scones == 1 ? "scone" : "scones"}
          </div>
          <div
            id="mapcontainer"
            ref={mapContainer}
            style={{ height: "230px", width: "100%" }}
          />
        </div>
        <div>{carouselFragment}</div>
        {tripPlaces.length > 1 && (
          <div>
            <Button
              sx={{ fontSize: "large", borderStyle: "solid", borderWidth: 2 }}
            >
              <a target="_blank" href={generateGoogleMapsUrl()}>
                Open in Maps <DirectionsBikeIcon />
              </a>
            </Button>
            <h3>{tripPlaces[0]?.name}</h3>
            {instructions?.map((leg: Array<String>, i: number) => (
              <div key={i}>
                <ul>
                  {leg?.map((s: String, j: number) => (
                    <li key={j}> {s}</li>
                  ))}
                </ul>
                <h3>{tripPlaces[i + 1]?.name}</h3>
              </div>
            ))}
          </div>
        )}
      </Stack>
    );
  else {
    return buildLoading();
  }
}
