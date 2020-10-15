/** @jsx jsx */
import React from "react";
import { useParams, Link } from "react-router-dom";
import { jsx, Grid, Container, Box, Card, IconButton } from "theme-ui";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ProjectSummary } from "./project/ProjectSummary";
import { DataTable } from "./project/DataTable";
import { IconButton as DownloadButton } from "./IconButton";

import { tableData } from "../assets/mockData";

const downloadIcon = "./images/download.svg";

interface RouteParams {
  id: string;
}
export const Project: React.FC = () => {
  let { id } = useParams<RouteParams>();
  return (
    <Container mt={[0, 5, 5]} p={4}>
      <Grid gap={4} columns={[1, "1fr 2fr"]}>
        <Box>
          <Link to="/" sx={{ textDecoration: "none", color: "text" }}>
            <IconButton
              aria-label="Zurück zur Übersicht"
              bg="background"
              sx={{
                borderRadius: "50%",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <ArrowBackIcon color="primary" />
            </IconButton>
          </Link>
          <Box mt={2}>
            <ProjectSummary
              title="PAXCounter"
              description="An allen Eingängen des Tempelhofer Feldes sind sogenannte PAXCounter installiert, die die Besucherströme auf dem Tempelhofer Feld messen und analysierbar machen."
              noOfDevices={4}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <DownloadButton
              value={"Alle Daten downloaden"}
              iconSource={downloadIcon}
            />
          </Box>
          <Card>Map</Card>
        </Box>
        <Box>
          <Card>Line Graph</Card>
          <DataTable data={tableData} />
        </Box>
      </Grid>
    </Container>
  );
};
