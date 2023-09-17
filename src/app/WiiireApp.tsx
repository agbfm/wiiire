import { useState } from "react";
import FloatingMenu from "./../components/FloatingMenu";
import Canvas from "./../components/Canvas";
import { ArtBoardLayer } from "./../components/objects/ArtBoard";
import { v4 as uuid } from "uuid";

const WiiireApp = () => {
  const [showMenu, toggleMenu] = useState(true);
  const [artboards, setArtboards] = useState<ArtBoardLayer[]>([]);

  const handleNewArtBoard = (title: string) => {
    const artboard = {
      id: uuid(),
      title,
    };
    setArtboards([...artboards, artboard]);
  };

  return (
    <div
      style={{
        backgroundColor: "#e9ecef",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas artboards={artboards} />
      <FloatingMenu
        visible={showMenu}
        onNewArtBoard={handleNewArtBoard}
        onToggle={(visible: boolean) => toggleMenu(visible)}
      />
    </div>
  );
};
export default WiiireApp;
