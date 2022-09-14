import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";

function LandingPage() {
  const [twitterListId, setTwitterListId] = useState<string>("");

  return (
    <>
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
              <Stack direction="column">
                <TextField
                  className="TextField"
                  label="Twitter List ID"
                  type="text"
                  onChange={(e) => setTwitterListId(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{
                    maxWidth: "400px",
                    margin: "12px",
                  }}
                />
                <Link to={`/twitter/${twitterListId}`}>
                  <Button>Show Graph</Button>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default LandingPage;
