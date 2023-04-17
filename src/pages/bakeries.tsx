import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useBakery } from "~/lib/hooks";

export default function Bakeries() {
  const { data: bakeries } = useBakery().findMany({});

  if (bakeries) {
    return (
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
    );
  } else {
    return <>Loading ...</>;
  }
}
