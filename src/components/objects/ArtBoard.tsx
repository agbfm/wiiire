import { useState } from "react";
import { Layer, Rect, Text } from "react-konva";

export type ArtBoardLayer = {
  id: string;
  title: string;
};

type Props = {
  selected: boolean;
  title: string;
  onSelect: () => void;
};

const ArtBoard = (props: Props) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleClick = () => props.onSelect();

  return (
    <Layer
      draggable
      onDragEnd={(e) => setCoords({ x: e.target.x(), y: e.target.y() })}
      x={coords.x}
      y={coords.y}
    >
      <Text text={props.title} x={0} y={0} />
      <Rect
        x={0}
        y={20}
        height={750}
        width={375}
        shadowBlur={3}
        shadowColor="#cccccc"
        fill="#ffffff"
        onClick={handleClick}
        stroke={props.selected ? "#4dabf7" : "#ced4da"}
        strokeWidth={1}
      />
    </Layer>
  );
};

export { ArtBoard };
