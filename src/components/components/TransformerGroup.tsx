import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { ReactNode, useRef, useState } from "react";
import { Group, Transformer } from "react-konva";
import { Coordinates, IComponent } from "@/types/component";
import {
  useComponentActions,
  useSelectedComponent,
} from "@/stores/useComponentStore";
import {
  useContextMenu,
  useContextMenuActions,
} from "@/stores/useContextMenuStore";
import {
  useArtBoardActions,
  useSelectedArtBoard,
} from "@/stores/useArtBoardStore";

interface Props {
  children: ReactNode;
  component: IComponent;
  draggable?: boolean;
  selectable?: boolean;
}

const TransformerGroup = ({
  children,
  component,
  draggable,
  selectable,
}: Props) => {
  // refs
  const ref = useRef<Konva.Group>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  // artboards
  const selectedArtBoard = useSelectedArtBoard();
  const { selectArtBoard } = useArtBoardActions();

  // context menu
  const contextMenu = useContextMenu();
  const { setContextMenu } = useContextMenuActions();

  // selected component
  const selectedComponent = useSelectedComponent();
  const { selectComponent } = useComponentActions();

  // local state
  const [coords, setCoords] = useState(component.coordinates);
  const [dragging, toggleDragging] = useState(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    if (!selectable) {
      e.evt.preventDefault();
      return;
    }

    if (dragging) {
      return;
    }

    if (
      ref?.current &&
      transformerRef?.current &&
      selectedComponent !== component
    ) {
      if (selectedArtBoard !== null) {
        selectArtBoard(null);
      }
      selectComponent(component);
      transformerRef.current.nodes([ref.current]);
    }

    const { button, x, y } = e.evt;

    if (button === 0) {
      // left click
      toggleContextMenu(null);
    } else if (button === 1) {
      // middle mouse button
    } else if (button === 2) {
      // right click
      const stage = transformerRef.current;
      if (!stage) {
        return;
      }

      toggleContextMenu({ x, y });
    } else {
      e.target.preventDefault();
    }
  };

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    if (!draggable) {
      e.evt.preventDefault();
      return;
    }

    toggleDragging(true);
  };

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    if (!draggable) {
      e.evt.preventDefault();
      return;
    }

    // const desiredCoords = { x: e.target.x(), y: e.target.y() };
    // const finalCoords = onDragMove(
    //   dimensions.height,
    //   dimensions.width,
    //   desiredCoords
    // );
    // if (
    //   finalCoords.x !== desiredCoords.x ||
    //   finalCoords.y !== desiredCoords.y
    // ) {
    //   // setCoords(finalCoords);
    // }
    // automatically calculate snapping based on vert/horz center props
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    if (!draggable) {
      e.evt.preventDefault();
      return;
    }

    const coordinates = { x: e.target.x(), y: e.target.y() };
    setCoords(coordinates);

    toggleDragging(false);
  };

  const toggleContextMenu = (coordinates: Coordinates | null) => {
    if (contextMenu !== null && coordinates === null) {
      setContextMenu(null);
    } else if (contextMenu === null && coordinates !== null) {
      setContextMenu({
        coordinates,
        kind: component.kind,
        id: component.id,
      });
    }
  };

  if (selectedComponent === null || selectedComponent.id !== component.id) {
    transformerRef?.current?.nodes([]);
  }

  return (
    <>
      <Group
        ref={ref}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onMouseDown={handleMouseDown}
        x={coords.x}
        y={coords.y}
      >
        {children}
      </Group>
      <Transformer
        ref={transformerRef}
        onDragStart={(e: KonvaEventObject<DragEvent>) => e.evt.preventDefault()}
        onDragMove={(e: KonvaEventObject<DragEvent>) => e.evt.preventDefault()}
        onDragEnd={(e: KonvaEventObject<DragEvent>) => e.evt.preventDefault()}
        onMouseDown={handleMouseDown}
      />
    </>
  );
};

export { TransformerGroup };
