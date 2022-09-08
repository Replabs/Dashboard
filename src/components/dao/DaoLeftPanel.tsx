import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Divider, Typography } from "@mui/material";
import "../SidePanel.css";
import { EdgeData } from "./DaoGraph";
import { DaoHyperParams } from "../../App";
import DaoToggles from "./DaoToggles";

type Props = {
  topResults: string[];
  hyperParams: DaoHyperParams;
  onUpdate: (params: DaoHyperParams) => void;
};

function capitalizeEachWord(str: string) {
  return str
    .split(" ")
    .map((s) => s[0].toUpperCase() + s.substr(1))
    .join(" ");
}

function DaoLeftPanel(props: Props) {
  return (
    <div className="Drawer-Container">
      <Drawer elevation={2} anchor="left" variant="permanent">
        <Box sx={{ width: 300 }} role="presentation">
          <Typography
            variant="h6"
            sx={{ margin: "20px 20px 0 20px", color: "#666" }}
          >
            DAO
          </Typography>
          <Typography sx={{ margin: "0 20px 20px 20px" }} variant="h3">
            {capitalizeEachWord(props.hyperParams.name)}
          </Typography>
          <Divider sx={{ marginBottom: "12px" }} />
          <DaoToggles
            initialParams={props.hyperParams}
            onUpdate={props.onUpdate}
          />
          <Divider />
          <List>
            {props.topResults.map((user) => (
              <ListItem key={user}>
                <Typography>{user}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default DaoLeftPanel;
