import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Group, Rect } from "react-konva";
import { Card } from "./../../types/card";
import { Coordinates } from "../../types/coordinates";

type Props = {
  card: Card;
  onDragMove: (
    height: number,
    width: number,
    coordinates: Coordinates
  ) => Coordinates;
  onDragEnd: () => void;
};

const CardLayer = ({ card, onDragMove, onDragEnd }: Props) => {
  const [coords, setCoords] = useState(card.coordinates);

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;

    const desiredCoords = { x: e.target.x(), y: e.target.y() };
    const finalCoords = onDragMove(card.height, card.width, desiredCoords);
    if (
      finalCoords.x !== desiredCoords.x ||
      finalCoords.y !== desiredCoords.y
    ) {
      // setCoords(finalCoords);
    }
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;

    const coordinates = { x: e.target.x(), y: e.target.y() };
    setCoords(coordinates);

    onDragEnd();
  };

  const cornerRadius =
    card.radius === "lg"
      ? 16
      : card.radius === "md"
      ? 12
      : card.radius === "sm"
      ? 8
      : 4;

  return (
    <Group
      draggable
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      x={coords.x}
      y={coords.y}
    >
      <Rect
        x={0}
        y={0}
        height={card.height}
        width={card.width}
        fill="#ffffff"
        stroke="#adb5bd"
        strokeWidth={1}
        cornerRadius={cornerRadius}
      />
    </Group>
  );
};

export { CardLayer };
