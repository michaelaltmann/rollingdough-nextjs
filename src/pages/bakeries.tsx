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

import { Place } from "@prisma/client";
import { PlaceImage } from "@prisma/client";
import { usePlace } from "~/lib/hooks";
import mapboxgl, { GeoJSONSource, MapMouseEvent } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect, useCallback } from "react";
import * as React from "react";
import { Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsdG1hbm4iLCJhIjoiQjgzZTEyNCJ9.0_UJWIO6Up0HkMQajYj6Ew";

import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
export default function Bakeries() {
  const { data: places } = usePlace().findMany({
    // where: { category: PlaceCategory.BAKERY },
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
  const [lng, setLng] = useState(-93.26);
  const [lat, setLat] = useState(44.95);
  const refs = useRef<Map<string, any> | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType, eventName: string) => {
      setSelectedPlaceIndex(emblaApi.selectedScrollSnap());
    },
    []
  );

  useEffect(() => {
    if (emblaApi) emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const generateTripPath = React.useCallback(async () => {
    var coordinates;
    if (tripPlaces && tripPlaces.length > 1) {
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

      coordinates = routes[0]?.geometry?.coordinates;
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
      zoom: 12,
    });
    map.current.on("load", () => generateLayer());
    return () => {
      map.current?.off("load", generateLayer);
    };
  });
  useEffect(() => {
    generateTripPath();
  }, [generateTripPath]);

  useEffect(() => {
    if (!map.current) return;
    let features: Feature<Geometry, GeoJsonProperties>[] = [];
    if (selectedPlaceIndex != null) {
      emblaApi?.scrollTo(selectedPlaceIndex);
      const index = selectedPlaceIndex;
      const place = places ? places[index] : null;
      if (place) {
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
  }, [selectedPlaceIndex, map]);
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
          6,
          "true",
          12,
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
        const index = features[0]?.properties?.index;
        setSelectedPlaceIndex(index);
      }
    });
  }
  function buildSlide(bakery: Place & { placeImage: PlaceImage[] }, i: number) {
    return (
      <Card
        key={bakery.id}
        sx={{
          flex: "0 0 100%",
          minWidth: 0,
          width: "270px",
          height: "380px",
          borderColor: selectedPlaceIndex == i ? "gray" : "white",
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
          sx={{ height: 200, width: 360 }}
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
            <Button size="small">
              <HighlightOffOutlinedIcon
                onClick={() => toggleTripPlace(bakery)}
              />{" "}
            </Button>
          ) : (
            <Button>
              <AddCircleOutlineIcon onClick={() => toggleTripPlace(bakery)} />
            </Button>
          )}
        </CardActions>
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

  if (places)
    return (
      <Stack direction="column">
        <div
          id="mapcontainer"
          ref={mapContainer}
          style={{ height: "350px", width: "100%" }}
        />

        <div>{carouselFragment}</div>
      </Stack>
    );
  else {
    return <div>Loading ...</div>;
  }
}
