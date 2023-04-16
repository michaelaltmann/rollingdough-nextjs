import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useBakery } from "~/lib/hooks";

export default function Bakeries() {
  const { data: bakeries } = useBakery().findMany({});

  if (bakeries) {
    return (
      <>
        {bakeries.map((bakery) => {
          return (
            <Card key={bakery.id}>
              <CardMedia sx={{ height: 140 }} image="" title="green iguana" />
              <CardContent>
                {" "}
                <Typography gutterBottom variant="h5" component="div">
                  {bakery.name}
                </Typography>
                <Typography gutterBottom component="div">
                  {bakery.address}
                </Typography>
                <Typography gutterBottom component="div">
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
      </>
    );
  } else {
    return <>Loading ...</>;
  }
}
