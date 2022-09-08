import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./App.css";
import TwitterGraph, {
  TwitterEdge,
  TwitterNode,
} from "./components/twitter/TwitterGraph";
import DaoGraph from "./components/dao/DaoGraph";
import DaoToggles from "./components/dao/DaoToggles";
import TwitterToggles from "./components/twitter/TwitterToggles";
import {
  Box,
  createMuiTheme,
  createTheme,
  Grid,
  ThemeProvider,
} from "@mui/material";
import DaoLeftPanel from "./components/dao/DaoLeftPanel";
import TwitterLeftPanel from "./components/twitter/TwitterLeftPanel";

export type TwitterHyperParams = {
  list_id: string;
  topic: string;
  alpha: number;
  sentiment_weight: number;
  similarity_threshold: number;
};

export type DaoHyperParams = {
  name: string;
  topic: string;
  alpha: number;
  similarity_threshold: number;
};

function TwitterView() {
  const { list_id } = useParams();

  const [hyperParams, setHyperParams] = useState<TwitterHyperParams>({
    list_id: list_id!!,
    topic: "Permaculture",
    alpha: 0.65,
    sentiment_weight: 0.2,
    similarity_threshold: 0.6,
  });
  const [topResults, setTopResults] = useState<TwitterNode[]>([]);
  const [
    selectedTopResult,
    setSelectedTopResult,
  ] = useState<TwitterNode | null>(null);

  return (
    <React.Fragment>
      <TwitterLeftPanel
        topResults={topResults}
        hyperParams={hyperParams}
        onUpdate={(params) => setHyperParams(params)}
        onSelectTopResult={(node) => setSelectedTopResult(node)}
      />
      <TwitterGraph
        hyperParams={hyperParams}
        selectedTopResult={selectedTopResult}
        setTopResults={setTopResults}
      />
    </React.Fragment>
  );
}

function DaoView() {
  const { name } = useParams();

  const [hyperParams, setHyperParams] = useState<DaoHyperParams>({
    name: name!!,
    topic: "Design",
    alpha: 0.65,
    similarity_threshold: 0.6,
  });

  return (
    <React.Fragment>
      <DaoLeftPanel
        topResults={[]}
        hyperParams={hyperParams}
        onUpdate={(params) => setHyperParams(params)}
      />
      <DaoGraph hyperParams={hyperParams} />
    </React.Fragment>
  );
}

function LandingView() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <h1>Welcome</h1>
          <h3>Navigate to a twitter list or DAO to start analysing</h3>
        </Box>
      </Grid>
    </>
  );
}

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/dao/:name" element={<DaoView />} />
            <Route path="/twitter/:list_id" element={<TwitterView />} />
            <Route path="/" element={<LandingView />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
