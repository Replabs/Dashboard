import React, { useEffect, useState } from "react";
import { Node, Edge, Network, Options } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import { TwitterHyperParams } from "../../App";
import { CircularProgress } from "@mui/material";
import TwitterSidePanel from "./TwitterSidePanel";

type Props = {
  hyperParams: TwitterHyperParams;
  selectedTopResult: TwitterNode | null;
  setTopResults: (topResults: TwitterNode[]) => void;
};

export type TwitterEdge = {
  id: string;
  from: string;
  to: string;
  reply_tweet_ids: string[];
  value: number;
};

export type TwitterNode = {
  id: string;
  label: string;
  title: string;
  value: number;
};

// The Network options.
const options: Options = {
  nodes: {
    shape: "dot",
  },
  edges: {
    color: {
      inherit: true,
    },
    hoverWidth: 3.3,
    physics: false,
    scaling: {
      min: 0,
      max: 5,
      label: {
        drawThreshold: 1,
      },
    },
    selfReference: {
      angle: 0.7853981633974483,
      renderBehindTheNode: false,
    },
    smooth: false,
    arrows: {
      to: {
        enabled: true,
      },
    },
  },
  physics: {
    hierarchicalRepulsion: {
      centralGravity: 0,
    },
    maxVelocity: 30,
    minVelocity: 0.35,
    solver: "hierarchicalRepulsion",
  },
};

/**
 * A full screen loading spinner.
 */
function LoadingView() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <CircularProgress
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          "-webkit-transform": "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

/**
 * The graph of the twitter list.
 */
function TwitterGraph(props: Props) {
  const [network, setNetwork] = useState<Network | null>(null);
  const [data, setData] = useState<{
    nodes: DataSet<Node>;
    edges: DataSet<Edge>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [selectedEdges, setSelectedEdges] = useState<TwitterEdge[] | null>(
    null
  );

  const fetchData = async () => {
    setIsLoading(true);

    const response = await fetch(
      `http://127.0.0.1:5000/twitter_graph/${props.hyperParams.list_id}/${props.hyperParams.topic}?alpha=${props.hyperParams.alpha}&sentiment_weight=${props.hyperParams.sentiment_weight}&similarity_threshold=${props.hyperParams.similarity_threshold}`
    ).catch(() => {
      alert("Failed to fetch Twitter graph");
      setIsLoading(false);
    });

    if (!response || !response.ok) {
      alert("Failed to fetch graph");
      return setIsLoading(false);
    }

    const body = await response.json();

    // Convert the nodes of the body into a DataSet.
    const nodes: TwitterNode[] = body.nodes
      .map((n: string) => JSON.parse(n))
      .map((n: unknown[]) => {
        const data = n[1] as {
          label: string;
          size: number;
        };

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
          reply_tweet_ids: string[];
          weight: number;
        };

        return {
          id: id,
          to: e[1],
          from: e[0],
          reply_tweet_ids: data.reply_tweet_ids,
          value: data.weight,
        } as TwitterEdge;
      });

    // Update the state.
    setIsLoading(false);
    setData({
      nodes: new DataSet<Node>(nodes),
      edges: new DataSet<Edge>(edges),
    });

    // Update the top results for the parent.
    props.setTopResults(nodes.sort((a, b) => b.value - a.value).slice(0, 3));
  };

  const render = () => {
    const container = document.getElementById("graph");
    const network = new Network(container!!, data!!, options);

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
    const edges = edgeIds.map((id) => data!!.edges.get(id) as TwitterEdge);

    setSelectedEdges(edges);
  }, [props.selectedTopResult]);

  // Render the graph from the cached data when possible.
  useEffect(() => {
    if (data && !isLoading) {
      render();
    }
  }, [data, isLoading]);

  // Return the div containing the graph data.
  return isLoading ? (
    <LoadingView />
  ) : (
    <React.Fragment>
      <TwitterSidePanel edges={selectedEdges} />
      <div id="graph" />
    </React.Fragment>
  );
}

export default TwitterGraph;
