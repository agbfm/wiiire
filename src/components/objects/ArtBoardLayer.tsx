import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Layer, Rect, Text } from "react-konva";
import { ArtBoard, getDimensionsForSize } from "../../types/artboard";
import { ArtBoardState, useArtBoardStore } from "../../stores/useArtBoardStore";

type Props = {
  artBoard: ArtBoard;
};

const ArtBoardLayer = (props: Props) => {
  const selectedArtBoard = useArtBoardStore(
    (state: ArtBoardState) => state.selectedArtBoard
  );
  const selectArtBoard = useArtBoardStore(
    (state: ArtBoardState) => state.setSelectedArtBoard
  );
  const updateArtBoard = useArtBoardStore(
    (state: ArtBoardState) => state.updateArtBoard
  );

  const { artBoard } = props;
  const [coords, setCoords] = useState(artBoard.coordinates);

  const handleClick = () => handleOnSelect();
  const handleDragStart = () => handleOnSelect();
  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const coordinates = { x: e.target.x(), y: e.target.y() };
    setCoords(coordinates);

    const updated = { ...artBoard, coordinates };
    updateArtBoard(updated);
  };

  const handleOnSelect = () => {
    selectArtBoard(artBoard);
  };

  const dimensions = getDimensionsForSize(artBoard.size);

  return (
    <Layer
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      x={coords.x}
      y={coords.y}
    >
      <Text text={artBoard.title} x={5} y={0} />
      <Rect
        x={0}
        y={20}
        height={dimensions.height}
        width={dimensions.width}
        shadowBlur={3}
        shadowColor="#cccccc"
        fill="#ffffff"
        stroke={
          selectedArtBoard !== null && selectedArtBoard.id === artBoard.id
            ? "#4dabf7"
            : "#ced4da"
        }
        strokeWidth={1}
        onClick={handleClick}
      />
    </Layer>
  );
};

export { ArtBoardLayer };
