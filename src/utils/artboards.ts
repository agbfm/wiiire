import { v4 as uuid } from "uuid";
import {
  ArtBoard,
  ArtBoardSize,
  getDimensionsForSize,
} from "./../types/artboard";
import { Coordinates } from "../types/coordinates";
import { Button } from "../types/button";

export const createArtBoard = (
  title: string,
  size?: ArtBoardSize,
  coordinates?: Coordinates
): ArtBoard => {
  const artBoardSize = size || ArtBoardSize.MOBILE;
  const dimensions = getDimensionsForSize(artBoardSize);
  const button = demoButton();
  return {
    kind: "artboard",
    id: uuid(),
    title,
    coordinates: coordinates || { x: 50, y: 50 },
    size: artBoardSize,
    height: dimensions.height,
    width: dimensions.width,
    components: [button],
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

const demoButton = (): Button => ({
  kind: "button",
  id: uuid(),
  label: "Button",
  coordinates: { x: 32, y: 64 },
  height: 32,
  width: 128,
});
