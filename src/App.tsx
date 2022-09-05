import React, { useState } from "react";
import "./App.css";
import Graph from "./components/Graph";
import SidePanel from "./components/SidePanel";
import Toggles from "./components/Toggles";

export type HyperParams = {
  alpha: number;
  sentiment_weight: number;
  similarity_threshold: number;
};

const initialParams = {
  alpha: 0.55,
  sentiment_weight: 0.2,
  similarity_threshold: 0.1,
};

function App() {
  const [hyperParams, setHyperParams] = useState<HyperParams>(initialParams);

  const onUpdateHyperParams = (params: HyperParams) => {
    setHyperParams(params);
  };

  console.log(hyperParams);

  return (
    <div className="App">
      <Toggles
        initialParams={hyperParams}
        onUpdate={(params: HyperParams) => onUpdateHyperParams(params)}
      />

      <Graph hyperParams={hyperParams} />
    </div>
  );
}

export default App;
