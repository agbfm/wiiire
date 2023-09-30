import { Rect, Text } from "react-konva";
import { Button } from "@/types/button";
import { TransformerGroup } from "./../TransformerGroup";
import { fonts } from "@/config/constants";

type Props = {
  button: Button;
  draggable?: boolean;
  selectable?: boolean;
};

const PADDING_HORIZONTAL = 16;
const PADDING_VERTICAL = 10;

const ButtonComponent = ({
  button,
  draggable = true,
  selectable = true,
}: Props) => (
  <TransformerGroup
    component={button}
    draggable={draggable}
    selectable={selectable}
  >
    <Rect
      x={0}
      y={0}
      height={button.dimensions.height}
      width={button.dimensions.width}
      fill="#dee2e6"
      cornerRadius={8}
    />
    <Text
      text={button.text}
      x={PADDING_HORIZONTAL}
      y={PADDING_VERTICAL}
      fontFamily={fonts.canvas.family}
      fontSize={fonts.canvas.size}
      align="center"
      width={button.dimensions.width - PADDING_HORIZONTAL * 2}
      fill="#212529"
    />
  </TransformerGroup>
);

export { ButtonComponent };
