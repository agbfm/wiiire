import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IComponent } from "@/types/component";

export interface ComponentState {
  selectedComponent: IComponent | null;

  selectComponent: (selectedComponent: IComponent | null) => void;
}

const INITIAL_STATE = {
  selectedComponent: null,
};

const useComponentStore = create<ComponentState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,

        selectComponent: (selectedComponent: IComponent | null) =>
          set(() => ({
            selectedComponent,
          })),
      }),
      {
        name: "component-store",
      }
    )
  )
);

export const useSelectedComponent = (): IComponent | null =>
  useComponentStore((state: ComponentState) => state.selectedComponent);

export const useComponentActions = () =>
  useComponentStore((state: ComponentState) => ({
    selectComponent: state.selectComponent,
  }));
