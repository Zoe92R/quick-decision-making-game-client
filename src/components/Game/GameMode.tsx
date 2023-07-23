import { FC } from "react";

import { Circle, CircleContainer } from "./styles";

interface IGameMode {
  isRight: boolean;
}

const GameMode: FC<IGameMode> = ({ isRight }) => {
  return (
    <CircleContainer isRight={isRight}>
      <Circle />
    </CircleContainer>
  );
};

export default GameMode;
