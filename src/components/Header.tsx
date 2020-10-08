/** @jsx jsx */
import React from "react";
import { jsx, Flex, Box, Heading, Image, Text } from "theme-ui";

const DatahubLogo = "/images/datahub-logo.svg";
const TSBLogo = "/images/tsb-logo.svg";

export const Header: React.FC<any> = () => {
  return (
    <Flex
      p={4}
      color="text"
      bg="background"
      sx={{
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        width: "100%",
        position: "sticky",
        top: "0",
      }}
    >
      <Box sx={{ flex: "1 1 auto" }}>
        <Flex>
          <Image
            src={DatahubLogo}
            alt={"Logo des Berlin Data Hub"}
            sx={{ width: "56px" }}
          />
          <Heading ml={3} sx={{ lineHeight: "inherit" }}>
            Berlin <span sx={{ fontWeight: "normal" }}>Data Hub</span>
          </Heading>
        </Flex>
      </Box>
      <Box>
        <Flex>
          <Text>Ein Projekt der:</Text>
          <Image
            src={TSBLogo}
            alt={"Logo der Technologiestiftung Berlin"}
            ml={3}
            sx={{ width: "148px" }}
          />
        </Flex>
      </Box>
    </Flex>
  );
};
