import { Coordinates } from "./component";

export interface ContextMenuConfig {
  kind: string;
  coordinates: Coordinates;
  id?: string;
}

export interface CanvasContextMenuConfig {
  kind: "canvas";
}
