export type Tile = {
    id: string;
    left: number;
    right: number;
    placed: boolean;
};

export type GameState = {
    board: Tile[];
    playerHand: Tile[];
    cpuHand: Tile[];
    currentPlayer: "player" | "cpu";
};