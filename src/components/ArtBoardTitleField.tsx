import { TextInput } from "@mantine/core";
import { ChangeEvent } from "react";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const ArtBoardTitleField = (props: Props) => {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    props.onChange(e.target.value);
  return (
    <TextInput
      label="Title"
      value={props.value}
      onChange={handleTextChange}
      w="100%"
    />
  );
};

export default ArtBoardTitleField;
