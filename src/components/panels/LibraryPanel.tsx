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
import { IComponent } from "@/types/component";
import { useComponentActions } from "@/stores/useComponentStore";
import {
  useArtBoardActions,
  useSelectedArtBoard,
} from "@/stores/useArtBoardStore";

type Props = {
  visible: boolean;
  onToggle: (value: boolean) => void;
};

const LibraryPanel = ({ visible, onToggle }: Props) => {
  // artboards
  const selectedArtBoard = useSelectedArtBoard();
  const { updateArtBoard } = useArtBoardActions();

  //components
  const { addComponent } = useComponentActions();

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

  const handleComponentClick = (c: IComponent) => {
    if (selectedArtBoard === null) {
      return;
    }

    const x = (selectedArtBoard.dimensions.width - c.dimensions.width) / 2;
    const y = (selectedArtBoard.dimensions.height - c.dimensions.height) / 2;
    const component: IComponent = {
      ...c,
      coordinates: { x, y },
    };
    addComponent(component);
    selectedArtBoard.components.push(component);
    updateArtBoard(selectedArtBoard);
  };

  return (
    <Affix position={{ top: rem(16), bottom: rem(16), right: rem(16) }}>
      <Transition
        mounted={visible}
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
                onClick={() => onToggle(false)}
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
                    onClick={() => handleComponentClick(libraryDemoCardLabel)}
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
                    onClick={() => handleComponentClick(libraryDemoButton)}
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
                    onClick={() => handleComponentClick(libraryDemoCard)}
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
                    onClick={() => handleComponentClick(libraryDemoImage)}
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
