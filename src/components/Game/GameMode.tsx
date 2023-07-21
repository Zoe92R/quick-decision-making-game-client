import { getRandomBoolean } from "../../utils/utiliyFunctions";
import { Circle, CircleContainer } from "./styles";

const GameMode = () => {
  return (
    <CircleContainer isRight={getRandomBoolean()}>
      <Circle />
    </CircleContainer>
  );
};

export default GameMode;
