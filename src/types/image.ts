import { IComponent } from "./component";

export interface Image extends IComponent {
  kind: "image";
  radius: "xs" | "sm" | "md" | "lg";
}
