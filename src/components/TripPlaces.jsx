// @ts-nocheck
// @ts-ignore
import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { TripPlace } from "./TripPlace";

export function TripPlaces({ tripPlaces, setTripPlaces, toggleTripPlace }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tripPlaces}
        strategy={verticalListSortingStrategy}
      >
        {tripPlaces.map((place) => (
          <TripPlace
            id={place.id}
            key={place.id}
            place={place}
            toggleTripPlace={toggleTripPlace}
          />
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTripPlaces((tripPlaces) => {
        const oldIndex = tripPlaces.findIndex(
          (place) => place.id === active.id
        );
        const newIndex = tripPlaces.findIndex((place) => place.id === over.id);

        return arrayMove(tripPlaces, oldIndex, newIndex);
      });
    }
  }
}
