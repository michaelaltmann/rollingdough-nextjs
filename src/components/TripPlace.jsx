import { Button, Paper } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

// @ts-ignore
export function TripPlace(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const place = props.place;
  const toggleTripPlace = props.toggleTripPlace;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      key={place.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Paper sx={{ margin: 1 }}>
        {place.name}
        <Button size="small" onClick={() => toggleTripPlace(place)}>
          <RemoveCircleOutlineIcon />
        </Button>
      </Paper>
    </div>
  );
}
