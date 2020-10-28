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
import { ProjectType, DeviceType, MarkerType } from "../common/interfaces";
import { RadioTabs } from "./RadioTabs";
import { LineChart } from "./visualization/LineChart";
import { createDateValueArray } from "../lib/utils";
import { ApiInfo } from "./ApiInfo";
import { MarkerMap } from "./MarkerMap";

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

  const [selectedDeviceId, setSelectedDeviceId] = useState<number | undefined>(
    undefined
  );

  const [selectedDevice, setSelectedDevice] = useState<DeviceType | undefined>(
    undefined
  );

  const [markerData, setMarkerData] = useState<MarkerType[] | undefined>(
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
        setSelectedDeviceId(devicesWithRecords[0].id);
        setSelectedDevice(devicesWithRecords[0]);
        setMarkerData(
          devicesWithRecords
            .filter((device: DeviceType) => {
              return device.latitude != null && device.longitude != null;
            })
            .map((device: DeviceType, i: number) => {
              return {
                latitude: device.latitude,
                longitude: device.longitude,
                id: device.id,
                isActive: device.id === devicesWithRecords[0].id,
              };
            })
        );
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectWithoutRecords]);

  useEffect(() => {
    if (!completeProjectData) return;
    setSelectedDevice(
      completeProjectData.devices.find(
        (device) => device.id === selectedDeviceId
      )
    );
  }, [selectedDeviceId, completeProjectData]);

  useEffect(() => {
    if (!completeProjectData) return;

    setMarkerData(
      completeProjectData.devices
        .filter((device: DeviceType) => {
          return device.latitude != null && device.longitude != null;
        })
        .map((device: DeviceType) => {
          return {
            latitude: device.latitude,
            longitude: device.longitude,
            id: device.id,
            isActive: device.id === selectedDeviceId,
          };
        })
    );
  }, [completeProjectData, selectedDeviceId]);

  const chartParentRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  const mapParentRef = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);

  const updateChartDimensions = () => {
    if (chartParentRef.current === null) return;

    setChartWidth(chartParentRef.current.offsetWidth);
    setChartHeight(chartParentRef.current.offsetWidth / 2);
  };

  useEffect(() => {
    if (chartParentRef.current === null) return;

    setChartWidth(chartParentRef.current.offsetWidth);
    setChartHeight(chartParentRef.current.offsetWidth / 2);

    window.addEventListener("resize", updateChartDimensions);

    return () => window.removeEventListener("resize", updateChartDimensions);
  }, [chartParentRef, mapParentRef]);

  const updateMapDimensions = () => {
    if (mapParentRef.current === null) return;

    setMapWidth(mapParentRef.current.offsetWidth);
    setMapHeight(mapParentRef.current.offsetHeight);
  };

  useEffect(() => {
    if (mapParentRef.current === null) return;

    setMapWidth(mapParentRef.current.offsetWidth);
    setMapHeight(mapParentRef.current.offsetHeight);

    window.addEventListener("resize", updateMapDimensions);

    return () => window.removeEventListener("resize", updateMapDimensions);
  }, [mapParentRef]);

  const handleDownload = () => {
    downloadMultiple(
      completeProjectData.devices.map((device: DeviceType) => device.records),
      completeProjectData.devices.map(
        (device: DeviceType) => device.description
      )
    );
  };

  const handleMarkerSelect = (deviceId: number) => {
    setSelectedDeviceId(deviceId);
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
          <Card mt={5} bg="muted">
            <div ref={mapParentRef} sx={{ width: "100%", height: "200px" }}>
              {markerData && markerData.length === 0 && (
                <Text>Keine Geoinformationen verfügbar.</Text>
              )}
              {markerData && markerData.length >= 1 && (
                <MarkerMap
                  markers={markerData}
                  clickHandler={handleMarkerSelect}
                  mapWidth={mapWidth}
                  mapHeight={mapHeight}
                />
              )}
            </div>
          </Card>
          {completeProjectData && (
            <Text mt={2}>Standpunkt(e): {completeProjectData.city}</Text>
          )}
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
                      (device: DeviceType) => {
                        return {
                          title: device.description,
                          id: device.id,
                          isActive: device.id === selectedDeviceId,
                        };
                      }
                    )}
                    changeHandler={(selected) => setSelectedDeviceId(selected)}
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
            <Box ref={chartParentRef} mt={4}>
              {selectedDevice && selectedDevice.records && (
                <LineChart
                  width={chartWidth}
                  height={chartHeight}
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
