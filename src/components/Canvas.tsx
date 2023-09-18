import { useRef } from "react";
import { Stage } from "react-konva";
import { ArtBoard, IArtBoard } from "./objects/ArtBoard";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

const SCALE_AMOUNT = 1.05;

type Props = {
  artboards: IArtBoard[];
  selectedArtBoard: IArtBoard | null;
  zoom: number;
  onArtBoardSelect: (artboard: IArtBoard | null) => void;
  onZoomChange: (zoom: number) => void;
};

const Canvas = (props: Props) => {
  const ref = useRef<Konva.Stage>(null);

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    const emptySpace = e.target === e.target.getStage();
    if (emptySpace) {
      props.onArtBoardSelect(null);
    }
  };

  const handleStageScroll = (e: KonvaEventObject<WheelEvent>) => {
    const stage = ref.current;
    if (!stage) {
      return;
    }

    let direction = e.evt.deltaY > 0 ? 1 : -1;
    let scale = stage.scaleX();

    if (e.evt.ctrlKey) {
      // only zoom if ctrl key is being pressed
      e.evt.preventDefault();
      direction = -direction;

      scale = direction > 0 ? scale * SCALE_AMOUNT : scale / SCALE_AMOUNT;
      stage.scale({ x: scale, y: scale });
    }

    const pointer = stage.getRelativePointerPosition();

    if (pointer) {
      const mousePointTo = {
        x: (pointer.x - stage.x()) / scale,
        y: (pointer.y - stage.y()) / scale,
      };

      const newPosition = {
        x: pointer.x - mousePointTo.x * scale,
        y: pointer.y - mousePointTo.y * scale,
      };
      stage.position(newPosition);
    }

    console.log(scale);
    props.onZoomChange(scale * 100);
  };

  const handleOnArtBoardSelect = (artboard: IArtBoard) =>
    props.onArtBoardSelect(artboard);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleStageClick}
      onWheel={handleStageScroll}
      ref={ref}
      scaleX={props.zoom / 100}
      scaleY={props.zoom / 100}
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
