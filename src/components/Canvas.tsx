import { KeyboardEvent, useRef } from "react";
import { Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import { ArtBoardComponent } from "./components/ArtBoardComponent";
import { ArtBoard } from "@/types/artboard";
import {
  useArtBoardActions,
  useArtBoards,
  useSelectedArtBoard,
} from "@/stores/useArtBoardStore";
import { useContextMenuActions } from "@/stores/useContextMenuStore";
import { Coordinates } from "@/types/component";
import {
  useComponentActions,
  useSelectedComponent,
} from "@/stores/useComponentStore";

const SCALE_AMOUNT = 1.05;

type Props = {
  zoom: number;
  onZoomChange: (zoom: number) => void;
};

const Canvas = (props: Props) => {
  // refs
  const ref = useRef<Konva.Stage>(null);

  // artboards
  const artBoards = useArtBoards();
  const selectedArtBoard = useSelectedArtBoard();
  const { selectArtBoard, removeArtBoard } = useArtBoardActions();

  // components
  const selectedComponent = useSelectedComponent();
  const { selectComponent } = useComponentActions();

  // context menu
  const { setContextMenu } = useContextMenuActions();

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    const emptySpace = e.target === ref.current;
    if (emptySpace) {
      if (selectedArtBoard !== null) {
        selectArtBoard(null);
      }
      if (selectedComponent !== null) {
        selectComponent(null);
      }
    }
  };

  const handleStageMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button === 0) {
      // left click
      setContextMenu(null);
    } else if (e.evt.button === 1) {
      // middle mouse button
    } else if (e.evt.button === 2) {
      // right click
      const stage = ref.current;
      if (!stage) {
        return;
      }

      const pointer = stage.getRelativePointerPosition();
      if (pointer === null) {
        return;
      }

      showContextMenu({ x: pointer.x, y: pointer.y });
    } else {
      e.target.preventDefault();
    }
  };

  const showContextMenu = (coordinates: Coordinates) =>
    setContextMenu({ kind: "canvas", coordinates });

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

    props.onZoomChange(scale * 100);
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!selectedArtBoard) {
      return;
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      removeArtBoard(selectedArtBoard);
    }
    // TODO: move artboard with arrow keys
  };

  return (
    <div onKeyDown={handleOnKeyDown} tabIndex={1}>
      <Stage
        draggable
        ref={ref}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleStageClick}
        onMouseDown={handleStageMouseDown}
        onWheel={handleStageScroll}
        scaleX={props.zoom / 100}
        scaleY={props.zoom / 100}
      >
        {artBoards.map((artBoard: ArtBoard) => (
          <ArtBoardComponent key={artBoard.id} artBoard={artBoard} />
        ))}
      </Stage>
    </div>
  );
};

export default Canvas;
