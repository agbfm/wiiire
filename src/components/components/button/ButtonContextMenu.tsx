import { Affix, Menu, Text, rem } from "@mantine/core";
import {
  IconTrash,
  IconArrowNarrowLeft,
  IconArrowBarToLeft,
  IconArrowNarrowRight,
  IconArrowBarToRight,
} from "@tabler/icons-react";
import { ButtonContextMenuConfig } from "@/types/button";
import { useContextMenuActions } from "@/stores/useContextMenuStore";

type Props = {
  config: ButtonContextMenuConfig;
  visible: boolean;
};

const ICON_SIZE = 16;

const ButtonContextMenu = ({ config, visible }: Props) => {
  const { setContextMenu } = useContextMenuActions();

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
          <Menu.Item icon={<IconArrowNarrowLeft size={ICON_SIZE} />}>
            Send backward
          </Menu.Item>
          <Menu.Item icon={<IconArrowBarToLeft size={ICON_SIZE} />}>
            Send to back
          </Menu.Item>
          <Menu.Item icon={<IconArrowNarrowRight size={ICON_SIZE} />}>
            Bring forward
          </Menu.Item>
          <Menu.Item icon={<IconArrowBarToRight size={ICON_SIZE} />}>
            Bring to front
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="red"
            icon={<IconTrash size={ICON_SIZE} />}
            rightSection={
              <Text size="xs" c="dimmed" span>
                Delete
              </Text>
            }
          >
            <Text size="sm" span>
              Delete
            </Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Affix>
  );
};

export { ButtonContextMenu };
