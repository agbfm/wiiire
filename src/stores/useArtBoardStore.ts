import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ArtBoard } from "@/types/artboard";
import { duplicateArtBoard } from "@/utils/artboards";

export interface ArtBoardState {
  artBoards: ArtBoard[];
  selectedArtBoard: ArtBoard | null;

  addArtBoard: (artBoard: ArtBoard) => void;
  duplicateArtBoard: (artBoard: ArtBoard) => void;
  removeArtBoard: (artBoard: ArtBoard) => void;
  removeAllArtBoards: () => void;
  selectArtBoard: (artBoard: ArtBoard | null) => void;
  updateArtBoard: (artBoard: ArtBoard) => void;
}

const INITIAL_STATE = {
  artBoards: [],
  selectedArtBoard: null,
};

const useArtBoardStore = create<ArtBoardState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,

        addArtBoard: (artBoard: ArtBoard) =>
          set((state: ArtBoardState) => ({
            artBoards: [...state.artBoards, artBoard],
          })),

        duplicateArtBoard: (artBoard: ArtBoard) =>
          set(({ artBoards }: ArtBoardState) => {
            const duplicate = duplicateArtBoard(artBoard);
            return {
              artBoards: [...artBoards, duplicate],
              selectedArtBoard: duplicate,
            };
          }),

        removeArtBoard: (artBoard: ArtBoard) =>
          set(({ artBoards, selectedArtBoard }: ArtBoardState) => ({
            artBoards: artBoards.filter(
              (ab: ArtBoard) => ab.id !== artBoard.id
            ),
            selectedArtBoard:
              selectedArtBoard !== null && selectedArtBoard.id === artBoard.id
                ? null
                : selectedArtBoard,
          })),

        removeAllArtBoards: () =>
          set(() => ({
            ...INITIAL_STATE,
          })),

        selectArtBoard: (artBoard: ArtBoard | null) =>
          set(() => ({ selectedArtBoard: artBoard })),

        updateArtBoard: (artBoard: ArtBoard) =>
          set(({ artBoards, selectedArtBoard }: ArtBoardState) => ({
            artBoards: artBoards.map((a: ArtBoard) =>
              a.id === artBoard.id ? artBoard : a
            ),
            selectedArtBoard:
              selectedArtBoard === null || selectedArtBoard.id !== artBoard.id
                ? selectedArtBoard
                : artBoard,
          })),
      }),
      {
        name: "artboard-store",
      }
    )
  )
);

export const useArtBoards = (): ArtBoard[] =>
  useArtBoardStore((state: ArtBoardState) => state.artBoards);

export const useSelectedArtBoard = (): ArtBoard | null =>
  useArtBoardStore((state: ArtBoardState) => state.selectedArtBoard);

export const useArtBoardActions = () =>
  useArtBoardStore((state: ArtBoardState) => ({
    addArtBoard: state.addArtBoard,
    duplicateArtBoard: state.duplicateArtBoard,
    removeArtBoard: state.removeArtBoard,
    removeAllArtBoards: state.removeAllArtBoards,
    selectArtBoard: state.selectArtBoard,
    updateArtBoard: state.updateArtBoard,
  }));
