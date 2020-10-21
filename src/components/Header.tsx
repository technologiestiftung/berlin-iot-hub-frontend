/** @jsx jsx */
import React from "react";
import { Link } from "react-router-dom";
import { jsx, Flex, Box, Heading, Image, Text } from "theme-ui";

const DatahubLogo = "/images/datahub-logo.svg";
const TSBLogo = "/images/tsb-logo.svg";

export const Header: React.FC = () => {
  return (
    <Flex
      p={4}
      color="text"
      bg="background"
      sx={{
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        width: "100%",
        position: ["relative", "sticky", "sticky"],
        top: "0",
        flex: "1 1 auto",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ flex: "1 1 auto" }}>
        <Link to="/" sx={{ textDecoration: "none", color: "text" }}>
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
        </Link>
      </Box>
      <Box mt={[4, 0, 0]}>
        <Flex>
          <Flex sx={{ alignItems: "center" }}>
            <Text>Ein Projekt der:</Text>
          </Flex>
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
