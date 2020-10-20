/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { useStoreState } from "../state/hooks";
import { getRecords } from "../lib/requests";
import { Link, useParams } from "react-router-dom";
import { jsx, Grid, Container, Box, Card, IconButton } from "theme-ui";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import generateDateValue, {
  DateValue,
} from "@visx/mock-data/lib/generators/genDateValue";
import { ProjectSummary } from "./project/ProjectSummary";
import { DataTable } from "./project/DataTable";
import { IconButton as DownloadButton } from "./IconButton";
import { ProjectType, DeviceType } from "../common/interfaces";
import { RadioTabs } from "./RadioTabs";
import { LineGraph } from "./LineGraph";

const downloadIcon = "./images/download.svg";

const testdata = generateDateValue(25).sort(
  (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime()
);

interface RouteParams {
  id: string;
}
export const Project: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [data, setData] = useState<ProjectType | undefined>(undefined);

  const selectedProject = useStoreState((state) => state.projects.selected(id));

  useEffect(() => {
    if (!selectedProject) return;

    Promise.all(
      selectedProject.devices.map(async (device: DeviceType) => {
        const {
          data: { records },
        } = await getRecords(
          `${process.env.REACT_APP_API_URL}/api/devices/${device.id}/records`
        );
        return records;
      })
    )
      .then((results: Array<any>) => {
        const devicesWithRecords = selectedProject.devices.map(
          (device: DeviceType, i: number) => {
            return {
              ...device,
              records: results[i],
            };
          }
        );

        setData({
          ...selectedProject,
          devices: devicesWithRecords,
        });
      })
      .catch((error) => console.error(error));
  }, [selectedProject]);

  const testData = ["Sensor A", "Sensor B", "Sensor C"];

  const parentRef = useRef(null);
  const [svgWrapperWidth, setSvgWrapperWidth] = useState(0);
  const [svgWrapperHeight, setSvgWrapperHeight] = useState(0);

  const updateWidthAndHeight = () => {
    // @ts-ignore
    setSvgWrapperWidth(parentRef.current.offsetWidth);
    // @ts-ignore
    setSvgWrapperHeight(parentRef.current.offsetWidth / 2);
  };

  useEffect(() => {
    // @ts-ignore
    setSvgWrapperWidth(parentRef.current.offsetWidth);
    // @ts-ignore
    setSvgWrapperHeight(parentRef.current.offsetWidth / 2);
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, [parentRef]);

  const [selected, setSelected] = useState(testData[0]);

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
            {data && (
              <ProjectSummary
                title={data.title}
                description={data.description}
                noOfDevices={data.devices ? data.devices.length : 0}
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
            <RadioTabs
              name={"devices"}
              options={testData}
              changeHandler={(selected) => setSelected(selected)}
            />
            <Box ref={parentRef} mt={3}>
              <LineGraph
                width={svgWrapperWidth}
                height={svgWrapperHeight}
                data={testdata}
              />
            </Box>
          </Card>
          {data && data.devices && (
            <DataTable
              data={data.devices[0].records}
              title={data.devices[0].description}
            />
          )}
        </Box>
      </Grid>
    </Container>
  );
};
