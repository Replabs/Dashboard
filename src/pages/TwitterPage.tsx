import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import BottomInfoButton from "../components/BottomInfoButton";
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

function defaultTopic(listId: string): string {
  switch (listId) {
    case "1174203958044348418":
    case "1483456727219683332":
      return "Geopolitics";
    case "1229800319527223296":
      return "Meditation";
    case "1280729707994988545":
      return "NLP";
    case "1285998958012178434":
      return "Computer Graphics";
    case "1413729015454568454":
    case "1518268962953482241":
      return "Psychedelics";
    case "1414394668276600832":
      return "Effective Altruism";
    case "1471523818506276866":
      return "Aave";
    case "1494852872881811461":
    case "1512385400190480396":
    case "1550512678980014081":
      return "Crypto";
    case "1511977355505512450":
    case "1558460052645617664":
    case "1570063337723166720":
      return "Web 3";
    case "1548015533710123010":
      return "Permaculture";
    default:
      return "Technology";
  }
}

function TwitterPage() {
  const { list_id } = useParams();

  const [hyperParams, setHyperParams] = useState<TwitterHyperParams>({
    list_id: list_id!!,
    topic: defaultTopic(list_id!!),
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
      <BottomInfoButton />
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
