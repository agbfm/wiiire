import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IComponent } from "@/types/component";

export interface ComponentState {
  components: IComponent[];
  selectedComponent: IComponent | null;

  addComponent: (component: IComponent) => void;
  removeComponent: (component: IComponent) => void;
  selectComponent: (component: IComponent | null) => void;
}

const INITIAL_STATE = {
  components: [],
  selectedComponent: null,
};

const useComponentStore = create<ComponentState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,

        addComponent: (component: IComponent) =>
          set(({ components }) => ({
            components: [...components, component],
          })),

        removeComponent: (component: IComponent) =>
          set(({ components, selectedComponent }) => ({
            components: components.filter(
              (c: IComponent) => c.id !== component.id
            ),
            selectedComponent:
              selectedComponent !== null &&
              selectedComponent.id === component.id
                ? null
                : selectedComponent,
          })),

        selectComponent: (component: IComponent | null) =>
          set(() => ({
            selectedComponent: component,
          })),
      }),
      {
        name: "component-store",
      }
    )
  )
);

export const useComponents = (): IComponent[] =>
  useComponentStore((state: ComponentState) => state.components);

export const useSelectedComponent = (): IComponent | null =>
  useComponentStore((state: ComponentState) => state.selectedComponent);

export const useComponentActions = () =>
  useComponentStore((state: ComponentState) => ({
    addComponent: state.addComponent,
    removeComponent: state.removeComponent,
    selectComponent: state.selectComponent,
  }));
