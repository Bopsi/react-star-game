import { useEffect, useState } from "react";
import utils from "./utils";

import StarDisplay from "./StarDisplay";
import PlayNumber from "./PlayNumber";
import PlayAgain from "./PlayAgain";

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availables, setAvailables] = useState(utils.range(1, 9));
  const [candidates, setCandidates] = useState([]);
  const [time, setTime] = useState(10);

  useEffect(() => {
    if (time > 0 && availables.length > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  });

  const setGameState = (newCandidates) => {
    if (utils.sum(newCandidates) !== stars) {
      setCandidates(newCandidates);
    } else {
      const newAvailables = availables.filter(
        (n) => !newCandidates.includes(n)
      );
      setStars(utils.randomSumIn(newAvailables, 9));
      setAvailables(newAvailables);
      setCandidates([]);
    }
  };

  return { stars, availables, candidates, time, setGameState };
};

const StarGame = ({ startNewGame }) => {
  const { stars, availables, candidates, time, setGameState } = useGameState();

  const candidatesAreWrong = utils.sum(candidates) > stars;

  const gameStatus =
    availables.length === 0 ? "won" : time === 0 ? "lost" : "active";

  const numberStatus = (number) => {
    if (!availables.includes(number)) {
      return "used";
    }
    if (candidates.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === "used" || gameStatus !== "active") {
      return;
    }

    const newCandidates =
      currentStatus === "available"
        ? candidates.concat(number)
        : candidates.filter((cn) => cn !== number);

    setGameState(newCandidates);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain onClick={startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarDisplay count={stars} />
          )}
        </div>

        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
              key={`play-number-${number}`}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {time}</div>
    </div>
  );
};

export default StarGame;
