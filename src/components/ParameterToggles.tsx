import React, { useState } from "react";

import { Box, Button, IconButton, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./ParameterToggles.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Popup, { PopupConfig } from "./Popup";

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
  onHelp: () => void;
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
      <IconButton
        sx={{ height: 40, width: 40, marginRight: "12px" }}
        onClick={props.onHelp}
      >
        <HelpOutlineIcon />
      </IconButton>
    </Stack>
  );
}

function ParameterToggles(props: Props) {
  const [popupConfig, setPopupConfig] = useState<PopupConfig>({
    open: false,
    title: "",
    content: "",
    onClose: () => {},
  });

  const onClose = () => {
    setPopupConfig({ ...popupConfig, open: false });
  };

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
          <IconButton
            sx={{ height: 40, width: 40, marginRight: "12px" }}
            onClick={() => {
              setPopupConfig({
                open: true,
                title: "Topic",
                content:
                  "The topic to query the graph for. The edges in the graph are pruned and weighted depending on how related they are to the topic.",
                onClose: onClose,
              });
            }}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Stack>
        <Field
          label="Alha"
          value={hyperParams.alpha}
          onHelp={() => {
            setPopupConfig({
              open: true,
              title: "Alpha",
              content:
                "The alpha is used by PageRank to determine the probability of randomly jumping to another node when traversing the directed graph. This is applied to prevent dead ends. \n\nA mental model for how the alpha value effects the PageRank score is to imagine someone going around to everyone in the community and asking them who knows a lot about the topic. A value of 0.85 means there is a 15% chance of that person giving up following the directions from other people and going to a random person instead.",
              onClose: onClose,
            });
          }}
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
            onHelp={() => {
              setPopupConfig({
                open: true,
                title: "Sentiment Weight",
                content:
                  "How important the sentiment is to the results.\n\nWeights in the graph are determined by a combination of the similarity between the referenced tweet to the topic, and the sentiment of the reply or mention.\n\nThe weights are calculated by taking the sentiment * the sentiment weight + the similarity of the edge to the topic. A positive sentiment in the text gives a sentiment score of 1, a negative sentiment a score of -1 and a neutral sentiment a score of 0. High sentiment weight means it matters more wether the mention or reply tweets have a positive sentiment.",
                onClose: onClose,
              });
            }}
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
          onHelp={() => {
            setPopupConfig({
              open: true,
              title: "Similarity Threshold",
              content:
                "Determines how similar the referenced tweet has to be to the topic. The higher the threshold, the more tweets are filtered out.",
              onClose: onClose,
            });
          }}
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
      <Popup config={popupConfig} />
    </Box>
  );
}

export default ParameterToggles;
