import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { Group, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import { ArtBoard, getDimensionsForSize } from "./../../types/artboard";
import {
  useArtBoardActions,
  useSelectedArtBoard,
} from "./../../stores/useArtBoardStore";
import { IComponent } from "./../../types/component";
import { Button } from "./../../types/button";
import { ButtonLayer } from "./ButtonLayer";

type Props = {
  artBoard: ArtBoard;
};

const LABEL_ML = 10;
const BOARD_ML = 5;
const BOARD_MT = 20;

const renderButton = (button: Button) => (
  <ButtonLayer button={button} key={button.id} />
);

const ArtBoardLayer = ({ artBoard }: Props) => {
  const ref = useRef<Konva.Group>(null);
  const selectedArtBoard = useSelectedArtBoard();
  const { selectArtBoard, updateArtBoard } = useArtBoardActions();

  const [coords, setCoords] = useState(artBoard.coordinates);

  const handleClick = () => handleOnSelect();
  const handleDragStart = () => handleOnSelect();
  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const coordinates = { x: e.target.x(), y: e.target.y() };
    setCoords(coordinates);

    const updated = { ...artBoard, coordinates };
    updateArtBoard(updated);
  };

  const handleOnSelect = () => selectArtBoard(artBoard);

  const dimensions = getDimensionsForSize(artBoard.size);
  const groupDimensions = {
    height: dimensions.height + (BOARD_ML + BOARD_MT),
    width: dimensions.width + BOARD_ML * 2,
  };

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
        <Text text={artBoard.title} x={LABEL_ML} y={0} />
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
          />
          {artBoard.components?.map((c: IComponent) => {
            switch (c.kind) {
              case "button":
                return renderButton(c as Button);
            }
          })}
        </Group>
      </Group>
    </Layer>
  );
};

export { ArtBoardLayer };
