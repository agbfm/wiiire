import { useState } from "react";
import {
  ActionIcon,
  Affix,
  Button,
  Card,
  Flex,
  Modal,
  rem,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceDesktopPlus } from "@tabler/icons-react";
import ZoomMenu from "./ZoomMenu";

type Props = {
  visible: boolean;
  onNewArtBoard: (title: string) => void;
  onToggle: (value: boolean) => void;
};

const FloatingMenu = (props: Props) => {
  const [zoom, setZoom] = useState(100);
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
          w="250px"
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
          <ZoomMenu
            value={zoom}
            onZoomChange={(value: number) => setZoom(Math.ceil(value))}
          />
        </Card>
      </Affix>
    </>
  );
};

export default FloatingMenu;
