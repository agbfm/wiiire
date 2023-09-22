import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Group, Rect, Text } from "react-konva";
import { Button } from "./../../types/button";
import { Coordinates } from "./../../types/coordinates";

type Props = {
  button: Button;
  onDragMove: (
    height: number,
    width: number,
    coordinates: Coordinates
  ) => Coordinates;
  onDragEnd: () => void;
};

const ButtonComponent = ({ button, onDragMove, onDragEnd }: Props) => {
  const [coords, setCoords] = useState(button.coordinates);

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;

    const desiredCoords = { x: e.target.x(), y: e.target.y() };
    const finalCoords = onDragMove(button.height, button.width, desiredCoords);
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
        height={button.height}
        width={button.width}
        fill="#ffffff"
        stroke="#ced4da"
        strokeWidth={1.5}
        cornerRadius={4}
      />
      <Text
        text={button.text}
        x={16}
        y={10}
        fontSize={14}
        align="center"
        width={button.width - 32}
        fill="#495057"
      />
    </Group>
  );
};

export { ButtonComponent };
