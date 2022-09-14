import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { TweetData, TwitterEdge } from "./TwitterGraph";
import { Tweet } from "react-twitter-widgets";
import LoadingView from "../LoadingView";
import "../SidePanel.css";
import { Divider, Typography } from "@mui/material";
import { TwitterHyperParams } from "../../App";
import { Stack } from "@mui/system";

type Props = {
  edges: TwitterEdge[];
  hyperParams: TwitterHyperParams;
};

function TwitterStats(props: {
  tweet: TweetData;
  hyperParams: TwitterHyperParams;
}) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 600, color: "#666" }}>
          Relevance:
        </Typography>
        <Typography sx={{ color: "#666" }}>
          {Math.round(props.tweet.weight * 100)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 600, color: "#666" }}>
          Sentiment:
        </Typography>
        <Typography sx={{ color: "#666" }}>{props.tweet.sentiment}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 600, color: "#666" }}>
          Relatedness to {props.hyperParams.topic}:{" "}
        </Typography>
        <Typography sx={{ color: "#666" }}>
          {Math.round(props.tweet.similarity * 100)}%
        </Typography>
      </Stack>
    </Box>
  );
}

function TwitterSidePanel(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
  }, [props.edges]);

  const list = () => {
    console.log(props.edges);
    return (
      <Box sx={{ width: 432 }} role="presentation">
        {isLoading && <LoadingView />}
        <List>
          {props.edges.map((edge) =>
            edge.tweets.map((tweet) => (
              <>
                <ListItem
                  key={tweet.reply_tweet_id}
                  sx={{ paddingBottom: "0px" }}
                >
                  <Tweet
                    tweetId={tweet.reply_tweet_id}
                    options={{ maxwidth: 400 }}
                    onLoad={() => {
                      setIsLoading(false);
                    }}
                  />
                </ListItem>
                <ListItem sx={{ paddingTop: "0px" }}>
                  <TwitterStats
                    key={`${tweet.reply_tweet_id}-stats`}
                    tweet={tweet}
                    hyperParams={props.hyperParams}
                  />
                </ListItem>
                <Divider />
              </>
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
