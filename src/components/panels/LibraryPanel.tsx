import {
  Affix,
  Card,
  CloseButton,
  Divider,
  Flex,
  rem,
  Title,
  Transition,
} from "@mantine/core";
import { Layer, Stage } from "react-konva";
import { ButtonComponent } from "../components/button/ButtonComponent";
import { demoButton, demoCard, demoImage, demoLabel } from "@/utils/faker";
import { useMemo } from "react";
import { LabelComponent } from "../components/LabelComponent";
import { LibraryPlaceholder } from "../components/LibraryPlaceholder";
import { CardComponent } from "../components/CardComponent";
import { ImageComponent } from "../components/ImageComponent";

type Props = {
  visible: boolean;
  onToggle: (value: boolean) => void;
};

const LibraryPanel = (props: Props) => {
  const libraryDemoLabel = useMemo(
    () => demoLabel("Label", { x: 70, y: 55 }),
    []
  );
  const libraryDemoButton = useMemo(() => demoButton({ x: 30, y: 48 }), []);
  const libraryDemoCard = useMemo(
    () => demoCard({ x: 24, y: 24 }, { height: 80, width: 140 }),
    []
  );
  const libraryDemoCardLabel = useMemo(
    () => demoLabel("Card", { x: 34, y: 34 }),
    []
  );
  const libraryDemoImage = useMemo(
    () => demoImage({ x: 54, y: 24 }, { height: 80, width: 80 }),
    []
  );

  return (
    <Affix position={{ top: rem(16), bottom: rem(16), right: rem(16) }}>
      <Transition
        mounted={props.visible}
        transition="slide-left"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            h="100%"
            w="240px"
            style={styles}
          >
            <Flex direction="row" align="center" justify="space-between">
              <Title size="h2" w="100%">
                Library
              </Title>
              <CloseButton
                aria-label="Close Library Panel"
                onClick={() => props.onToggle(false)}
              />
            </Flex>
            <Flex
              my={rem(16)}
              gap="sm"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Divider label="Essentials" labelPosition="center" w="100%" />
              <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                scaleX={0.5}
                scaleY={0.5}
              >
                <Layer>
                  <LibraryPlaceholder
                    coordinates={{ x: 4, y: 4 }}
                    dimensions={{ height: 120, width: 180 }}
                    onClick={() => console.log("label placeholder clicked")}
                  >
                    <LabelComponent
                      label={libraryDemoLabel}
                      draggable={false}
                      selectable={false}
                    />
                  </LibraryPlaceholder>
                  <LibraryPlaceholder
                    coordinates={{ x: 214, y: 4 }}
                    dimensions={{ height: 120, width: 180 }}
                    onClick={() => console.log("button placeholder clicked")}
                  >
                    <ButtonComponent
                      button={libraryDemoButton}
                      draggable={false}
                      selectable={false}
                    />
                  </LibraryPlaceholder>
                  <LibraryPlaceholder
                    coordinates={{ x: 4, y: 144 }}
                    dimensions={{ height: 120, width: 180 }}
                    onClick={() => console.log("card placeholder clicked")}
                  >
                    <CardComponent
                      card={libraryDemoCard}
                      draggable={false}
                      selectable={false}
                    />
                    <LabelComponent
                      label={libraryDemoCardLabel}
                      draggable={false}
                      selectable={false}
                    />
                  </LibraryPlaceholder>
                  <LibraryPlaceholder
                    coordinates={{ x: 214, y: 144 }}
                    dimensions={{ height: 120, width: 180 }}
                    onClick={() => console.log("image placeholder clicked")}
                  >
                    <ImageComponent
                      image={libraryDemoImage}
                      draggable={false}
                      selectable={false}
                    />
                  </LibraryPlaceholder>
                </Layer>
              </Stage>
            </Flex>
          </Card>
        )}
      </Transition>
    </Affix>
  );
};

export default LibraryPanel;
