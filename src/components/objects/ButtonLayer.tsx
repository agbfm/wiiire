import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Group, Rect, Text } from "react-konva";
import { Button } from "./../../types/button";

type Props = {
  button: Button;
};

const ButtonLayer = ({ button }: Props) => {
  const [coords, setCoords] = useState(button.coordinates);

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;

    const coordinates = { x: e.target.x(), y: e.target.y() };
    setCoords(coordinates);
  };

  return (
    <Group draggable onDragEnd={handleDragEnd} x={coords.x} y={coords.y}>
      <Rect
        x={0}
        y={0}
        height={button.height}
        width={button.width}
        fill="#ffffff"
        stroke="#ced4da"
        strokeWidth={2}
        cornerRadius={4}
      />
      <Text
        text={button.label}
        x={16}
        y={10}
        fontSize={14}
        align="center"
        width={button.width - 32}
      />
    </Group>
  );
};

export { ButtonLayer };
