import { Rect } from "react-konva";
import { Card } from "@/types/card";
import { TransformerGroup } from "./TransformerGroup";

type Props = {
  card: Card;
  draggable?: boolean;
  selectable?: boolean;
};

const CardComponent = ({
  card,
  draggable = true,
  selectable = true,
}: Props) => {
  const cornerRadius =
    card.radius === "lg"
      ? 16
      : card.radius === "md"
      ? 12
      : card.radius === "sm"
      ? 8
      : 4;

  return (
    <TransformerGroup
      component={card}
      draggable={draggable}
      selectable={selectable}
    >
      <Rect
        x={0}
        y={0}
        height={card.dimensions.height}
        width={card.dimensions.width}
        fill="#ffffff"
        stroke="#adb5bd"
        strokeWidth={1}
        cornerRadius={cornerRadius}
      />
    </TransformerGroup>
  );
};

export { CardComponent };
