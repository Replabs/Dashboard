import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, Divider, Stack, Typography } from "@mui/material";
import "../SidePanel.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ParameterToggles from "../ParameterToggles";
import { DaoHyperParams } from "../../pages/DaoPage";
import { baseUrl } from "../../utils";
import { DaoNode } from "./types";

type Props = {
  topResults: DaoNode[];
  hyperParams: DaoHyperParams;
  onUpdate: (params: DaoHyperParams) => void;
  onSelectTopResult: (result: DaoNode) => void;
};

type DaoInfo = {
  member_count: number;
  name: string;
};

function uppercaseFirsLetters(str: string) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function DaoLeftPanel(props: Props) {
  const [daoInfo, setDaoInfo] = useState<DaoInfo | null>(null);
  const [error, setError] = useState(false);

  async function fetchDaoInfo() {
    const response = await fetch(
      `${baseUrl()}/dao/${props.hyperParams.name}`
    ).catch(() => {
      return setError(true);
    });

    if (!response || !response.ok) {
      return setError(true);
    }

    const body = await response.json();
    setDaoInfo(body as DaoInfo);
  }

  useEffect(() => {
    if (!daoInfo) {
      fetchDaoInfo();
    }
  }, [daoInfo]);

  const topResults = () => {
    return (
      <List>
        {props.topResults.map((node) => (
          <ListItem key={node.id}>
            <Button
              onClick={() => props.onSelectTopResult(node)}
              sx={{
                textTransform: "unset !important",
                textAlign: "left",
                width: "100%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="left"
                alignItems="center"
                spacing={1}
                sx={{ width: "100%" }}
              >
                <AccountCircleIcon sx={{ color: "#666" }} />
                <Stack>
                  <Typography
                    sx={{ color: "#666", lineHeight: 1.1 }}
                    variant="h6"
                  >
                    {node.title}
                  </Typography>
                  <Typography
                    sx={{
                      marginTop: 0,
                      paddingTop: 0,
                      fontSize: "0.8rem",
                      color: "#666",
                    }}
                  >
                    PageRank: {(node.value / 1000).toFixed(5)}
                  </Typography>
                </Stack>
              </Stack>
            </Button>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <div className="Drawer-Container">
      {!error && (
        <Drawer elevation={2} anchor="left" variant="permanent">
          <Box sx={{ width: 300 }} role="presentation">
            <Typography
              sx={{
                margin: "20px 20px 0px 20px",
                fontWeight: 800,
              }}
              variant="h4"
            >
              {uppercaseFirsLetters(props.hyperParams.name)}
            </Typography>
            <Typography
              sx={{ marginLeft: "20px", marginBottom: "12px", color: "#666" }}
              variant="h6"
            >
              {daoInfo?.member_count ? `${daoInfo.member_count} members` : ""}
            </Typography>
            <Divider sx={{ marginBottom: "12px" }} />
            <Typography
              sx={{ margin: "20px 20px 0px 20px", fontWeight: 500 }}
              variant="h5"
            >
              Parameters
            </Typography>
            <ParameterToggles
              initialParams={props.hyperParams}
              onUpdate={(values) => props.onUpdate(values as DaoHyperParams)}
            />
            <Divider />
            <Typography
              sx={{ margin: "20px 20px 0px 20px", fontWeight: 500 }}
              variant="h5"
            >
              Top Results
            </Typography>
            {topResults()}
          </Box>
        </Drawer>
      )}
    </div>
  );
}

export default DaoLeftPanel;
