import { MouseEvent, useState } from "react";
import FloatingMenu from "./../components/FloatingMenu";
import Canvas from "./../components/Canvas";
import { ArtBoardSize, IArtBoard } from "../components/objects/ArtBoard";
import { v4 as uuid } from "uuid";
import ContextMenu, { Coordinates } from "../components/ContextMenu";
import NewArtBoardModal from "../components/NewArtBoardModal";

const WiiireApp = () => {
  const [showMenu, toggleMenu] = useState(true);
  const [contextMenuCoords, toggleContextMenu] = useState<Coordinates | null>(
    null
  );
  const [zoom, setZoom] = useState(100);
  const [artBoards, setArtBoards] = useState<IArtBoard[]>([]);
  const [selectedArtBoard, setSelectedArtBoard] = useState<IArtBoard | null>(
    null
  );
  const [showNewArtBoardModal, toggleNewArtBoardModal] = useState(false);

  const handleNewArtBoard = (title: string) => {
    toggleNewArtBoardModal(false);
    const artboard: IArtBoard = {
      id: uuid(),
      size: ArtBoardSize.MOBILE,
      title,
    };
    setArtBoards([...artBoards, artboard]);
  };

  const handleArtBoardSelect = (artBoard: IArtBoard | null) =>
    setSelectedArtBoard(artBoard);

  const handleArtBoardSizeChange = (size: ArtBoardSize) => {
    if (!selectedArtBoard) {
      return;
    }

    const artBoard: IArtBoard = {
      ...selectedArtBoard,
      size,
    };
    updateArtBoard(artBoard);
  };

  const handleArtBoardTitleChange = (title: string) => {
    if (!selectedArtBoard) {
      return;
    }

    const artBoard: IArtBoard = {
      ...selectedArtBoard,
      title,
    };
    updateArtBoard(artBoard);
  };

  const updateArtBoard = (artBoard: IArtBoard) => {
    setSelectedArtBoard(artBoard);
    const updatedArtBoards: IArtBoard[] = artBoards.map((a: IArtBoard) =>
      a.id === artBoard.id ? artBoard : a
    );
    setArtBoards(updatedArtBoards);
  };

  const handleZoomChange = (value: number) => setZoom(Math.ceil(value));

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    // prevent the right-click menu from appearing
    e.preventDefault();
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{
        backgroundColor: "#e9ecef",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas
        artboards={artBoards}
        selectedArtBoard={selectedArtBoard}
        zoom={zoom}
        onArtBoardSelect={handleArtBoardSelect}
        onToggleContextMenu={(coordinates: Coordinates | null) =>
          toggleContextMenu(coordinates)
        }
        onZoomChange={handleZoomChange}
      />
      <FloatingMenu
        selectedArtBoard={selectedArtBoard}
        visible={showMenu}
        zoom={zoom}
        onArtBoardSizeChange={handleArtBoardSizeChange}
        onArtBoardTitleChange={handleArtBoardTitleChange}
        onNewArtBoard={() => toggleNewArtBoardModal(true)}
        onToggle={(visible: boolean) => toggleMenu(visible)}
        onZoomChange={handleZoomChange}
      />
      <ContextMenu
        coordinates={contextMenuCoords}
        visible={contextMenuCoords !== null}
        onNewArtBoard={() => toggleNewArtBoardModal(true)}
        onToggle={(visible: boolean) =>
          !visible && toggleContextMenu({ x: null, y: null })
        }
      />
      <NewArtBoardModal
        visible={showNewArtBoardModal}
        onCancel={() => toggleNewArtBoardModal(false)}
        onCreate={handleNewArtBoard}
      />
    </div>
  );
};
export default WiiireApp;
