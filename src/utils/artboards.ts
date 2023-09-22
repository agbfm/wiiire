import { v4 as uuid } from "uuid";
import {
  ArtBoard,
  ArtBoardSize,
  getDimensionsForSize,
} from "./../types/artboard";
import { Coordinates } from "../types/coordinates";
import { Button } from "../types/button";
import { Card } from "../types/card";

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
    height: dimensions.height,
    width: dimensions.width,
    components: [demoCard(), demoButton()],
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
  coordinates: { x: 37, y: 84 },
  height: 32,
  width: 128,
  label: "Button",
});

const demoCard = (): Card => ({
  kind: "card",
  id: uuid(),
  coordinates: { x: 21, y: 36 },
  height: 128,
  width: 343,
  radius: "md",
});
