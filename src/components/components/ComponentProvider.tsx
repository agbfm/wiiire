import { Button } from "@/types/button";
import { Card } from "@/types/card";
import { IComponent } from "@/types/component";
import { Image } from "@/types/image";
import { Label } from "@/types/label";
import { CardComponent } from "./CardComponent";
import { LabelComponent } from "./LabelComponent";
import { ButtonComponent } from "./button/ButtonComponent";
import { ImageComponent } from "./ImageComponent";

interface Props {
  component: IComponent;
}

const ComponentProvider = ({ component }: Props) => {
  switch (component.kind) {
    case "button":
      return <ButtonComponent button={component as Button} />;
    case "card":
      return <CardComponent card={component as Card} />;
    case "image":
      return <ImageComponent image={component as Image} />;
    case "label":
      return <LabelComponent label={component as Label} />;
  }

  return null;
};

export { ComponentProvider };
