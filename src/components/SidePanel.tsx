import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { EdgeData } from "./Graph";
import { Typography } from "@mui/material";
import "./SidePanel.css";
import Parser from "html-react-parser";
import TweetEmbed from "react-tweet-embed";

type Props = {
  edge: EdgeData | null;
};

function SidePanel(props: Props) {
  useEffect(() => {
    if (!props.edge) {
      return;
    }
  });

  const list = () => {
    return !props.edge ? (
      <div />
    ) : (
      <Box
        sx={{ width: 600 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Typography>From {props.edge.from}</Typography>
        <Typography>To {props.edge.to}</Typography>
        <List>
          {props.edge.reply_tweet_ids.map((id) => (
            <TweetEmbed tweetId={id} />
          ))}
          {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}



          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))} */}
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
        open={Boolean(props.edge)}
        variant="persistent"
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}

export default SidePanel;
