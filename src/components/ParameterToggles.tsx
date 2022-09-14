import React, { useState } from "react";

import { Box, Button, IconButton, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./ParameterToggles.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type HyperParameters = {
  alpha: number;
  topic: string;
  similarity_threshold: number;
  sentiment_weight?: number;
};

type Props = {
  initialParams: HyperParameters;
  onUpdate: (params: HyperParameters) => void;
};

type FieldProps = {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Field(props: FieldProps) {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <TextField
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
        }}
      />
      <IconButton sx={{ height: 40, width: 40, marginRight: "12px" }}>
        <HelpOutlineIcon />
      </IconButton>
    </Stack>
  );
}

function ParameterToggles(props: Props) {
  const [hyperParams, setHyperParams] = useState<HyperParameters>(
    props.initialParams
  );

  return (
    <Box className="Toggles">
      <Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <TextField
            className="TextField"
            label="Topic"
            type="text"
            value={hyperParams.topic}
            onChange={(e) =>
              setHyperParams({
                ...hyperParams,
                topic: e.target.value,
              })
            }
            variant="outlined"
            size="small"
            sx={{
              margin: "12px",
            }}
          />
          <IconButton sx={{ height: 40, width: 40, marginRight: "12px" }}>
            <HelpOutlineIcon />
          </IconButton>
        </Stack>
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
        {hyperParams.sentiment_weight && (
          <Field
            label="Sentiment Weight"
            value={hyperParams.sentiment_weight}
            onChange={(e) =>
              setHyperParams({
                ...hyperParams,
                sentiment_weight: parseFloat(e.target.value),
              })
            }
          />
        )}
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
    </Box>
  );
}

export default ParameterToggles;
