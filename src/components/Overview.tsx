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
  Divider,
} from "theme-ui";
import { ProjectPreview } from "./ProjectPreview";

const DatahubLogo = "/images/datahub-logo.svg";

const mockData = [
  {
    id: "1234",
    title: "PAXCounter",
    location: "Berlin, Deutschland",
    description:
      "Zählung von Besucherströmen auf dem Tempelhofer Feld in Berlin.",
  },
  {
    id: "5678",
    title: "Second project",
    location: "Berlin, Deutschland",
    description: "Description for this project.",
  },
  {
    id: "9012",
    title: "Third project",
    location: "Berlin, Deutschland",
    description: "Description for this project.",
  },
];

export const Overview: React.FC = () => {
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
              <ProjectPreview
                id={item.id}
                title={item.title}
                location={item.location}
                description={item.description}
              />
            );
          })}
        </Box>
      </Grid>
    </Container>
  );
};
