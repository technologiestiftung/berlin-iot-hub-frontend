/** @jsx jsx */
import React from "react";
import { jsx, Heading, Text, Box } from "theme-ui";

export interface SummaryData {
  title: string;
  description: string;
  noOfDevices: number;
}

export const ProjectSummary: React.FC<SummaryData> = ({
  title,
  description,
  noOfDevices,
}) => {
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
