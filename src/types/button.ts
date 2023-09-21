import { IComponent } from "./component";

export interface Button extends IComponent {
  kind: "button";
  label: string;
}
