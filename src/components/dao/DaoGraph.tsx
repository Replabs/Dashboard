import React, { useEffect, useState } from "react";
import { Node, Edge, Network, Options } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import { DaoHyperParams } from "../../App";
import { CircularProgress } from "@mui/material";
import EdgePanel from "./EdgePanel";

type Props = {
  hyperParams: DaoHyperParams;
};

export type EdgeData = {
  id: string;
  from: string;
  to: string;
  texts: string[];
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
function DaoGraph(props: Props) {
  const [data, setData] = useState<{
    nodes: DataSet<Node>;
    edges: DataSet<Edge>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [selectedEdges, setSelectedEdges] = useState<EdgeData[] | null>(null);

  const fetchData = async () => {
    setIsLoading(true);

    const response = await fetch(
      `http://127.0.0.1:5000/dao_graph/${props.hyperParams.name}/${props.hyperParams.topic}?alpha=${props.hyperParams.alpha}&similarity_threshold=${props.hyperParams.similarity_threshold}`
    );

    if (!response.ok) {
      alert("Failed to fetch graph");
      return setIsLoading(false);
    }

    const body = await response.json();

    // Convert the nodes of the body into a DataSet.
    const nodes = new DataSet<Node>(
      body.nodes
        .map((n: string) => JSON.parse(n))
        .map((n: unknown[]) => {
          const data = n[1] as {
            size: number;
          };

          return {
            id: n[0],
            label: n[0],
            title: n[0],
            value: data.size,
          };
        })
    );

    // Convert the edges of the body into a DataSet.
    const edges = new DataSet<Edge>(
      body.edges
        .map((e: string) => JSON.parse(e))
        .map((e: unknown[]) => {
          const id = `${e[0]}${e[1]}`;
          const data = e[2] as {
            weight: number;
            texts: string[];
          };

          return {
            id: id,
            to: e[1],
            from: e[0],
            value: data.weight,
            texts: data.texts,
          } as EdgeData;
        })
    );

    // Update the state.
    setData({ nodes: nodes, edges: edges });
    setIsLoading(false);
  };

  const render = () => {
    const container = document.getElementById("graph");
    const network = new Network(container!!, data!!, options);

    network.on("selectEdge", (selected: { edges: string[] }) => {
      const edges = selected.edges.map((e) => data!!.edges.get(e) as EdgeData);
      setSelectedEdges(edges);
    });
  };

  // Fetch the data.
  useEffect(() => {
    fetchData();
  }, [props.hyperParams]);

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
      <EdgePanel edges={selectedEdges} />
      <div id="graph" />
    </React.Fragment>
  );
}

export default DaoGraph;
