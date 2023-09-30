import { v4 as uuid } from "uuid";
import { ArtBoard, ArtBoardSize, getDimensionsForSize } from "@/types/artboard";
import { Coordinates } from "@/types/component";
import { demoButton, demoCard, demoLabel } from "./faker";

export const createArtBoard = (
  title: string,
  size?: ArtBoardSize,
  coordinates?: Coordinates
): ArtBoard => {
  const artBoardSize = size || ArtBoardSize.MOBILE;
  const dimensions = getDimensionsForSize(artBoardSize);
  return {
    kind: "artboard",
    id: uuid(),
    title,
    coordinates: coordinates || { x: 50, y: 50 },
    size: artBoardSize,
    dimensions: {
      height: dimensions.height,
      width: dimensions.width,
    },
    components: [demoCard(), demoLabel("Label"), demoButton()],
  };
};

export const duplicateArtBoard = ({
  coordinates,
  size,
  title,
}: ArtBoard): ArtBoard => {
  return createArtBoard(`${title} (copy)`, size, {
    x: coordinates.x !== null ? coordinates.x + 100 : 0,
    y: coordinates.y !== null ? coordinates.y + 50 : 0,
  });
};
