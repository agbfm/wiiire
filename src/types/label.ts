import { IComponent } from "./component";

export interface Label extends IComponent {
  kind: "label";
  text: string;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}
