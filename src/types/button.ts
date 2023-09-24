import { IComponent } from "./component";
import { ContextMenuConfig } from "./context-menu";

export interface Button extends IComponent {
  kind: "button";
  text: string;
}

export interface ButtonContextMenuConfig extends ContextMenuConfig {
  kind: "button";
}
