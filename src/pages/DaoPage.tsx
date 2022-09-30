import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BottomInfoButton from "../components/BottomInfoButton";
import DaoGraph from "../components/dao/DaoGraph";
import DaoLeftPanel from "../components/dao/DaoLeftPanel";
import { DaoNode } from "../components/dao/types";

export type DaoHyperParams = {
  name: string;
  topic: string;
  alpha: number;
  similarity_threshold: number;
};

function DaoPage() {
  const { name } = useParams();

  const [hyperParams, setHyperParams] = useState<DaoHyperParams>({
    name: name!!,
    topic: "Design",
    alpha: 0.65,
    similarity_threshold: 0.6,
  });
  const [topResults, setTopResults] = useState<DaoNode[]>([]);
  const [selectedTopResult, setSelectedTopResult] = useState<DaoNode | null>(
    null
  );

  return (
    <React.Fragment>
      <BottomInfoButton />
      <DaoLeftPanel
        topResults={topResults}
        hyperParams={hyperParams}
        onUpdate={(params) => setHyperParams(params)}
        onSelectTopResult={(node) => setSelectedTopResult(node)}
      />
      <DaoGraph
        hyperParams={hyperParams}
        selectedTopResult={selectedTopResult}
        setTopResults={(nodes) => setTopResults(nodes)}
      />
    </React.Fragment>
  );
}

export default DaoPage;
