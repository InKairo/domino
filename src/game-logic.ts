// src/game-logic.ts
import { Tile } from "./types"; // 👈 Importa el tipo

export const generateTiles = (): Tile[] => {
  const tiles: Tile[] = [];
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      tiles.push({ id: `${i}-${j}`, left: i, right: j, placed: false });
    }
  }
  return tiles;
};

export const shuffleTiles = (tiles: Tile[]): Tile[] => {
  return [...tiles].sort(() => Math.random() - 0.5);
};

export const isValidMove = (
  board: Tile[],
  tile: Tile,
  side: "left" | "right"
): boolean => {
  if (board.length === 0) return true;
  const edgeValue = board[side === "left" ? 0 : board.length - 1][
    side === "left" ? "left" : "right"
  ];
  return tile.left === edgeValue || tile.right === edgeValue;
};