import { MouseEvent, useState } from "react";
import MenuPanel from "./../components/MenuPanel";
import Canvas from "./../components/Canvas";
import { Coordinates } from "./../types/coordinates";
import ContextMenu from "./../components/ContextMenu";
import NewArtBoardModal from "./../components/NewArtBoardModal";
import LibraryPanel from "./../components/LibraryPanel";

const WiiireApp = () => {
  const [showMenu, toggleMenu] = useState(true);
  const [showLibrary, toggleLibrary] = useState(true);
  const [contextMenuCoords, toggleContextMenu] = useState<Coordinates | null>(
    null
  );
  const [zoom, setZoom] = useState(100);
  const [showNewArtBoardModal, toggleNewArtBoardModal] = useState(false);

  const handleCloseModal = () => toggleNewArtBoardModal(false);

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
        zoom={zoom}
        onToggleContextMenu={(coordinates: Coordinates | null) =>
          toggleContextMenu(coordinates)
        }
        onZoomChange={handleZoomChange}
      />
      <MenuPanel
        visible={showMenu}
        zoom={zoom}
        onNewArtBoard={() => toggleNewArtBoardModal(true)}
        onToggle={toggleMenu}
        onZoomChange={handleZoomChange}
      />
      <LibraryPanel visible={showLibrary} onToggle={toggleLibrary} />
      <ContextMenu
        coordinates={contextMenuCoords}
        visible={contextMenuCoords !== null}
        onNewArtBoard={() => toggleNewArtBoardModal(true)}
        onToggle={(visible: boolean) => !visible && toggleContextMenu(null)}
      />
      <NewArtBoardModal
        visible={showNewArtBoardModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};
export default WiiireApp;
