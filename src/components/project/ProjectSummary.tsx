/** @jsx jsx */
import React from "react";
import { jsx, Heading, Text, Box } from "theme-ui";

export const ProjectSummary: React.FC<{
  title: string;
  description: string;
  noOfDevices: number;
}> = ({ title, description, noOfDevices }) => {
  return (
    <Box sx={{ maxWidth: "60ch" }}>
      <Heading as="h1" variant="h1">
        {title}
      </Heading>
      <Text mt={3}>{description}</Text>
      <Text mt={1} sx={{ fontWeight: "bold" }}>
        Anzahl der Sensoren: {noOfDevices}
      </Text>
    </Box>
  );
};
