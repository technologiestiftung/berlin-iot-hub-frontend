/** @jsx jsx */
import React from "react";
import {
  jsx,
  Heading,
  Image,
  Grid,
  Box,
  Container,
  Text,
  Card,
  Divider,
} from "theme-ui";

const DatahubLogo = "/images/datahub-logo.svg";

const mockData = [
  {
    title: "PAXCounter",
    location: "Berlin, Deutschland",
    description:
      "Zählung von Besucherströmen auf dem Tempelhofer Feld in Berlin.",
  },
  {
    title: "Second project",
    location: "Berlin, Deutschland",
    description: "Description for this project.",
  },
  {
    title: "Third project",
    location: "Berlin, Deutschland",
    description: "Description for this project.",
  },
];

export const Overview: React.FC<any> = () => {
  return (
    <Container mt={5} p={4}>
      <Grid gap={4} columns={[3, "1fr 2fr"]}>
        <Box>
          <Image
            src={DatahubLogo}
            alt={"Logo des Berlin Data Hub"}
            sx={{ minWidth: "240px" }}
          />
          <Heading as="h1" variant="h1" mt={4}>
            Berlin <span sx={{ fontWeight: "body" }}>Data Hub</span>
          </Heading>
          <Heading as="h2" variant="h2" mt={2} sx={{ color: "primary" }}>
            Offene Datenplattform für IoT-Projekte
          </Heading>
        </Box>
        <Box>
          <Text>
            Das Berlin Data Hub ist eine prototypische Offene Datenplattform,
            die Sensordaten aus Forschungsprojekten der Technologiestiftung
            Berlin speichert und als Download, sowie über eine REST-API frei
            verfügbar macht. Basierend auf diesen Daten können weiterführende
            Analysen und Visualisierungen zu den jeweiligen Projekten erstellt
            werden. Alle hier erfassten Daten sind unter der freien
            CC-BY-SA-Lizenz verfügbar.
          </Text>
          <Divider mt={4} />
          {mockData.map((item) => {
            return (
              <Box mt={4}>
                <Card>
                  <Heading as="h3" variant="h3">
                    {item.title}
                  </Heading>
                  <Heading as="h4" variant="h5" mt={1}>
                    {item.location}
                  </Heading>
                  <Text mt={3}>{item.description}</Text>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Container>
  );
};
