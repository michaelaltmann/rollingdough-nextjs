import { Button, Paper } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
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
    <div key={place.id} ref={setNodeRef} style={style}>
      <Paper sx={{ margin: 1 }}>
        <DragIndicatorIcon {...attributes} {...listeners}></DragIndicatorIcon>
        {place.name}
        <Button size="small">
          <HighlightOffOutlinedIcon
            onClick={() => {
              console.log("toggling");
              toggleTripPlace(place);
            }}
          />
        </Button>
      </Paper>
    </div>
  );
}
