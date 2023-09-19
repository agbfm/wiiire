import { v4 as uuid } from "uuid";
import { ArtBoard, ArtBoardSize } from "./../types/artboard";
import { Coordinates } from "../types/coordinates";

export const createArtBoard = (
  title: string,
  size?: ArtBoardSize,
  coordinates?: Coordinates
): ArtBoard => ({
  id: uuid(),
  title,
  coordinates: coordinates || { x: 50, y: 50 },
  size: size || ArtBoardSize.MOBILE,
});

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
