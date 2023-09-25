import { Image as KonvaImage, Rect } from "react-konva";
import { Image } from "@/types/image";
import { TransformerGroup } from "./TransformerGroup";
import { useRef } from "react";
import Konva from "konva";
import useImage from "use-image";

type Props = {
  image: Image;
  draggable?: boolean;
  selectable?: boolean;
};

const ImageComponent = ({
  image,
  draggable = true,
  selectable = true,
}: Props) => {
  const ref = useRef<Konva.Image>(null);
  const [img] = useImage("/icons/photo.svg");

  const cornerRadius =
    image.radius === "lg"
      ? 16
      : image.radius === "md"
      ? 12
      : image.radius === "sm"
      ? 8
      : 4;

  return (
    <TransformerGroup
      component={image}
      draggable={draggable}
      selectable={selectable}
    >
      <Rect
        x={0}
        y={0}
        height={image.dimensions.height}
        width={image.dimensions.width}
        fill="#ffffff"
        stroke="#adb5bd"
        strokeWidth={1}
        cornerRadius={cornerRadius}
      />
      {img && (
        <KonvaImage
          x={image.dimensions.width / 8}
          y={image.dimensions.height / 8}
          height={image.dimensions.height * 0.75}
          width={image.dimensions.width * 0.75}
          ref={ref}
          image={img}
        />
      )}
    </TransformerGroup>
  );
};

export { ImageComponent };
