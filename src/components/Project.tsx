/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { useStoreState } from "../state/hooks";
import { getRecords } from "../lib/requests";
import { Link, useParams } from "react-router-dom";
import { jsx, Grid, Container, Box, Card, IconButton, Flex } from "theme-ui";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ProjectSummary } from "./project/ProjectSummary";
import { DataTable } from "./project/DataTable";
import { IconButton as DownloadButton } from "./IconButton";
import { ProjectType, DeviceType, RecordType } from "../common/interfaces";
import { RadioTabs } from "./RadioTabs";
import { LineGraph } from "./LineGraph";

const downloadIcon = "./images/download.svg";

interface RouteParams {
  id: string;
}
export const Project: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const projectWithoutRecords: ProjectType = useStoreState((state) =>
    state.projects.selected(id)
  );

  const [completeProjectData, setCompleteProjectData] = useState<ProjectType>(
    projectWithoutRecords
  );

  const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(
    undefined
  );

  const [selectedDevice, setSelectedDevice] = useState<DeviceType | undefined>(
    undefined
  );

  useEffect(() => {
    if (!projectWithoutRecords) return;

    Promise.all(
      projectWithoutRecords.devices.map(async (device: DeviceType) => {
        const {
          data: { records },
        } = await getRecords(
          `${process.env.REACT_APP_API_URL}/api/devices/${device.id}/records`
        );
        return records;
      })
    )
      .then((results: Array<any>) => {
        const devicesWithRecords: Array<DeviceType> = projectWithoutRecords.devices.map(
          (device: DeviceType, i: number) => {
            return {
              ...device,
              records: results[i],
            };
          }
        );

        setCompleteProjectData({
          ...projectWithoutRecords,
          devices: devicesWithRecords,
        });
        setSelectedDeviceId(devicesWithRecords[0].ttnDeviceId);
        setSelectedDevice(devicesWithRecords[0]);
      })
      .catch((error) => console.error(error));
  }, [projectWithoutRecords]);

  useEffect(() => {
    if (!completeProjectData) return;
    setSelectedDevice(
      completeProjectData.devices.find(
        (device) => device.ttnDeviceId === selectedDeviceId
      )
    );
  }, [selectedDeviceId, completeProjectData]);

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
  }, [parentRef]);

  return (
    <Container mt={[0, 5, 5]} p={4}>
      <Grid gap={[4, 6, 6]} columns={[1, "1fr 2fr"]}>
        <Box>
          <Link to="/" sx={{ textDecoration: "none", color: "text" }}>
            <IconButton
              aria-label="Zurück zur Übersicht"
              bg="background"
              sx={{
                borderRadius: "50%",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <ArrowBackIcon color="primary" />
            </IconButton>
          </Link>
          <Box mt={2}>
            {completeProjectData && (
              <ProjectSummary
                title={completeProjectData.title}
                description={completeProjectData.description}
                noOfDevices={
                  completeProjectData.devices
                    ? completeProjectData.devices.length
                    : 0
                }
              />
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <DownloadButton
              value={"Alle Daten downloaden"}
              iconSource={downloadIcon}
            />
          </Box>
          <Card mt={5} bg="muted" sx={{ minHeight: "200px" }}>
            Kartenansicht
          </Card>
        </Box>
        <Box>
          <Card>
            <Flex>
              {completeProjectData && completeProjectData.devices && (
                <RadioTabs
                  name={"devices"}
                  options={completeProjectData.devices.map(
                    (device: DeviceType) => device.ttnDeviceId
                  )}
                  changeHandler={(selected) => setSelectedDeviceId(selected)}
                />
              )}
            </Flex>
            <Box ref={parentRef} mt={4}>
              {selectedDevice && selectedDevice.records && (
                <LineGraph
                  width={svgWrapperWidth}
                  height={svgWrapperHeight}
                  data={selectedDevice.records.map((record: RecordType) => {
                    return {
                      date: new Date(record.recordedAt),
                      value: record.value,
                    };
                  })}
                />
              )}
            </Box>
          </Card>
          {selectedDevice && selectedDevice.records && (
            <DataTable
              data={selectedDevice.records}
              title={selectedDevice.description}
            />
          )}
        </Box>
      </Grid>
    </Container>
  );
};
