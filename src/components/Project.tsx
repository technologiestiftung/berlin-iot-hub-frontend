/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { useStoreState } from "../state/hooks";
import { getRecords } from "../lib/requests";
import { Link, useParams } from "react-router-dom";
import { jsx, Grid, Container, Box, Card, IconButton, Text } from "theme-ui";
import { downloadMultiple } from "../lib/download-handlers";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ProjectSummary } from "./ProjectSummary";
import { DataTable } from "./DataTable";
import { IconButton as DownloadButton } from "./IconButton";
import { ProjectType, DeviceType } from "../common/interfaces";
import { RadioTabs } from "./RadioTabs";
import { LineChart } from "./visualization/LineChart";
import { createDateValueArray } from "../lib/utils";
import { ApiInfo } from "./ApiInfo";

const downloadIcon = "./images/download.svg";

interface RouteParams {
  id: string;
}
export const Project: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const projectWithoutRecords: ProjectType = useStoreState((state) =>
    state.projects.selected(Number(id))
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

  const handleDownload = () => {
    downloadMultiple(
      completeProjectData.devices.map((device: DeviceType) => device.records),
      completeProjectData.devices.map(
        (device: DeviceType) => device.description
      )
    );
  };

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
          <Box mt={4}>
            {completeProjectData && (
              <ApiInfo
                entries={completeProjectData.devices.map(
                  (device: DeviceType) => {
                    return {
                      name: device.description,
                      id: device.id,
                    };
                  }
                )}
              />
            )}
          </Box>
          <Box mt={4}>
            {completeProjectData && (
              <DownloadButton
                value={"Alle Daten downloaden"}
                iconSource={downloadIcon}
                clickHandler={handleDownload}
              />
            )}
          </Box>
          <Card mt={5} bg="muted" sx={{ minHeight: "200px" }}>
            Kartenansicht
          </Card>
        </Box>
        <Box>
          <Card p={0}>
            {completeProjectData &&
              completeProjectData.devices &&
              selectedDevice && (
                <Grid
                  columns={["auto max-content"]}
                  p={3}
                  sx={{
                    borderBottom: (theme) =>
                      `1px solid ${theme.colors.lightgrey}`,
                  }}
                >
                  <RadioTabs
                    name={"devices"}
                    options={completeProjectData.devices.map(
                      (device: DeviceType) => device.description
                    )}
                    changeHandler={(selected) =>
                      setSelectedDeviceId(
                        completeProjectData.devices.find(
                          (device: DeviceType) => {
                            return device.description === selected;
                          }
                        )?.ttnDeviceId
                      )
                    }
                  />
                  <Text>
                    {selectedDevice.records.length &&
                    selectedDevice.records[0].hasOwnProperty("recordedAt")
                      ? new Date(
                          Math.max(
                            ...selectedDevice.records.map((e) =>
                              Date.parse(e.recordedAt)
                            )
                          )
                        ).toLocaleDateString()
                      : ""}
                  </Text>
                </Grid>
              )}
            <Box ref={parentRef} mt={4}>
              {selectedDevice && selectedDevice.records && (
                <LineChart
                  width={svgWrapperWidth}
                  height={svgWrapperHeight}
                  data={createDateValueArray(selectedDevice.records)}
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
