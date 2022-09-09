import React from "react";
import { CircularProgress } from "@mui/material";

/**
 * A full screen loading spinner.
 */
function LoadingView() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <CircularProgress
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          "-webkit-transform": "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

export default LoadingView;
