import { SegmentedControl } from "@mantine/core";
import { ArtBoardSize } from "./objects/ArtBoard";

type Props = {
  onSizeChange: (size: ArtBoardSize) => void;
  value: ArtBoardSize;
};

const ArtBoardSizeMenu = (props: Props) => {
  return (
    <SegmentedControl
      value={props.value}
      onChange={props.onSizeChange}
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
