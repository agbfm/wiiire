import { Coordinates, Dimensions } from "@/types/component";
import { KonvaEventObject } from "konva/lib/Node";
import { ReactNode } from "react";
import { Group, Rect } from "react-konva";

interface Props {
  children: ReactNode;
  coordinates: Coordinates;
  dimensions: Dimensions;
  onClick: () => void;
}

const BORDER_WIDTH = 4;

const LibraryPlaceholder = ({
  children,
  coordinates,
  dimensions,
  onClick,
}: Props) => {
  const onMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (stage !== null) {
      stage.container().style.cursor = "pointer";
    }
  };

  const onMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (stage !== null) {
      stage.container().style.cursor = "default";
    }
  };

  return (
    <Group
      x={coordinates.x}
      y={coordinates.y}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      clipX={0}
      clipY={0}
      clipHeight={dimensions.height + BORDER_WIDTH}
      clipWidth={dimensions.width + BORDER_WIDTH}
    >
      <Rect
        stroke="#e9ecef"
        strokeWidth={BORDER_WIDTH}
        height={dimensions.height}
        width={dimensions.width}
        x={BORDER_WIDTH}
        y={BORDER_WIDTH}
      />
      {children}
    </Group>
  );
};

export { LibraryPlaceholder };
