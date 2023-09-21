import { Coordinates } from "./coordinates";

export interface IComponent {
  kind: string;
  id: string;
  coordinates: Coordinates;
  height: number;
  width: number;
}
