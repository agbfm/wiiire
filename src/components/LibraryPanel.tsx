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

type Props = {
  visible: boolean;
  onToggle: (value: boolean) => void;
};

const LibraryPanel = (props: Props) => {
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
            <Flex direction="row" justify="space-between">
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
            </Flex>
          </Card>
        )}
      </Transition>
    </Affix>
  );
};

export default LibraryPanel;
