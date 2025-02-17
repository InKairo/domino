// src/components/Hand.tsx
import { useState } from "react";
import { useGameStore } from "../store";

export const Hand = () => {
    const { playerHand, playTile, currentPlayer } = useGameStore();

    const handleClick = (tileId: string) => {
        if (currentPlayer === "player") {
            // Lógica temporal: intentar colocar en el extremo derecho
            playTile(tileId, "right");
        }
    };

    return (
        <div className="hand-container">
            {playerHand.map((tile) => (
                <button
                    key={tile.id}
                    onClick={() => handleClick(tile.id)}
                    className={`tile ${!tile.placed ? "active" : "used"}`}
                >
                    <span>{tile.left}</span>
                    <span className="vl"></span>
                    <span>{tile.right}</span>
                </button>
            ))}
        </div>
    );
};