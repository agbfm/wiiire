import { useState } from "react";
import FloatingMenu from "./../components/FloatingMenu";
import Canvas from "./../components/Canvas";
import { ArtBoardSize, IArtBoard } from "../components/objects/ArtBoard";
import { v4 as uuid } from "uuid";

const WiiireApp = () => {
  const [showMenu, toggleMenu] = useState(true);
  const [artBoards, setArtBoards] = useState<IArtBoard[]>([]);
  const [selectedArtBoard, setSelectedArtBoard] = useState<IArtBoard | null>(
    null
  );

  const handleNewArtBoard = (title: string) => {
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

  return (
    <div
      style={{
        backgroundColor: "#e9ecef",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas
        artboards={artBoards}
        selectedArtBoard={selectedArtBoard}
        onArtBoardSelect={handleArtBoardSelect}
      />
      <FloatingMenu
        selectedArtBoard={selectedArtBoard}
        visible={showMenu}
        onArtBoardSizeChange={handleArtBoardSizeChange}
        onArtBoardTitleChange={handleArtBoardTitleChange}
        onNewArtBoard={handleNewArtBoard}
        onToggle={(visible: boolean) => toggleMenu(visible)}
      />
    </div>
  );
};
export default WiiireApp;
