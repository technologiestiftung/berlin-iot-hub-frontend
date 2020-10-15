/** @jsx jsx */
import React from "react";
import { jsx, Grid, Card, Box, Button, Image } from "theme-ui";
import { Theme } from "../../style/theme";

const downloadIcon = "./images/download.svg";

export interface DataRow {
  date: string;
  time: string;
  value: number;
}

const handleDownload = () => {
  console.log("Download");
};

export const DataTable: React.FC<{
  data: Array<DataRow>;
}> = ({ data }) => {
  return (
    <Card mt={4} p={0}>
      <Grid
        columns={["auto max-content"]}
        p={3}
        sx={{
          borderBottom: (theme: Theme) => `1px solid ${theme.colors.lightgrey}`,
        }}
      >
        <Box color="primary">Sensor A</Box>
        <Box>
          <Button
            variant="text"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleDownload}
          >
            <Box
              bg="secondary"
              mr={2}
              sx={{
                display: "inline-block",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
              }}
            >
              <Image
                src={downloadIcon}
                alt="Download-Icon"
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>
            Download
          </Button>
        </Box>
      </Grid>
      <Box p={3}>
        <table
          sx={{
            width: "100%",
            p: 2,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              sx={{
                color: "mediumgrey",
                "& > th": {
                  py: 2,
                  px: 1,
                  fontWeight: "body",
                  borderBottom: (theme: Theme) =>
                    `1px solid ${theme.colors.lightgrey}`,
                },
              }}
            >
              <th sx={{ textAlign: "left" }}>Datum</th>
              <th sx={{ textAlign: "left" }}>Uhrzeit</th>
              <th sx={{ textAlign: "right" }}>Wert</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el: DataRow, i: number) => {
              return (
                <tr
                  key={i}
                  sx={{
                    backgroundColor: () =>
                      `${i % 2 === 0 ? "muted" : "background"}`,
                    "& > td": {
                      p: 2,
                      border: "none",
                    },
                  }}
                >
                  <td>{el.date}</td>
                  <td>{el.time}</td>
                  <td sx={{ textAlign: "right" }}>{el.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Card>
  );
};
