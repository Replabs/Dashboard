import React, { useEffect, useState } from "react";
import { Node, Edge, Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import EdgePanel from "./EdgePanel";
import LoadingView from "../LoadingView";
import { DaoHyperParams } from "../../pages/DaoPage";
import { baseUrl, networkOptions } from "../../utils";
import { Box, Button, Grid, Link, Typography } from "@mui/material";

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
          <h1 style={{ marginBottom: "8px" }}>Could not fetch DAO data</h1>
          <Typography sx={{ color: "#666", marginBottom: "32px" }}>
            Please try again later.
          </Typography>
        </Box>
      </Grid>
    </>
  );
}

function NotConfiguredView(props: { name: string }) {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "8px" }}>DAO not yet configured</h1>
          <Typography
            sx={{ color: "#666", marginBottom: "32px", maxWidth: "600px" }}
          >
            Replabs uses attestations from a Discord plugin to determine
            reputation in DAOs. This requires some configuration.
          </Typography>
          <Button
            onClick={() =>
              (document.location = `mailto:hello@replabs.xyz?subject=Replabs for ${props.name}`)
            }
          >
            CONFIGURE DAO
          </Button>
        </Box>
      </Grid>
    </>
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
  const [exists, setExists] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [selectedEdges, setSelectedEdges] = useState<EdgeData[] | null>(null);

  const fetchData = async () => {
    setIsLoading(true);

    const response = await fetch(
      `${baseUrl()}/dao_graph/${props.hyperParams.name}/${
        props.hyperParams.topic
      }?alpha=${props.hyperParams.alpha}&similarity_threshold=${
        props.hyperParams.similarity_threshold
      }`
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
      setExists(false);
      return;
    }

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
    const network = new Network(container!!, data!!, networkOptions);

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
  if (isError) {
    return <ErrorView />;
  } else if (isLoading) {
    return <LoadingView />;
  } else if (!exists) {
    return <NotConfiguredView name={props.hyperParams.name} />;
  } else {
    return (
      <React.Fragment>
        <EdgePanel edges={selectedEdges ? selectedEdges : []} />
        <div id="graph" />
      </React.Fragment>
    );
  }
}

export default DaoGraph;
