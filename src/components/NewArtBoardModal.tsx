import { useRef, useState } from "react";
import { Button, Flex, Modal, rem, TextInput } from "@mantine/core";
import { createArtBoard } from "../utils/artboards";
import { ArtBoard } from "../types/artboard";
import { useArtBoardActions } from "../stores/useArtBoardStore";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const NewArtBoardModal = (props: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const { addArtBoard } = useArtBoardActions();

  const [title, setTitle] = useState<string>("");

  const handleOnLoad = () => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnCreateClick();
    }
  };

  const handleOnCloseClick = () => {
    props.onClose();
    setTimeout(() => setTitle(""), 1000);
  };

  const handleOnCreateClick = () => {
    const artBoard: ArtBoard = createArtBoard(title);
    addArtBoard(artBoard);
    handleOnCloseClick();
  };

  return (
    <Modal
      autoFocus={false}
      opened={props.visible}
      onClose={handleOnCloseClick}
      onTransitionEnd={handleOnLoad}
      title="Add a new Art Board"
      centered
    >
      <TextInput
        autoFocus
        placeholder="Give your new Art Board a memorable Title"
        label="Title"
        withAsterisk
        value={title}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        mb={rem(10)}
        tabIndex={1}
        ref={ref}
      />
      <Flex justify="flex-end">
        <Button onClick={handleOnCreateClick}>Create</Button>
      </Flex>
    </Modal>
  );
};

export default NewArtBoardModal;
