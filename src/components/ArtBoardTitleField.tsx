import { TextInput } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { useArtBoardActions } from "./../stores/useArtBoardStore";
import { ArtBoard } from "./../types/artboard";

type Props = {
  artBoard: ArtBoard;
};

const ArtBoardTitleField = (props: Props) => {
  const { updateArtBoard } = useArtBoardActions();

  const [title, setTitle] = useState<string>(props.artBoard.title);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const updated = {
      ...props.artBoard,
      title: e.target.value,
    };
    updateArtBoard(updated);
  };

  return (
    <TextInput
      label="Title"
      value={title}
      onChange={handleTextChange}
      w="100%"
    />
  );
};

export default ArtBoardTitleField;
