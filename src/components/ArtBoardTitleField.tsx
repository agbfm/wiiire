import { TextInput } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { ArtBoardState, useArtBoardStore } from "../stores/useArtBoardStore";
import { ArtBoard } from "../types/artboard";

type Props = {
  artBoard: ArtBoard;
};

const ArtBoardTitleField = (props: Props) => {
  const updateArtBoard = useArtBoardStore(
    (state: ArtBoardState) => state.updateArtBoard
  );

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
