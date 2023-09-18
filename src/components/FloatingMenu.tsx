import { useState } from "react";
import {
  ActionIcon,
  Affix,
  Button,
  Card,
  Divider,
  Flex,
  Modal,
  rem,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
  onNewArtBoard: (title: string) => void;
  onToggle: (value: boolean) => void;
  onZoomChange: (value: number) => void;
};

const FloatingMenu = (props: Props) => {
  const [newArtBoardTitle, setNewArtBoardTitle] = useState<string>("");
  const [showInputModal, { open, close }] = useDisclosure(false);

  const toggleInputModal = () => {
    open();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewArtBoardTitle(event.target.value);
  };

  const addNewArtBoard = () => {
    props.onNewArtBoard(newArtBoardTitle);
    close();
    setNewArtBoardTitle("");
  };

  if (!props.visible) {
    return null;
  }

  return (
    <>
      <Modal
        opened={showInputModal}
        onClose={close}
        title="Add a new Art Board"
        centered
      >
        <TextInput
          placeholder="Give your new Art Board a memorable Title"
          label="Title"
          withAsterisk
          value={newArtBoardTitle}
          onChange={handleInputChange}
          mb={rem(10)}
          tabIndex={0}
        />
        <Flex justify="flex-end">
          <Button onClick={addNewArtBoard}>Create</Button>
        </Flex>
      </Modal>
      <Affix position={{ bottom: rem(16), left: rem(16) }}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          h="100%"
          w="300px"
        >
          <Title align="center" size="h1" mb={rem(16)} w="100%">
            wiiire
          </Title>
          <ActionIcon
            color="blue"
            radius="sm"
            size="xl"
            variant="outline"
            onClick={toggleInputModal}
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
    </>
  );
};

export default FloatingMenu;
