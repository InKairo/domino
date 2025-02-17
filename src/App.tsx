// src/App.tsx
import { useGameStore } from "./store";
import { Hand } from "./components/Hand";
import { useEffect } from "react";
import { Board } from "./components/Board";

function App() {
  const { initGame, currentPlayer, cpuPlay, gameOver } = useGameStore();

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (currentPlayer === "cpu" && !gameOver) {
      const timer = setTimeout(() => cpuPlay(), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameOver]);

  return (
    <div className="app">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Dominó Básico</h1>
      <Board /> {/* 👈 Componente del tablero */}
      <Hand />

      {gameOver && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          ¡Juego terminado! {useGameStore.getState().playerHand.length === 0 ? "¡Ganaste! 🎉" : "La CPU ganó 😢"}
        </div>
      )}
    </div>
  );
}

export default App;