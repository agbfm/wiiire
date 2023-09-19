import { SegmentedControl } from "@mantine/core";
import { useState } from "react";
import { useArtBoardActions } from "./../stores/useArtBoardStore";
import { ArtBoard, ArtBoardSize } from "./../types/artboard";

type Props = {
  artBoard: ArtBoard;
};

const ArtBoardSizeMenu = (props: Props) => {
  const { updateArtBoard } = useArtBoardActions();

  const [size, setSize] = useState<ArtBoardSize>(props.artBoard.size);

  const handleSizeChange = (value: ArtBoardSize) => {
    setSize(value);
    const updated = {
      ...props.artBoard,
      size: value,
    };
    updateArtBoard(updated);
  };

  return (
    <SegmentedControl
      value={size}
      onChange={handleSizeChange}
      data={[
        { label: "Mobile", value: ArtBoardSize.MOBILE },
        { label: "Tablet", value: ArtBoardSize.TABLET },
        { label: "Desktop", value: ArtBoardSize.DESKTOP },
        { label: "Wide", value: ArtBoardSize.WIDE },
      ]}
      fullWidth
      w="100%"
    />
  );
};

export default ArtBoardSizeMenu;
