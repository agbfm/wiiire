import { useState } from "react";
import { Button, Flex, Modal, rem, TextInput } from "@mantine/core";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (title: string) => void;
};

const NewArtBoardModal = (props: Props) => {
  const [title, setTitle] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleOnCreateClick = () => {
    props.onCreate(title);
    setTitle("");
  };

  return (
    <Modal
      opened={props.visible}
      onClose={close}
      title="Add a new Art Board"
      centered
    >
      <TextInput
        placeholder="Give your new Art Board a memorable Title"
        label="Title"
        withAsterisk
        value={title}
        onChange={handleInputChange}
        mb={rem(10)}
        tabIndex={0}
      />
      <Flex justify="flex-end">
        <Button onClick={handleOnCreateClick}>Create</Button>
      </Flex>
    </Modal>
  );
};

export default NewArtBoardModal;
