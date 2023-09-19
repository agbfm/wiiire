import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ArtBoard } from "./../types/artboard";

export interface ArtBoardState {
  artBoards: ArtBoard[];
  selectedArtBoard: ArtBoard | null;
  addArtBoard: (artBoard: ArtBoard) => void;
  updateArtBoard: (artBoard: ArtBoard) => void;
  removeArtBoard: (artBoard: ArtBoard) => void;
  setSelectedArtBoard: (artBoard: ArtBoard | null) => void;
}

export const useArtBoardStore = create<ArtBoardState>()(
  devtools(
    persist(
      (set) => ({
        artBoards: [],
        selectedArtBoard: null,

        addArtBoard: (artBoard: ArtBoard) =>
          set((state: ArtBoardState) => ({
            artBoards: [...state.artBoards, artBoard],
          })),

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

        setSelectedArtBoard: (artBoard: ArtBoard | null) =>
          set(() => ({ selectedArtBoard: artBoard })),
      }),
      {
        name: "artboard-store",
      }
    )
  )
);
