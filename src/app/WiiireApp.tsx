import { MouseEvent, useState } from "react";
import MenuPanel from "@/components/panels/MenuPanel";
import Canvas from "@/components/Canvas";
import ContextMenu from "@/components/ContextMenu";
import NewArtBoardModal from "@/components/modals/NewArtBoardModal";
import LibraryPanel from "@/components/panels/LibraryPanel";
import { useContextMenu } from "@/stores/useContextMenuStore";
import { ButtonContextMenu } from "@/components/components/button/ButtonContextMenu";
import { ButtonContextMenuConfig } from "@/types/button";
import { useSelectedArtBoard } from "@/stores/useArtBoardStore";

const WiiireApp = () => {
  // artboards
  const selectedArtBoard = useSelectedArtBoard();

  // context menu
  const contextMenu = useContextMenu();

  // local state
  const [showMenu, toggleMenu] = useState(true);
  const [showLibrary, toggleLibrary] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [showNewArtBoardModal, toggleNewArtBoardModal] = useState(false);

  if (showLibrary && selectedArtBoard === null) {
    toggleLibrary(false);
  }

  const handleCloseModal = () => toggleNewArtBoardModal(false);

  const handleZoomChange = (value: number) => setZoom(Math.ceil(value));

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    // prevent the right-click menu from appearing
    e.preventDefault();
  };

  let contextMenuComponent = null;
  if (contextMenu !== null) {
    switch (contextMenu.kind) {
      case "canvas":
        contextMenuComponent = (
          <ContextMenu
            config={contextMenu}
            visible={contextMenu?.coordinates !== null}
            onNewArtBoard={() => toggleNewArtBoardModal(true)}
          />
        );
        break;
      case "button":
        contextMenuComponent = (
          <ButtonContextMenu
            config={contextMenu as ButtonContextMenuConfig}
            visible={contextMenu?.coordinates !== null}
          />
        );
        break;
    }
  }

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{
        backgroundColor: "#e9ecef",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas zoom={zoom} onZoomChange={handleZoomChange} />
      <MenuPanel
        visible={showMenu}
        zoom={zoom}
        onNewArtBoard={() => toggleNewArtBoardModal(true)}
        onToggle={toggleMenu}
        onToggleLibrary={() => toggleLibrary(!showLibrary)}
        onZoomChange={handleZoomChange}
      />
      <LibraryPanel visible={showLibrary} onToggle={toggleLibrary} />
      {contextMenu && contextMenuComponent}
      <NewArtBoardModal
        visible={showNewArtBoardModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};
export default WiiireApp;
