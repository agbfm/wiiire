import { Affix, Menu, rem } from "@mantine/core";
import {
  IconRepeat,
  IconSettings,
  IconNewSection,
  IconTrash,
} from "@tabler/icons-react";
import { IArtBoard } from "./objects/ArtBoard";

export type Coordinates = { x: number | null; y: number | null };

type Props = {
  coordinates: Coordinates | null;
  selectedArtBoard: IArtBoard | null;
  visible: boolean;
  onDeleteArtBoard: (artboard: IArtBoard) => void;
  onDuplicateArtBoard: (artboard: IArtBoard) => void;
  onNewArtBoard: () => void;
  onToggle: (visible: boolean) => void;
};

const ContextMenu = (props: Props) => {
  const handleOnDeleteArtBoard = () => {
    if (props.selectedArtBoard) {
      props.onDeleteArtBoard(props.selectedArtBoard);
    }
  };

  const handleOnDuplicateArtBoard = () => {
    if (props.selectedArtBoard) {
      props.onDuplicateArtBoard(props.selectedArtBoard);
    }
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

          {props.selectedArtBoard && (
            <>
              <Menu.Label>Selected Art Board</Menu.Label>
              <Menu.Item
                icon={<IconSettings size={20} />}
                onClick={handleOnDuplicateArtBoard}
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
