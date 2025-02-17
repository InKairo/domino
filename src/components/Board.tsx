// src/components/Board.tsx
import { motion } from "framer-motion";
import { useGameStore } from "../store";

export const Board = () => {
    const board = useGameStore((state) => state.board);

    return (
        <div className="board-container my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
            {board.length === 0 ? (
                <div className="text-gray-400 italic">Coloca la primera ficha!</div>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                    {board.map((tile, index) => (
                        <motion.div
                            key={tile.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="tile-board"
                        >
                            <span>{tile.left}</span>
                            <div className="vl"></div>
                            <span>{tile.right}</span>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};