import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Layer, Rect, Text } from "react-konva";

enum ArtBoardSize {
  MOBILE = "mobile",
  TABLET = "tablet",
  DESKTOP = "desktop",
  WIDE = "wide",
}

const getDimensionsForSize = (size: ArtBoardSize) => {
  switch (size) {
    case ArtBoardSize.MOBILE:
      return { height: 750, width: 375 };
    case ArtBoardSize.TABLET:
      return { height: 900, width: 1280 };
    case ArtBoardSize.WIDE:
      return { height: 1080, width: 1920 };
    case ArtBoardSize.DESKTOP:
    default:
      return { height: 1080, width: 1536 };
  }
};

export interface IArtBoard {
  id: string;
  size: ArtBoardSize;
  title: string;
}

type Props = {
  selected: boolean;
  size: ArtBoardSize;
  title: string;
  onSelect: () => void;
};

const ArtBoard = (props: Props) => {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleClick = () => props.onSelect();
  const handleDragStart = () => props.onSelect();
  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setCoords({ x: e.target.x(), y: e.target.y() });
  };

  const dimensions = getDimensionsForSize(props.size);

  return (
    <Layer
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      x={coords.x}
      y={coords.y}
    >
      <Text text={props.title} x={5} y={0} />
      <Rect
        x={0}
        y={20}
        height={dimensions.height}
        width={dimensions.width}
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

export { ArtBoard, ArtBoardSize };
