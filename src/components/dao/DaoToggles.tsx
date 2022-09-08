import React, { useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import "../Toggles.css";
import { DaoHyperParams } from "../../App";

type Props = {
  initialParams: DaoHyperParams;
  onUpdate: (params: DaoHyperParams) => void;
};

type FieldProps = {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Field(props: FieldProps) {
  return (
    <TextField
      id={`textfield-${props.label}`}
      className="TextField"
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

function DaoToggles(props: Props) {
  const [hyperParams, setHyperParams] = useState<DaoHyperParams>(
    props.initialParams
  );

  return (
    <Box className="Toggles">
      <Stack>
        <TextField
          id="textfield-topic"
          label="Topic"
          className="TextField"
          value={hyperParams.topic}
          onChange={(e) =>
            setHyperParams({
              ...hyperParams,
              topic: e.target.value,
            })
          }
          InputProps={{ inputProps: { min: "0", max: "1", step: "0.1" } }}
          variant="outlined"
          size="small"
          sx={{
            margin: "12px",
            width: "180px",
          }}
        />
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
      <Box className="Button-Container">
        <Button
          variant="contained"
          className="Button"
          onClick={() => props.onUpdate(hyperParams)}
        >
          Update Graph
        </Button>
      </Box>
    </Box>
  );
}

export default DaoToggles;
