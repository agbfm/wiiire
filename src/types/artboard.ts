import { IComponent } from "./component";

export interface ArtBoard extends IComponent {
  kind: "artboard";
  size: ArtBoardSize;
  title: string;
  components: IComponent[];
}

export const enum ArtBoardSize {
  MOBILE = "mobile",
  TABLET = "tablet",
  DESKTOP = "desktop",
  WIDE = "wide",
}

export const getDimensionsForSize = (size: ArtBoardSize) => {
  switch (size) {
    case ArtBoardSize.MOBILE:
      return { height: 750, width: 375 };
    case ArtBoardSize.TABLET:
      return { height: 900, width: 1280 };
    case ArtBoardSize.WIDE:
      return { height: 1080, width: 1920 };
    case ArtBoardSize.DESKTOP:
    default:
      return { height: 1080, width: 1536 };
  }
};
