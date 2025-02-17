// src/App.tsx
import { useGameStore } from "./store";
import { Hand } from "./components/Hand";
import { useEffect } from "react";

function App() {
  const { initGame, currentPlayer, cpuPlay } = useGameStore();

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (currentPlayer === "cpu") {
      // Espera 1 segundo antes de que la CPU juegue (simula pensamiento)
      const timer = setTimeout(() => cpuPlay(), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer]);

  return (
    <div className="app">
      <h1>Dominó Básico</h1>
      <Hand />
    </div>
  );
}
export default App;