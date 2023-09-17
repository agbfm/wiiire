import { Stage } from "react-konva";
import { ArtBoard, IArtBoard } from "./objects/ArtBoard";
import { KonvaEventObject } from "konva/lib/Node";

type Props = {
  artboards: IArtBoard[];
  selectedArtBoard: IArtBoard | null;
  onArtBoardSelect: (artboard: IArtBoard | null) => void;
};

const Canvas = (props: Props) => {
  const handleOnStageClick = (e: KonvaEventObject<MouseEvent>) => {
    const emptySpace = e.target === e.target.getStage();
    if (emptySpace) {
      props.onArtBoardSelect(null);
    }
  };

  const handleOnArtBoardSelect = (artboard: IArtBoard) =>
    props.onArtBoardSelect(artboard);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleOnStageClick}
    >
      {props.artboards.map((artboard: IArtBoard) => (
        <ArtBoard
          key={artboard.id}
          selected={
            props.selectedArtBoard !== null &&
            props.selectedArtBoard.id === artboard.id
          }
          size={artboard.size}
          title={artboard.title}
          onSelect={() => handleOnArtBoardSelect(artboard)}
        />
      ))}
    </Stage>
  );
};

export default Canvas;
