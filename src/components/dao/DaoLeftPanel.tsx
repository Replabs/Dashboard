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

type Props = {
  topResults: string[];
  hyperParams: DaoHyperParams;
  onUpdate: (params: DaoHyperParams) => void;
  onSelectTopResult: (result: string) => void;
};

type DaoInfo = {
  member_count: number;
  name: string;
};

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
              {props.hyperParams.name}
            </Typography>
            <Typography
              sx={{ marginLeft: "20px", marginBottom: "12px", color: "#666" }}
              variant="h6"
            >
              100 members
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
            <List>
              {props.topResults.map((result) => (
                <ListItem key={result}>
                  <Button
                    onClick={() => props.onSelectTopResult(result)}
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
                          {result}
                        </Typography>
                        <Typography
                          sx={{
                            marginTop: 0,
                            paddingTop: 0,
                            fontSize: "0.8rem",
                            color: "#666",
                          }}
                        >
                          PageRank: 0.2
                          {/* PageRank: {(node.value / 1000).toFixed(5)} */}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
    </div>
  );
}

export default DaoLeftPanel;
