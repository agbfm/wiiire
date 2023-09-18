import { Affix, Menu, rem } from "@mantine/core";
import { IconSettings, IconNewSection, IconTrash } from "@tabler/icons-react";

export type Coordinates = { x: number | null; y: number | null };

type Props = {
  coordinates: Coordinates | null;
  visible: boolean;
  onNewArtBoard: () => void;
  onToggle: (visible: boolean) => void;
};

const ContextMenu = (props: Props) => {
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
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            icon={<IconNewSection size={20} />}
            onClick={props.onNewArtBoard}
          >
            New Art Board
          </Menu.Item>
          <Menu.Item icon={<IconSettings size={20} />}>Settings</Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item color="red" icon={<IconTrash size={20} />}>
            Reset canvas
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Affix>
  );
};

export default ContextMenu;
