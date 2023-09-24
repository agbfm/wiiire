import { Button } from "@/types/button";
import { Card } from "@/types/card";
import { Label } from "@/types/label";
import { IComponent } from "@/types/component";
import { CardComponent } from "./CardComponent";
import { LabelComponent } from "./LabelComponent";
import { ButtonComponent } from "./button/ButtonComponent";

interface Props {
  component: IComponent;
}

const ComponentProvider = ({ component }: Props) => {
  switch (component.kind) {
    case "button":
      return <ButtonComponent button={component as Button} />;
    case "card":
      return <CardComponent card={component as Card} />;
    case "label":
      return <LabelComponent label={component as Label} />;
  }

  return null;
};

export { ComponentProvider };
