import { useRef, useState } from "react";
import { Button, Flex, Modal, rem, TextInput } from "@mantine/core";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (title: string) => void;
};

const NewArtBoardModal = (props: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");

  const handleOnLoad = () => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleOnCloseClick = () => {
    props.onCancel();
    setTitle("");
  };

  const handleOnCreateClick = () => {
    props.onCreate(title);
    setTitle("");
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
