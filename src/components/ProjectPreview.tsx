/** @jsx jsx */
import React from "react";
import { Link } from "react-router-dom";
import { jsx, Box, Card, Heading, Text, Grid } from "theme-ui";

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
}

export const ProjectPreview: React.FC<Project> = ({
  id,
  title,
  location,
  description,
}) => {
  return (
    <Box mt={4}>
      <Link to={id} sx={{ textDecoration: "none", color: "text" }}>
        <Card
          sx={{
            transition: "all .2s ease-out",
            ":hover": {
              bg: "muted",
            },
          }}
        >
          <Grid gap={2} columns={[1, null, 2]}>
            <Box>
              <Heading as="h3" variant="h3">
                {title}
              </Heading>
              <Heading as="h4" variant="h5" mt={1}>
                {location}
              </Heading>
              <Text mt={3}>{description}</Text>
            </Box>
            <Box>
              <svg width="100%" height="100%">
                <path
                  d="M 10 80 Q 52.5 10, 95 80 T 180 80"
                  strokeWidth={3}
                  sx={{ stroke: "primary" }}
                  fill="transparent"
                />
              </svg>
            </Box>
          </Grid>
        </Card>
      </Link>
    </Box>
  );
};
