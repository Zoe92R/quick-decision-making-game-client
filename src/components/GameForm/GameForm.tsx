import { FC, FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import { GameFormContainer } from "./styles";

interface IGameForm {
  handleStart: (name: string) => void;
}

const GameForm: FC<IGameForm> = ({ handleStart }) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    handleStart(name);
  };

  return (
    <GameFormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" type="submit" size="small">
        START
      </Button>
    </GameFormContainer>
  );
};

export default GameForm;
