import { Affix, Menu, rem } from "@mantine/core";
import {
  IconRepeat,
  IconSettings,
  IconNewSection,
  IconTrash,
} from "@tabler/icons-react";
import {
  useArtBoardActions,
  useSelectedArtBoard,
} from "@/stores/useArtBoardStore";
import { ContextMenuConfig } from "@/types/context-menu";
import { useContextMenuActions } from "@/stores/useContextMenuStore";
import { useComponentActions } from "@/stores/useComponentStore";

type Props = {
  config: ContextMenuConfig;
  visible: boolean;
  onNewArtBoard: () => void;
};

const ContextMenu = ({ config, visible, onNewArtBoard }: Props) => {
  // artboards
  const selectedArtBoard = useSelectedArtBoard();
  const { duplicateArtBoard, removeArtBoard, removeAllArtBoards } =
    useArtBoardActions();

  //components
  const { removeComponent } = useComponentActions();

  // context menu
  const { setContextMenu } = useContextMenuActions();

  const handleOnDeleteArtBoard = () => {
    if (selectedArtBoard === null) {
      return;
    }

    selectedArtBoard.components.forEach((c) => removeComponent(c));
    removeArtBoard(selectedArtBoard);
  };

  const handleOnDuplicateArtBoard = () => {
    if (selectedArtBoard === null) {
      return;
    }

    duplicateArtBoard(selectedArtBoard);
  };

  const handleOnResetCanvas = () => removeAllArtBoards();

  if (config.coordinates === null) {
    return null;
  }

  const { x, y } = config.coordinates;
  return (
    <Affix position={{ top: rem(y), left: rem(x) }}>
      <Menu
        shadow="md"
        width={200}
        opened={visible}
        onClose={() => setContextMenu(null)}
      >
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconNewSection size={20} />}
            onClick={onNewArtBoard}
          >
            New Art Board
          </Menu.Item>

          <Menu.Divider />

          {selectedArtBoard && (
            <>
              <Menu.Label>Selected Art Board</Menu.Label>
              <Menu.Item
                icon={<IconSettings size={20} />}
                onClick={() => handleOnDuplicateArtBoard()}
              >
                Duplicate
              </Menu.Item>
              <Menu.Item
                color="red"
                icon={<IconTrash size={20} />}
                onClick={handleOnDeleteArtBoard}
              >
                Delete
              </Menu.Item>
              <Menu.Divider />
            </>
          )}

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            icon={<IconRepeat size={20} />}
            onClick={() => handleOnResetCanvas()}
          >
            Reset canvas
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Affix>
  );
};

export default ContextMenu;
