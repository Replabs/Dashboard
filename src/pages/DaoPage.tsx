import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DaoGraph from "../components/dao/DaoGraph";
import DaoLeftPanel from "../components/dao/DaoLeftPanel";

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

  return (
    <React.Fragment>
      <DaoLeftPanel
        topResults={[]}
        hyperParams={hyperParams}
        onUpdate={(params) => setHyperParams(params)}
        onSelectTopResult={(n) => {}}
      />
      <DaoGraph hyperParams={hyperParams} />
    </React.Fragment>
  );
}

export default DaoPage;
