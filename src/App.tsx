// src/App.tsx
import { useGameStore } from "./store";
import { Hand } from "./components/Hand";
import { useEffect } from "react";

function App() {
  const { initGame } = useGameStore();

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className="app">
      <h1>Dominó Básico</h1>
      <Hand />
    </div>
  );
}

export default App;