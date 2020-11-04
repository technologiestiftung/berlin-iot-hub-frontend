/** @jsx jsx */
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { jsx, Box, Card, Heading, Text, Grid, Flex } from "theme-ui";
import { ProjectType, DateValueType } from "../common/interfaces";
import { LinePath } from "./visualization/LinePath";
import { getDevices, getRecords, API_VERSION } from "../lib/requests";
import { createDateValueArray } from "../lib/utils";

export const ProjectPreview: React.FC<ProjectType> = ({
  id,
  title,
  city,
  description,
}) => {
  const [dateValueArray, setDateValueArray] = useState<
    DateValueType[] | undefined
  >(undefined);

  useEffect(() => {
    let isMounted = true;

    const fetchFirstDeviceRecords = async () => {
      const {
        data: { devices },
      } = await getDevices(
        `${process.env.REACT_APP_API_URL}/api/${API_VERSION}/projects/${id}/devices`
      );

      if (devices.length < 1) return;

      const {
        data: { records },
      } = await getRecords(
        `${process.env.REACT_APP_API_URL}/api/${API_VERSION}/devices/${devices[0].id}/records`
      );
      return records;
    };

    fetchFirstDeviceRecords()
      .then((result) => {
        if (!result || !isMounted) return;
        setDateValueArray(createDateValueArray(result));
      })
      .catch((error) => console.error(error));

    return () => {
      isMounted = false;
    };
  }, [id]);

  const parentRef = useRef<HTMLDivElement>(null);
  const [svgWrapperWidth, setSvgWrapperWidth] = useState(0);
  const [svgWrapperHeight, setSvgWrapperHeight] = useState(0);

  const updateWidthAndHeight = () => {
    if (parentRef.current === null) return;
    setSvgWrapperWidth(parentRef.current.offsetWidth);
    setSvgWrapperHeight(parentRef.current.offsetWidth / 2);
  };

  useEffect(() => {
    if (parentRef.current === null) return;
    setSvgWrapperWidth(parentRef.current.offsetWidth);
    setSvgWrapperHeight(parentRef.current.offsetWidth / 2);

    window.addEventListener("resize", updateWidthAndHeight);

    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, []);

  return (
    <Box mt={4}>
      <Link to={`${id}`} sx={{ textDecoration: "none", color: "text" }}>
        <Card
          sx={{
            transition: "all .2s ease-out",
            ":hover": {
              bg: "muted",
            },
          }}
        >
          <Grid gap={2} columns={[1, 2, 2]}>
            <Box>
              <Heading as="h3" variant="h3">
                {title}
              </Heading>
              <Heading as="h4" variant="h5" mt={1}>
                {city}
              </Heading>
              <Text mt={3}>{description}</Text>
            </Box>
            <Flex ref={parentRef} mt={[4, 0, 0]} sx={{ alignItems: "center" }}>
              {dateValueArray && (
                <svg
                  viewBox={`0 0 ${svgWrapperWidth} ${svgWrapperHeight}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width={svgWrapperWidth}
                  height={svgWrapperHeight}
                  sx={{ overflow: "visible" }}
                >
                  <LinePath
                    width={svgWrapperWidth}
                    height={svgWrapperHeight}
                    data={dateValueArray}
                  />
                </svg>
              )}
            </Flex>
          </Grid>
        </Card>
      </Link>
    </Box>
  );
};
