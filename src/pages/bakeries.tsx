import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { PlaceCategory } from "@prisma/client";
import { useState } from "react";
import PlacesMap from "~/components/PlacesMap";
import { usePlace } from "~/lib/hooks";

export default function Bakeries() {
  const { data: bakeries } = usePlace().findMany({
    where: { category: PlaceCategory.BAKERY },
  });

  const [tripPlaces, setTripPlaces] = useState([]);

  if (bakeries) {
    return (
      <Stack direction="row">
        <Container sx={{ margin: "3px" }}>
          {bakeries.map((bakery) => {
            return (
              <Card key={bakery.id} sx={{ maxWidth: 345, margin: 3 }}>
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
                  <Button size="small">Share</Button>
                  <Button size="small">Add to Journey</Button>
                </CardActions>
              </Card>
            );
          })}
        </Container>
        <Stack direction="column">
          <div>Trip</div>
          <PlacesMap places={bakeries}></PlacesMap>
        </Stack>
      </Stack>
    );
  } else {
    return <>Loading ...</>;
  }
}
