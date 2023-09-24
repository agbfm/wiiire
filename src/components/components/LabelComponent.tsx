import { Text } from "react-konva";
import { Label } from "@/types/label";
import { TransformerGroup } from "./TransformerGroup";

type Props = {
  label: Label;
};

const LabelComponent = ({ label }: Props) => {
  const fontSize =
    label.size === "h1"
      ? 30
      : label.size === "h2"
      ? 24
      : label.size === "h3"
      ? 20
      : label.size === "h4"
      ? 18
      : label.size === "h5"
      ? 16
      : label.size === "h6"
      ? 14
      : 12;

  return (
    <TransformerGroup component={label}>
      <Text
        x={0}
        y={0}
        height={label.dimensions.height}
        width={label.dimensions.width}
        fill="#495057"
        fontSize={fontSize}
        text={label.text}
      />
    </TransformerGroup>
  );
};

export { LabelComponent };
