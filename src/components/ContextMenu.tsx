import { Affix, Menu, rem } from "@mantine/core";
import {
  IconRepeat,
  IconSettings,
  IconNewSection,
  IconTrash,
} from "@tabler/icons-react";
import { Coordinates } from "./../types/coordinates";
import { ArtBoardState, useArtBoardStore } from "../stores/useArtBoardStore";
import { duplicateArtBoard } from "../utils/artboards";

type Props = {
  coordinates: Coordinates | null;
  visible: boolean;
  onNewArtBoard: () => void;
  onToggle: (visible: boolean) => void;
};

const ContextMenu = (props: Props) => {
  const selectedArtBoard = useArtBoardStore(
    (state: ArtBoardState) => state.selectedArtBoard
  );
  const addArtBoard = useArtBoardStore(
    (state: ArtBoardState) => state.addArtBoard
  );
  const removeArtBoard = useArtBoardStore(
    (state: ArtBoardState) => state.removeArtBoard
  );
  const selectArtBoard = useArtBoardStore(
    (state: ArtBoardState) => state.setSelectedArtBoard
  );

  const handleOnDeleteArtBoard = () => {
    if (selectedArtBoard === null) {
      return;
    }

    removeArtBoard(selectedArtBoard);
  };

  const handleOnDuplicateArtBoard = () => {
    if (selectedArtBoard === null) {
      return;
    }

    const duplicate = duplicateArtBoard(selectedArtBoard);
    selectArtBoard(duplicate);
    addArtBoard(duplicate);
  };

  if (props.coordinates === null) {
    return null;
  }

  const { x, y } = props.coordinates;
  return (
    <Affix position={{ top: rem(y), left: rem(x) }}>
      <Menu
        shadow="md"
        width={200}
        opened={props.visible}
        onChange={props.onToggle}
      >
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconNewSection size={20} />}
            onClick={props.onNewArtBoard}
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
          <Menu.Item color="red" icon={<IconRepeat size={20} />}>
            Reset canvas
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Affix>
  );
};

export default ContextMenu;
