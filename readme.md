<p align="center">
  <img src="wiiire.gif" />
</p>

# wiiire

We've all been there: standing in the shower daydreaming about your next pet project, with a vague idea of how it might look, but no real desire to put much effort into planning the UI - you'll probably figure it out as you go right? Alternatively, there _are_ plenty of tools that you could use to build a pixel-perfect prototype, or you could even drag some shapes around with your go-to diagramming software to hack together some wireframes, but these are just work arounds at the end of the day. If you find yourself in this state of limbo, then wiiire is probably for you.


## Where to start?

wiiire has been built with self-hosting in mind, and we all enjoy new toys, so spin it up locally with [bun](https://github.com/oven-sh/bun):

```bash
bun install
bun dev
```

## Roadmap

- [x] Basic canvas with [Konva](https://github.com/lavrton/react-konva)
- [x] Art Boards (mobile, tablet, desktop & wide screen)
- [x] Drag, duplicate & delete objects
- [ ] Drag, scroll & zoom the canvas
- [x] Implement state with [Zustand](https://github.com/pmndrs/zustand)
- [ ] Create a small library of UI components (buttons, labels, images & cards etc)
- [ ] Export to JSON file
- [ ] Cypress tests
- [ ] Dockerfile
- [ ] Docker Compose file

## License

The [MIT](https://github.com/agbfm/wiiire/blob/main/LICENSE) license seems to be a safe bet for starters.