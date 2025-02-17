import { create } from 'zustand';
import { Tile } from './types';
import { shuffleTiles, generateTiles, isValidMove } from './game-logic';

interface GameStore {
  board: Tile[];
  playerHand: Tile[];
  cpuHand: Tile[];
  currentPlayer: "player" | "cpu";
  gameOver: boolean;
  initGame: () => void;
  playTile: (tileId: string, side: "left" | "right") => void;
  cpuPlay: () => void;
  checkGameOver: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({ // 👈 Añade `get` aquí
  board: [],
  playerHand: [],
  cpuHand: [],
  currentPlayer: "player",
  gameOver: false,

  initGame: () => {
    const tiles = shuffleTiles(generateTiles());
    set({
      playerHand: tiles.slice(0, 7),
      cpuHand: tiles.slice(7, 14),
      board: [],
      currentPlayer: "player",
      gameOver: false,
    });
  },

  playTile: (tileId, side) => {
    set((state) => {
      if (state.currentPlayer !== "player" || state.gameOver) return state;

      const tileIndex = state.playerHand.findIndex(tile => tile.id === tileId);
      if (tileIndex === -1) return state;

      const tile = state.playerHand[tileIndex];
      if (!isValidMove(state.board, tile, side)) return state;

      const newBoard = [...state.board];
      const newPlayerHand = [...state.playerHand];

      if (side === "left") {
        newBoard.unshift({ ...tile, placed: true });
      } else {
        newBoard.push({ ...tile, placed: true });
      }

      newPlayerHand.splice(tileIndex, 1);

      return {
        board: newBoard,
        playerHand: newPlayerHand,
        currentPlayer: "cpu",
      };
    });
    get().checkGameOver(); // 👈 Accede al estado actual con `get()`
  },

  cpuPlay: () => {
    set((state) => {
      if (state.currentPlayer !== "cpu" || state.gameOver) return state;

      const validMoves = state.cpuHand.filter(tile =>
        isValidMove(state.board, tile, "left") ||
        isValidMove(state.board, tile, "right")
      );

      if (validMoves.length === 0) {
        return { currentPlayer: "player" };
      }

      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      const moveSide = isValidMove(state.board, randomMove, "left") ? "left" : "right";

      const newBoard = [...state.board];
      const newCpuHand = [...state.cpuHand];
      const tileIndex = newCpuHand.findIndex(t => t.id === randomMove.id);

      if (moveSide === "left") {
        newBoard.unshift({ ...randomMove, placed: true });
      } else {
        newBoard.push({ ...randomMove, placed: true });
      }

      newCpuHand.splice(tileIndex, 1);

      return {
        board: newBoard,
        cpuHand: newCpuHand,
        currentPlayer: "player",
      };
    });
    get().checkGameOver(); // 👈 Accede al estado actual con `get()`
  },

  checkGameOver: () => {
    const { playerHand, cpuHand } = get();
    if (playerHand.length === 0 || cpuHand.length === 0) {
      set({ gameOver: true });
    }
  },
}));