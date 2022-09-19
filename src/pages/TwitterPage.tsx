import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import TwitterGraph from "../components/twitter/TwitterGraph";
import TwitterLeftPanel from "../components/twitter/TwitterLeftPanel";
import { TwitterNode } from "../components/twitter/types";

export type TwitterHyperParams = {
  list_id: string;
  topic: string;
  alpha: number;
  sentiment_weight: number;
  similarity_threshold: number;
};

function TwitterPage() {
  const { list_id } = useParams();

  const [hyperParams, setHyperParams] = useState<TwitterHyperParams>({
    list_id: list_id!!,
    topic: "Permaculture",
    alpha: 0.85,
    sentiment_weight: 0.2,
    similarity_threshold: 0.5,
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
        setTopResults={(nodes) => setTopResults(nodes)}
      />
    </React.Fragment>
  );
}

export default TwitterPage;
