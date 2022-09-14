import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import "../SidePanel.css";
import { EdgeData } from "./DaoGraph";

type Props = {
  edges: EdgeData[];
};

function EdgePanel(props: Props) {
  const list = () => {
    return (
      <Box sx={{ width: 432 }} role="presentation">
        <List>
          {props.edges.map((e) =>
            e.texts.map((text) => (
              <ListItem key={text}>
                <Typography>{text}</Typography>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    );
  };

  return (
    <div className="Drawer-Container">
      <Drawer
        elevation={2}
        anchor="right"
        open={props.edges.length > 0}
        variant="persistent"
      >
        {list()}
      </Drawer>
    </div>
  );
}

export default EdgePanel;
