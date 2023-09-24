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
  const [coords, setCoords] = useState(component.coordinates);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (!selectable) {
      e.evt.preventDefault();
      return;
    }

    e.cancelBubble = true;

    if (ref?.current && transformerRef?.current) {
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

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    if (!draggable) {
      e.evt.preventDefault();
      return;
    }

    e.cancelBubble = true;
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
    if (!draggable) {
      e.evt.preventDefault();
      return;
    }

    e.cancelBubble = true;

    const coordinates = { x: e.target.x(), y: e.target.y() };
    setCoords(coordinates);

    // onDragEnd();
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
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onMouseDown={handleMouseDown}
        x={coords.x}
        y={coords.y}
      >
        {children}
      </Group>
      <Transformer ref={transformerRef} />
    </>
  );
};

export { TransformerGroup };
