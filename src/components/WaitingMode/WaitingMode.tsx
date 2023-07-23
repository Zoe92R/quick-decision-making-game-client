import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Message } from "./styles";
import { UserGameStatus } from "../../types/enums";

interface IWaitingMode {
  message: string;
}

const WaitingMode: FC<IWaitingMode> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
      <Message isSuccess={message === UserGameStatus.SUCCESS}>
        {message}
      </Message>
    </Box>
  );
};

export default WaitingMode;
