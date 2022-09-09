import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { TwitterEdge } from "./TwitterGraph";
import { CircularProgress, Grid } from "@mui/material";
import "../SidePanel.css";

import { Tweet } from "react-twitter-widgets";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import LoadingView from "../LoadingView";

// import TweetEmbed from "react-tweet-embed";

// import { Tweet } from "react-twitter-widgets";

type Props = {
  edges: TwitterEdge[];
};

// function TweetView(props: { id: string }) {
//   const [isLoaded, setIsLoaded] = useState<boolean>(false);

//   return (
//     <React.Fragment>
//       {!isLoaded && (
//         <Grid
//           container
//           justifyContent="center"
//           alignItems="center"
//           sx={{ height: "400pxfi", width: "100%" }}
//         >
//           <CircularProgress />
//         </Grid>
//       )}
//       <TweetEmbed
//         tweetId={props.id}
//         options={{ maxwidth: 400 }}
//         onTweetLoadSuccess={() => {
//           setIsLoaded(true);
//         }}
//         // onLoad={() => {
//         //   setIsLoaded(true);
//         // }}
//       />
//     </React.Fragment>
//   );
// }

function TwitterSidePanel(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
  }, [props.edges]);

  const list = () => {
    return (
      <Box
        sx={{ width: 432 }}
        role="presentation"
        // onClick={toggleDrawer(false)}
        // onKeyDown={toggleDrawer(false)}
      >
        {isLoading && <LoadingView />}
        <List>
          {props.edges.map((edge) =>
            edge.reply_tweet_ids.map((id) => (
              <ListItem key={id}>
                <Tweet
                  tweetId={id}
                  options={{ maxwidth: 400 }}
                  onLoad={() => {
                    setIsLoading(false);
                  }}
                />
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

export default TwitterSidePanel;
