export interface IComponent {
  kind: string;
  id: string;
  coordinates: Coordinates;
  dimensions: Dimensions;
}

export type Coordinates = { x: number; y: number };
export type Dimensions = { height: number; width: number };
