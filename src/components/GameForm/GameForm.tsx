import { FC, FormEvent, useState } from "react";
import Button from "@mui/material/Button";

interface IGameForm {
  handleStart: () => void;
}

const GameForm: FC<IGameForm> = ({ handleStart }) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    handleStart();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <Button variant="contained" type="submit">
          START
        </Button>
      </form>
    </div>
  );
};

export default GameForm;
