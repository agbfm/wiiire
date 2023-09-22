import {
  ActionIcon,
  Affix,
  Card,
  Divider,
  Flex,
  rem,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconApps, IconDeviceDesktopPlus } from "@tabler/icons-react";
import ZoomMenu from "./ZoomMenu";
import ArtBoardSizeMenu from "./ArtBoardSizeMenu";
import ArtBoardTitleField from "./ArtBoardTitleField";
import { useSelectedArtBoard } from "./../stores/useArtBoardStore";

type Props = {
  visible: boolean;
  zoom: number;
  onNewArtBoard: () => void;
  onToggle: (value: boolean) => void;
  onToggleLibrary: () => void;
  onToggleMenu?: () => void;
  onZoomChange: (value: number) => void;
};

const MenuPanel = (props: Props) => {
  const selectedArtBoard = useSelectedArtBoard();

  if (!props.visible) {
    return null;
  }

  return (
    <Affix position={{ bottom: rem(16), left: rem(16) }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" w="300px">
        <Flex dir="row" align="center" justify="center">
          <Title align="center" size="h1">
            wiiire
          </Title>
        </Flex>
        <Flex dir="row" gap="xs" wrap="wrap" mt={rem(16)}>
          <Tooltip label="New Art Board">
            <ActionIcon
              color="blue"
              radius="sm"
              size="xl"
              variant="outline"
              onClick={props.onNewArtBoard}
            >
              <IconDeviceDesktopPlus />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Component Library">
            <ActionIcon
              color="blue"
              radius="sm"
              size="xl"
              variant="outline"
              onClick={props.onToggleLibrary}
            >
              <IconApps />
            </ActionIcon>
          </Tooltip>
        </Flex>
        {selectedArtBoard && (
          <Flex
            mt={rem(20)}
            gap="sm"
            justify="flex-start"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <Divider
              label="Art Board Details"
              labelPosition="center"
              w="100%"
            />
            <ArtBoardTitleField artBoard={selectedArtBoard} />
            <ArtBoardSizeMenu artBoard={selectedArtBoard} />
          </Flex>
        )}
        <ZoomMenu
          value={props.zoom}
          onZoomChange={(value: number) => props.onZoomChange(value)}
        />
      </Card>
    </Affix>
  );
};

export default MenuPanel;
