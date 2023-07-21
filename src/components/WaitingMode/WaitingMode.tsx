import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface IWaitingMode {
  //   waitingModeTime: number;
}

const WaitingMode: FC<IWaitingMode> = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default WaitingMode;
