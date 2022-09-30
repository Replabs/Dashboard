import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BottomInfoButton from "../components/BottomInfoButton";

function ListForm() {
  const [listId, setListId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const isValidList =
    username.length > 2 && listId.length > 3 && /^\d+$/.test(listId);

  return (
    <Stack direction="column">
      <TextField
        className="TextField"
        label="Twitter List ID"
        type="text"
        onChange={(e) => setListId(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          minWidth: "230px",
          marginTop: "12px",
          marginBottom: "12px",
        }}
      />
      <TextField
        className="TextField"
        label="Twitter Username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          minWidth: "230px",
          marginBottom: "18px",
          marginTop: "8px",
        }}
      />
      <Button disabled={!isValidList}>
        {isValidList ? (
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/twitter/${listId}?username=${username}`}
          >
            Show Graph
          </Link>
        ) : (
          "Show Graph"
        )}
      </Button>
    </Stack>
  );
}

function LandingPage() {
  return (
    <>
      <BottomInfoButton />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "8px" }}>Welcome</h1>
          <Typography sx={{ color: "#666", marginBottom: "20px" }}>
            Enter a Twitter List ID to view its reputation graph.
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <ListForm />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default LandingPage;
