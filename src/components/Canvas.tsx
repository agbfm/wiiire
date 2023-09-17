import { Stage } from "react-konva";
import { ArtBoard, ArtBoardLayer } from "./objects/ArtBoard";
import { useState } from "react";

type Props = {
  artboards: ArtBoardLayer[];
};

const Canvas = (props: Props) => {
  const [selectedArtBoard, setSelectedArtBoard] =
    useState<ArtBoardLayer | null>(null);

  const handleOnStageClick = () => setSelectedArtBoard(null);
  const handleOnArtBoardSelect = (artboard: ArtBoardLayer) =>
    setSelectedArtBoard(artboard);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleOnStageClick}
    >
      {props.artboards.map((artboard: ArtBoardLayer) => (
        <ArtBoard
          selected={
            selectedArtBoard !== null && selectedArtBoard.id === artboard.id
          }
          title={artboard.title}
          onSelect={() => handleOnArtBoardSelect(artboard)}
        />
      ))}
    </Stage>
  );
};

export default Canvas;
