import { create } from 'zustand';
import { Tile } from './types';
import { shuffleTiles, generateTiles } from './game-logic';

interface GameStore {
  board: Tile[];
  playerHand: Tile[];
  cpuHand: Tile[];
  currentPlayer: "player" | "cpu";
  initGame: () => void;
  playTile: (tileId: string, side: "left" | "right") => void;
}

export const useGameStore = create<GameStore>((set) => ({
  board: [],
  playerHand: [],
  cpuHand: [],
  currentPlayer: "player",
  initGame: () => {
    const tiles = shuffleTiles(generateTiles());
    set({
      playerHand: tiles.slice(0, 7),
      cpuHand: tiles.slice(7, 14),
      board: [],
      currentPlayer: "player",
    });
  },
  playTile: (tileId, side) => {
    // Lógica para colocar fichas y alternar turnos
  },
}));