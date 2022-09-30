import { QuestionMarkOutlined } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React from "react";

function BottomInfoButton() {
  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={() => {
        window.open(
          "https://oliverklingefjord.substack.com/p/pagerank-anthropology",
          "_blank",
          "noopener,noreferrer"
        );
      }}
      sx={{
        position: "absolute",
        bottom: 32,
        right: 32,
      }}
    >
      <QuestionMarkOutlined />
    </Fab>
  );
}

export default BottomInfoButton;
