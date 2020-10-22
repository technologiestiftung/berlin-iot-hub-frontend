/** @jsx jsx */
import React from "react";
import { useStoreState } from "../state/hooks";
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
import { ProjectType } from "../common/interfaces";

const DatahubLogo = "/images/datahub-logo.svg";

export const Overview: React.FC = () => {
  const projects = useStoreState((state) => state.projects.items);

  return (
    <Container mt={[0, 5, 5]} p={4}>
      <Grid gap={[4, 4, 6]} columns={[1, null, "1fr 2fr"]}>
        <Box>
          <Image
            src={DatahubLogo}
            alt={"Logo des Berlin Data Hub"}
            sx={{ minWidth: "240px" }}
          />
          <Heading as="h1" variant="h1" mt={4} sx={{ color: "text" }}>
            Berlin <span sx={{ fontWeight: "body" }}>Data Hub</span>
          </Heading>
          <Heading as="h2" variant="h2" mt={2} sx={{ color: "primary" }}>
            Offene Datenplattform für IoT-Projekte
          </Heading>
        </Box>
        <Box sx={{ maxWidth: "60ch" }}>
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
          {projects &&
            projects.map((project: ProjectType) => {
              return (
                <ProjectPreview
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  city={project.city}
                  description={project.description}
                  devices={project.devices}
                />
              );
            })}
        </Box>
      </Grid>
    </Container>
  );
};
