import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { Group, Layer, Line, Rect, Text } from "react-konva";
import Konva from "konva";
import { ArtBoard, getDimensionsForSize } from "@/types/artboard";
import {
  useArtBoardActions,
  useSelectedArtBoard,
} from "@/stores/useArtBoardStore";
import { IComponent } from "@/types/component";
import { ComponentProvider } from "./ComponentProvider";
import {
  useComponentActions,
  useComponents,
  useSelectedComponent,
} from "@/stores/useComponentStore";

interface Props {
  artBoard: ArtBoard;
}

const LABEL_ML = 10;
const BOARD_ML = 5;
const BOARD_MT = 20;

const ArtBoardComponent = ({ artBoard }: Props) => {
  // refs
  const ref = useRef<Konva.Group>(null);

  // artboards
  const selectedArtBoard = useSelectedArtBoard();
  const { selectArtBoard, updateArtBoard } = useArtBoardActions();

  // components
  const allComponents = useComponents();
  const selectedComponent = useSelectedComponent();
  const { selectComponent } = useComponentActions();

  const [coords, setCoords] = useState(artBoard.coordinates);
  // const [showHorizontalGuideline, toggleHorizontalGuideline] = useState(false);
  // const [showVerticalGuideline, toggleVerticalGuideline] = useState(false);
  const showHorizontalGuideline = false;
  const showVerticalGuideline = false;

  const handleClick = () => {
    handleOnSelect();
  };

  const handleDragStart = () => {
    handleOnSelect();
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    if (selectArtBoard === null) {
      return;
    }

    const coordinates = { x: e.target.x(), y: e.target.y() };
    setCoords(coordinates);

    const updated = { ...artBoard, coordinates };
    updateArtBoard(updated);
  };

  const handleOnSelect = () => {
    if (selectedComponent !== null) {
      selectComponent(null);
    }
    selectArtBoard(artBoard);
  };

  const dimensions = getDimensionsForSize(artBoard.size);
  const groupDimensions = {
    height: dimensions.height + (BOARD_ML + BOARD_MT),
    width: dimensions.width + BOARD_ML * 2,
  };

  // const handleChildDragMove = (
  //   height: number,
  //   width: number,
  //   coordinates: Coordinates
  // ): Coordinates => {
  //   const relativeCoords = {
  //     x: coordinates.x - BOARD_ML,
  //     y: coordinates.y - BOARD_MT,
  //   };
  //   const finalCoords = relativeCoords;

  //   const verticalCenter = (dimensions.width - width) / 2;
  //   const toggleVertical =
  //     relativeCoords.x >= verticalCenter - 1 &&
  //     relativeCoords.x <= verticalCenter + 1;

  //   toggleVerticalGuideline(toggleVertical);
  //   if (toggleVertical) {
  //     finalCoords.x = verticalCenter + BOARD_ML;
  //   }

  //   const horizontalCenter = (dimensions.height - height) / 2;
  //   const toggleHorizontal =
  //     relativeCoords.y >= horizontalCenter - 1 &&
  //     relativeCoords.y <= horizontalCenter + 1;

  //   toggleHorizontalGuideline(toggleHorizontal);
  //   if (toggleHorizontal) {
  //     finalCoords.y = horizontalCenter + BOARD_MT;
  //   }

  //   return finalCoords;
  // };

  // const handleChildDragEnd = () => {
  //   toggleHorizontalGuideline(false);
  //   toggleVerticalGuideline(false);
  // };

  const components = artBoard.components.filter(({ id }: IComponent) =>
    allComponents.some((c: IComponent) => c.id === id)
  );

  return (
    <Layer
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      x={coords.x}
      y={coords.y}
    >
      <Group
        ref={ref}
        height={groupDimensions.height}
        width={groupDimensions.width}
        x={0}
        y={0}
      >
        <Text text={artBoard.title} x={LABEL_ML} y={0} onClick={handleClick} />
        <Rect
          x={BOARD_ML}
          y={BOARD_MT}
          height={dimensions.height + 1}
          width={dimensions.width + 1}
          shadowBlur={3}
          shadowColor="#cccccc"
          stroke={
            selectedArtBoard !== null && selectedArtBoard.id === artBoard.id
              ? "#4dabf7"
              : "#ced4da"
          }
          strokeWidth={1}
          onClick={handleClick}
        />
        <Group
          ref={ref}
          clipHeight={dimensions.height}
          clipWidth={dimensions.width}
          clipX={BOARD_ML}
          clipY={BOARD_MT}
          height={dimensions.height}
          width={dimensions.width}
          x={0}
          y={0}
        >
          <Rect
            x={BOARD_ML}
            y={BOARD_MT}
            height={dimensions.height}
            width={dimensions.width}
            fill="#ffffff"
            onClick={handleClick}
          />
          {showHorizontalGuideline && (
            <Line
              stroke="red"
              strokeWidth={1}
              points={[
                5,
                dimensions.height / 2 + 20,
                dimensions.width + 5,
                dimensions.height / 2 + 20,
              ]}
            />
          )}
          {showVerticalGuideline && (
            <Line
              stroke="red"
              strokeWidth={1}
              points={[
                dimensions.width / 2 + 5,
                20,
                dimensions.width / 2 + 5,
                dimensions.height + 20,
              ]}
            />
          )}
          {components?.map((c: IComponent) => (
            <ComponentProvider component={c} key={c.id} />
          ))}
        </Group>
      </Group>
    </Layer>
  );
};

export { ArtBoardComponent };
