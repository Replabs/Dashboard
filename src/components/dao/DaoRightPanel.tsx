import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Divider, Stack, Typography } from "@mui/material";
import "../SidePanel.css";
import { AssessmentData, DaoEdge } from "./types";
import { DaoHyperParams } from "../../pages/DaoPage";

type Props = {
  edges: DaoEdge[];
  hyperParams: DaoHyperParams;
};

function AssessmentStats(props: {
  assessment: AssessmentData;
  hyperParams: DaoHyperParams;
}) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 600, color: "#666" }}>
          Relatedness to {props.hyperParams.topic}:{" "}
        </Typography>
        <Typography sx={{ color: "#666" }}>
          {Math.round(props.assessment.similarity * 100)}%
        </Typography>
      </Stack>
    </Box>
  );
}

function EdgeHeader(props: { edge: DaoEdge }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {props.edge.assessments.length} Assessment
        {props.edge.assessments.length > 1 ? "s" : ""}
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
          {props.edge.from} → {props.edge.to}
        </Typography>
        <Typography sx={{ color: "#666", textAlign: "right" }}>
          Weight: {props.edge.value.toFixed(3)}
        </Typography>
      </Box>
    </Box>
  );
}

function DaoRightPanel(props: Props) {
  return (
    <div className="Drawer-Container">
      <Drawer
        elevation={2}
        anchor="right"
        open={props.edges.length > 0}
        variant="persistent"
      >
        <Box sx={{ width: 432 }} role="presentation">
          <List>
            {props.edges.map((edge) => (
              <>
                <ListItem>
                  <EdgeHeader edge={edge} />
                </ListItem>
                <Divider />
                {edge.assessments.map((a) => (
                  <>
                    <ListItem key={a.text}>
                      <Typography sx={{ fontStyle: "italic" }}>
                        {`"[...] ${a.text}"`}
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ paddingTop: "0px" }}>
                      <AssessmentStats
                        key={`${a.text}-stats`}
                        assessment={a}
                        hyperParams={props.hyperParams}
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default DaoRightPanel;
