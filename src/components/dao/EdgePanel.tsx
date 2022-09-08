import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import "../SidePanel.css";
import { EdgeData } from "./DaoGraph";

type Props = {
  edges: EdgeData[] | null;
};

function EdgePanel(props: Props) {
  useEffect(() => {
    if (!props.edges) {
      return;
    }
  });

  const list = () => {
    return !props.edges ? (
      <div />
    ) : (
      <Box
        sx={{ width: 432 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
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

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    // setEdge(null);
    // if (
    //   event.type === "keydown" &&
    //   ((event as React.KeyboardEvent).key === "Tab" ||
    //     (event as React.KeyboardEvent).key === "Shift")
    // ) {
    //   return;
    // }
    // setIsOpen(isOpen);
  };

  return (
    <div className="Drawer-Container">
      <Drawer
        elevation={2}
        anchor="right"
        open={Boolean(props.edges)}
        variant="persistent"
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}

export default EdgePanel;
