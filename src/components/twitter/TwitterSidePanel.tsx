import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Tweet } from "react-twitter-widgets";
import LoadingView from "../LoadingView";
import "../SidePanel.css";
import { Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { TwitterHyperParams } from "../../pages/TwitterPage";
import { TwitterEdge, TweetData } from "./types";

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
        marginBottom: "8px",
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

function EdgeHeader(props: { edge: TwitterEdge }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {props.edge.tweets.length} Tweet
        {props.edge.tweets.length > 1 ? "s" : ""}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600, color: "#666" }}>
          {props.edge.from_label} → {props.edge.to_label}
        </Typography>
        <Typography sx={{ color: "#666" }}>
          Weight: {props.edge.value.toFixed(3)}
        </Typography>
      </Box>
    </Box>
  );
}

function TwitterSidePanel(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const tweet = (tweet: TweetData) => {
    return (
      <>
        <ListItem key={tweet.reply_tweet_id} sx={{ paddingBottom: "0px" }}>
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
        <Box sx={{ width: 432 }} role="presentation">
          {isLoading && <LoadingView />}
          <List>
            {props.edges.map((edge) => (
              <>
                <ListItem>
                  <EdgeHeader edge={edge} />
                </ListItem>
                <Divider />
                {edge.tweets.map((t) => tweet(t))}
              </>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default TwitterSidePanel;
