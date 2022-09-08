import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { TwitterEdge } from "./TwitterGraph";
import { CircularProgress, Grid } from "@mui/material";
import "../SidePanel.css";

import { Tweet } from "react-twitter-widgets";
// import { Tweet } from "react-twitter-widgets";

type Props = {
  edges: TwitterEdge[] | null;
};

function TweetView(props: { id: string }) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <React.Fragment>
      {!isLoaded && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "400pxfi", width: "100%" }}
        >
          <CircularProgress />
        </Grid>
      )}
      <Tweet
        tweetId={props.id}
        options={{ maxwidth: 400 }}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </React.Fragment>
  );
}

function TwitterSidePanel(props: Props) {
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
          {props.edges.map((edge) =>
            edge.reply_tweet_ids.map((id) => (
              <ListItem key={id}>
                <TweetView id={id} />
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

export default TwitterSidePanel;
