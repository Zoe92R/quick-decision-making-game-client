import { FC, useState, useEffect } from "react";

import GameForm from "../components/GameForm/GameForm";
import { GamePageContainer } from "./styles";
import WaitingMode from "../components/WaitingMode/WaitingMode";
import { getRandomBoolean, getRandomInRange } from "../utils/utilityFunctions";
import GameMode from "../components/Game/GameMode";
import { UserGameStatus } from "../types/enums";
import { createUser, updateUser } from "../services/users";

const GamePage: FC = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [score, setScore] = useState(0);
  const [isCircleOnRight, setIsCircleOnRight] = useState(false);
  const [isCircleVisible, setIsCircleVisible] = useState(false);
  const [message, setMessage] = useState<UserGameStatus | "">("");

  // Handle key events
  useEffect(() => {
    if (!userName) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      // check error - too soon
      if (isWaiting) return setMessage(UserGameStatus.TOO_SOON);
      if (isCircleVisible) {
        // check success
        if (
          (isCircleOnRight && event.key === "l") ||
          (!isCircleOnRight && event.key === "a")
        ) {
          setMessage(UserGameStatus.SUCCESS);
          setScore((prev) => prev + 1);
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

  // creating user or updating existing user
  useEffect(() => {
    if (userName && !userId) {
      createUser(userName, 0, setUserId);
    } else if (userId && score) {
      updateUser(userId, score);
    }
  }, [score, userId, userName]);

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
