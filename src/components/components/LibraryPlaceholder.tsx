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
    >
      <Rect
        stroke="#e9ecef"
        strokeWidth={4}
        height={dimensions.height}
        width={dimensions.width}
        x={4}
        y={4}
      />
      {children}
    </Group>
  );
};

export { LibraryPlaceholder };
