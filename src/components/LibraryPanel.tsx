import {
  Affix,
  Card,
  CloseButton,
  Divider,
  Flex,
  rem,
  Title,
} from "@mantine/core";

type Props = {
  visible: boolean;
  onToggle: (value: boolean) => void;
};

const LibraryPanel = (props: Props) => {
  if (!props.visible) {
    return null;
  }

  return (
    <Affix position={{ top: rem(16), bottom: rem(16), right: rem(16) }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" w="240px">
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
    </Affix>
  );
};

export default LibraryPanel;
