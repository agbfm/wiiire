import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Group, Text } from "react-konva";
import { Label } from "./../../types/label";
import { Coordinates } from "./../../types/coordinates";

type Props = {
  label: Label;
  onDragMove: (
    height: number,
    width: number,
    coordinates: Coordinates
  ) => Coordinates;
  onDragEnd: () => void;
};

const LabelComponent = ({ label, onDragMove, onDragEnd }: Props) => {
  const [coords, setCoords] = useState(label.coordinates);

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;

    const desiredCoords = { x: e.target.x(), y: e.target.y() };
    const finalCoords = onDragMove(label.height, label.width, desiredCoords);
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

  const fontSize =
    label.size === "h1"
      ? 30
      : label.size === "h2"
      ? 24
      : label.size === "h3"
      ? 20
      : label.size === "h4"
      ? 18
      : label.size === "h5"
      ? 16
      : label.size === "h6"
      ? 14
      : 12;

  return (
    <Group
      draggable
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      x={coords.x}
      y={coords.y}
    >
      <Text
        x={0}
        y={0}
        height={label.height}
        width={label.width}
        fill="#495057"
        fontSize={fontSize}
        text={label.text}
      />
    </Group>
  );
};

export { LabelComponent };
