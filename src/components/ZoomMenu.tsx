import { UnstyledButton, Button, Group, rem } from "@mantine/core";
import { IconZoomIn, IconZoomOut } from "@tabler/icons-react";

type Props = {
  onZoomChange: (value: number) => void;
  value: number;
};

const ZoomMenu = (props: Props) => (
  <Group position="center" w="100%" mt="16px" spacing={0}>
    <UnstyledButton p="md">
      <IconZoomOut
        size={rem(20)}
        onClick={() => props.onZoomChange(props.value * 0.8)}
      />
    </UnstyledButton>
    <Button
      onClick={() => props.onZoomChange(100)}
      radius="xs"
      size="md"
      variant="outline"
      w="100px"
    >
      {props.value}%
    </Button>
    <UnstyledButton
      onClick={() => props.onZoomChange(props.value * 1.2)}
      p="md"
    >
      <IconZoomIn size={rem(20)} />
    </UnstyledButton>
  </Group>
);

export default ZoomMenu;
