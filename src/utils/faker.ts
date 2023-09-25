import { v4 as uuid } from "uuid";
import { Button } from "@/types/button";
import { Card } from "@/types/card";
import { Coordinates, Dimensions } from "@/types/component";
import { Label } from "@/types/label";
import { Image } from "@/types/image";

export const demoButton = (coordinates?: Coordinates): Button => ({
  kind: "button",
  id: uuid(),
  coordinates: coordinates || { x: 37, y: 84 },
  text: "Button",
  dimensions: {
    height: 32,
    width: 128,
  },
});

export const demoCard = (
  coordinates?: Coordinates,
  dimensions?: Dimensions
): Card => ({
  kind: "card",
  id: uuid(),
  coordinates: coordinates || { x: 21, y: 36 },
  radius: "lg",
  dimensions: dimensions || {
    height: 128,
    width: 343,
  },
});

export const demoLabel = (text: string, coordinates?: Coordinates): Label => ({
  kind: "label",
  id: uuid(),
  coordinates: coordinates || { x: 37, y: 52 },
  text,
  size: "h3",
  dimensions: {
    height: 20,
    width: 300,
  },
});

export const demoImage = (
  coordinates?: Coordinates,
  dimensions?: Dimensions
): Image => ({
  kind: "image",
  id: uuid(),
  coordinates: coordinates || { x: 21, y: 36 },
  radius: "xs",
  dimensions: dimensions || {
    height: 128,
    width: 343,
  },
});
