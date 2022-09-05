import React, { useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import "./Toggles.css";
import { HyperParams } from "../App";

type Props = {
  initialParams: HyperParams;
  onUpdate: (params: HyperParams) => void;
};

type FieldProps = {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Field(props: FieldProps) {
  return (
    <TextField
      id="outlined-number"
      label={props.label}
      type="number"
      value={props.value}
      onChange={props.onChange}
      InputProps={{ inputProps: { min: "0", max: "1", step: "0.1" } }}
      variant="outlined"
      size="small"
      sx={{
        margin: "12px",
        width: "180px",
      }}
    />
  );
}

function Toggles(props: Props) {
  const [hyperParams, setHyperParams] = useState<HyperParams>(
    props.initialParams
  );

  return (
    <Card elevation={0} className="Toggles">
      <Stack>
        <Field
          label="Alha"
          value={hyperParams.alpha}
          onChange={(e) =>
            setHyperParams({
              ...hyperParams,
              alpha: parseFloat(e.target.value),
            })
          }
        />
        <Field
          label="Sentiment Weight"
          value={hyperParams.alpha}
          onChange={(e) =>
            setHyperParams({
              ...hyperParams,
              sentiment_weight: parseFloat(e.target.value),
            })
          }
        />
        <Field
          label="Similarity Threshold"
          value={hyperParams.similarity_threshold}
          onChange={(e) =>
            setHyperParams({
              ...hyperParams,
              similarity_threshold: parseFloat(e.target.value),
            })
          }
        />
      </Stack>
      <div className="Button-Container">
        <Button
          variant="contained"
          className="Button"
          onClick={() => props.onUpdate(hyperParams)}
        >
          Update Graph
        </Button>
      </div>
    </Card>
  );
}

export default Toggles;
