import { FC, useEffect, useState } from "react";

import GameForm from "../components/GameForm/GameForm";
import WaitingMode from "../components/WaitingMode/WaitingMode";
import { GamePageContainer } from "./styles";
import { getRandomInRange } from "../utils/utiliyFunctions";
import GameMode from "../components/Game/GameMode";

const GamePage: FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isGameStarted && !isGameOn) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsGameOn(true);
      }, getRandomInRange(2, 5) * 1000);
    }
  }, [isGameStarted, isGameOn]);

  return (
    <GamePageContainer>
      {isLoading && <WaitingMode />}
      {!isGameStarted && (
        <GameForm handleStart={() => setIsGameStarted(true)} />
      )}
      {isGameOn && <GameMode />}
    </GamePageContainer>
  );
};

export default GamePage;
