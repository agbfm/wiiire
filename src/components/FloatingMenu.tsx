import {
  ActionIcon,
  Affix,
  Card,
  Divider,
  Flex,
  rem,
  Title,
} from "@mantine/core";
import { IconDeviceDesktopPlus } from "@tabler/icons-react";
import ZoomMenu from "./ZoomMenu";
import { ArtBoardSize, IArtBoard } from "./objects/ArtBoard";
import ArtBoardSizeMenu from "./ArtBoardSizeMenu";
import ArtBoardTitleField from "./ArtBoardTitleField";

type Props = {
  selectedArtBoard: IArtBoard | null;
  visible: boolean;
  zoom: number;
  onArtBoardSizeChange: (size: ArtBoardSize) => void;
  onArtBoardTitleChange: (title: string) => void;
  onNewArtBoard: () => void;
  onToggle: (value: boolean) => void;
  onZoomChange: (value: number) => void;
};

const FloatingMenu = (props: Props) => {
  if (!props.visible) {
    return null;
  }

  return (
    <Affix position={{ bottom: rem(16), left: rem(16) }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" w="300px">
        <Title align="center" size="h1" mb={rem(16)} w="100%">
          wiiire
        </Title>
        <ActionIcon
          color="blue"
          radius="sm"
          size="xl"
          variant="outline"
          onClick={props.onNewArtBoard}
        >
          <IconDeviceDesktopPlus />
        </ActionIcon>
        {props.selectedArtBoard && (
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
            <ArtBoardTitleField
              value={props.selectedArtBoard.title}
              onChange={(value: string) => {
                props.onArtBoardTitleChange(value);
              }}
            />
            <ArtBoardSizeMenu
              value={props.selectedArtBoard.size}
              onSizeChange={(size: ArtBoardSize) =>
                props.onArtBoardSizeChange(size)
              }
            />
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

export default FloatingMenu;
