import { FC, useState, useEffect } from "react";

import GameForm from "../components/GameForm/GameForm";
import { GamePageContainer } from "./styles";
import WaitingMode from "../components/WaitingMode/WaitingMode";
import { getRandomBoolean, getRandomInRange } from "../utils/utilityFunctions";
import GameMode from "../components/Game/GameMode";
import { UserGameStatus } from "../types/enums";

const GamePage: FC = () => {
  const [userName, setUserName] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isCircleOnRight, setIsCircleOnRight] = useState(false);
  const [isCircleVisible, setIsCircleVisible] = useState(false);
  const [message, setMessage] = useState<UserGameStatus | "">("");

  // Handle key events
  useEffect(() => {
    if (!userName) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      // check error - too soon
      if (isWaiting) return setMessage(UserGameStatus.TOO_SOON);
      // if (isWaiting) return setMessage("Too Soon");
      if (isCircleVisible) {
        // check success
        if (
          (isCircleOnRight && event.key === "l") ||
          (!isCircleOnRight && event.key === "a")
        ) {
          setMessage(UserGameStatus.SUCCESS);
        } else setMessage(UserGameStatus.WRONG_KEY);
        setIsCircleVisible(false);
      } else setMessage(UserGameStatus.TOO_LATE); // check error - too late
      setIsWaiting(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userName, isCircleVisible, isCircleOnRight, isWaiting]);

  // Waiting mode for 2-5 seconds
  useEffect(() => {
    let waitingTimeout: NodeJS.Timeout | undefined;
    if (isWaiting) {
      waitingTimeout = setTimeout(() => {
        setIsWaiting(false);
        setIsCircleVisible(true);
        setIsCircleOnRight(getRandomBoolean());
      }, getRandomInRange(2, 5) * 1000);
    }
    return () => clearTimeout(waitingTimeout);
  }, [isWaiting]);

  useEffect(() => {
    let circleVisibleTimeout: NodeJS.Timeout | undefined;
    if (isCircleVisible) {
      circleVisibleTimeout = setTimeout(() => {
        setIsCircleVisible(false);
      }, 1000);
    }
    return () => clearTimeout(circleVisibleTimeout);
  }, [isCircleVisible]);

  const handleStart = (name: string) => {
    setUserName(name);
    setIsWaiting(true);
  };
  return (
    <GamePageContainer>
      {!userName && <GameForm handleStart={handleStart} />}
      {isWaiting && <WaitingMode message={message} />}
      {isCircleVisible && <GameMode isRight={isCircleOnRight} />}
    </GamePageContainer>
  );
};

export default GamePage;
