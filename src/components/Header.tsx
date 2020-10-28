/** @jsx jsx */
import React from "react";
import { Link } from "react-router-dom";
import { jsx, Flex, Box, Heading, Image, Text } from "theme-ui";

const DatahubLogo = "/images/datahub-logo.svg";
const TSBLogo = "/images/tsb-logo.svg";

export const Header: React.FC = () => {
  return (
    <header
      sx={{
        color: "text",
        bg: "background",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        width: "100%",
        p: 4,
        position: ["relative", "sticky", "sticky"],
        top: "0",
        display: "flex",
        flex: "1 1 auto",
        flexWrap: "wrap",
        justifyContent: "space-between",
        zIndex: 3,
      }}
    >
      <Box>
        <Link to="/" sx={{ textDecoration: "none", color: "text" }}>
          <Flex>
            <Image
              src={DatahubLogo}
              alt={"Logo des Berlin IoT Hub"}
              sx={{ width: "56px" }}
            />
            <Heading ml={3} sx={{ lineHeight: "inherit" }}>
              Berlin <span sx={{ fontWeight: "normal" }}>IoT Hub</span>
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
    </header>
  );
};
