import React, { useEffect, useState } from "react";
import { Node, Edge, Network, Options } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import TwitterRightPanel from "./TwitterRightPanel";
import LoadingView from "../LoadingView";
import { TwitterHyperParams } from "../../pages/TwitterPage";
import { baseUrl, networkOptions } from "../../utils";
import { TwitterNode, TwitterEdge, TweetData } from "./types";
import { useSearchParams } from "react-router-dom";

type Props = {
  hyperParams: TwitterHyperParams;
  selectedTopResult: TwitterNode | null;
  setTopResults: (topResults: TwitterNode[]) => void;
};

function ErrorView() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "8px" }}>Could not fetch list</h1>
          <Typography sx={{ color: "#666", marginBottom: "32px" }}>
            Please try again later.
          </Typography>
        </Box>
      </Grid>
    </>
  );
}

function IsBeingCrawledView() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "8px" }}>This list is being crawled</h1>
          <Typography sx={{ color: "#666", marginBottom: "32px" }}>
            This can take several hours. Please come back later.
          </Typography>
          <CircularProgress />
        </Box>
      </Grid>
    </>
  );
}

function NeedsCrawlingView(props: {
  listId: string;
  onStartCrawling: () => void;
  onErrorCrawling: () => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const crawl = async () => {
    props.onStartCrawling();

    fetch(`${baseUrl()}/twitter_list/${props.listId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: searchParams.get("username"),
      }),
    }).catch(() => {
      props.onErrorCrawling();
    });
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <h1>This list has not been crawled yet</h1>
          <Button onClick={() => crawl()}>Start Crawling</Button>
        </Box>
      </Grid>
    </>
  );
}

/**
 * The graph of the twitter list.
 */
function TwitterGraph(props: Props) {
  const [network, setNetwork] = useState<Network | null>(null);
  const [data, setData] = useState<{
    exists: boolean;
    isBeingCrawled: boolean;
    nodes: DataSet<Node>;
    edges: DataSet<Edge>;
  } | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEdges, setSelectedEdges] = useState<TwitterEdge[] | null>(
    null
  );

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);

    const response = await fetch(
      `${baseUrl()}/twitter_graph/${props.hyperParams.list_id}/${
        props.hyperParams.topic
      }?alpha=${props.hyperParams.alpha}&sentiment_weight=${
        props.hyperParams.sentiment_weight
      }&similarity_threshold=${props.hyperParams.similarity_threshold}`
    ).catch(() => {
      setIsLoading(false);
      setIsError(true);
      return;
    });

    if (!response || !response.ok) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

    const body = await response.json();

    //
    // Return early if the graph does not already exist.
    //
    if (!body.exists) {
      setIsLoading(false);
      setData({
        exists: false,
        isBeingCrawled: body.is_being_crawled,
        nodes: new DataSet<Node>(),
        edges: new DataSet<Edge>(),
      });

      return;
    }

    let userIdToUsername: { [key: string]: string } = {};

    // Convert the nodes of the body into a DataSet.
    const nodes: TwitterNode[] = body.nodes
      .map((n: string) => JSON.parse(n))
      .map((n: unknown[]) => {
        const data = n[1] as {
          label: string;
          size: number;
        };

        // Cache the username for the edges.
        userIdToUsername[n[0] as string] = data.label;

        return {
          id: n[0],
          label: data.label,
          title: data.label,
          value: data.size,
        } as TwitterNode;
      });

    // Convert the edges of the body into a DataSet.
    const edges: TwitterEdge[] = body.edges
      .map((e: string) => JSON.parse(e))
      .map((e: unknown[]) => {
        const id = `${e[0]}${e[1]}`;
        const data = e[2] as {
          tweets: TweetData[];
          weight: number;
        };

        return {
          id: id,
          to: e[1],
          from: e[0],
          tweets: data.tweets,
          value: data.weight,
          to_label: userIdToUsername[e[1] as string],
          from_label: userIdToUsername[e[0] as string],
        } as TwitterEdge;
      });

    // Update the state.
    setIsLoading(false);
    setData({
      exists: true,
      isBeingCrawled: false,
      nodes: new DataSet<Node>(nodes),
      edges: new DataSet<Edge>(edges),
    });

    // Update the top results for the parent.
    props.setTopResults(nodes.sort((a, b) => b.value - a.value).slice(0, 3));
  };

  const render = () => {
    const container = document.getElementById("graph");
    const network = new Network(container!!, data!!, networkOptions);

    network.on("selectEdge", (selected: { edges: string[] }) => {
      const edges = selected.edges.map(
        (e) => data!!.edges.get(e) as TwitterEdge
      );
      setSelectedEdges(edges);
    });

    setNetwork(network);
  };

  // Fetch the data.
  useEffect(() => {
    fetchData();
  }, [props.hyperParams]);

  // Select the right edges if a node was selected from outside of the component.
  useEffect(() => {
    if (!props.selectedTopResult || !network || !data) {
      return;
    }

    const edgeIds = network.getConnectedEdges(props.selectedTopResult.id);
    const incomingEdges = edgeIds
      .map((id) => data!!.edges.get(id) as TwitterEdge)
      .filter((e) => e.to == props.selectedTopResult?.id);

    setSelectedEdges(incomingEdges);
  }, [props.selectedTopResult]);

  // Render the graph from the cached data when possible.
  useEffect(() => {
    if (data?.exists && !isLoading) {
      render();
    }
  }, [data, isLoading]);

  // Return the div containing the graph data.
  if (isError) {
    return <ErrorView />;
  } else if (isLoading) {
    return <LoadingView />;
  } else if (data && !data.exists && data.isBeingCrawled) {
    return <IsBeingCrawledView />;
  } else if (data && !data.exists && !data.isBeingCrawled) {
    return (
      <NeedsCrawlingView
        listId={props.hyperParams.list_id}
        onStartCrawling={() => setData({ ...data!!, isBeingCrawled: true })}
        onErrorCrawling={() => {
          setData({ ...data!!, isBeingCrawled: false });
          setIsError(true);
        }}
      />
    );
  } else {
    return (
      <React.Fragment>
        <TwitterRightPanel
          edges={selectedEdges ? selectedEdges : []}
          hyperParams={props.hyperParams}
        />
        <div id="graph" />
      </React.Fragment>
    );
  }
}

export default TwitterGraph;
