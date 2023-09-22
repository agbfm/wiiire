import { IComponent } from "./component";

export interface Card extends IComponent {
  kind: "card";
  radius: "xs" | "sm" | "md" | "lg";
}
