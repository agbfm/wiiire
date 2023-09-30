import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ContextMenuConfig } from "@/types/context-menu";

export interface ContextMenuState {
  contextMenu: ContextMenuConfig | null;

  setContextMenu: (contextMenu: ContextMenuConfig | null) => void;
}

const INITIAL_STATE = {
  contextMenu: null,
};

const useContextMenuStore = create<ContextMenuState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,

        setContextMenu: (contextMenu: ContextMenuConfig | null) =>
          set(() => ({
            contextMenu,
          })),
      }),
      {
        name: "context-menu-store",
      }
    )
  )
);

export const useContextMenu = (): ContextMenuConfig | null =>
  useContextMenuStore((state: ContextMenuState) => state.contextMenu);

export const useContextMenuActions = () =>
  useContextMenuStore((state: ContextMenuState) => ({
    setContextMenu: state.setContextMenu,
  }));
