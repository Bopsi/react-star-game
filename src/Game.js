import { useState } from "react";
import StarGame from "./StarGame";

const Game = () => {
  const [gameId, setGameId] = useState(1);
  return <StarGame key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default Game;
