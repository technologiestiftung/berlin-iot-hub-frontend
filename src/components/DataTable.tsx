/** @jsx jsx */
import React from "react";
import { jsx, Grid, Card, Box } from "theme-ui";
import { IconButton } from "./IconButton";
import { RecordType, DataTableType } from "../common/interfaces";

const downloadIcon = "./images/download.svg";

export const DataTable: React.FC<DataTableType> = ({ data, title }) => {
  return (
    <Card mt={4} p={0}>
      <Grid
        columns={["auto max-content"]}
        p={3}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.colors.lightgrey}`,
        }}
      >
        {title && <Box color="primary">{title}</Box>}
        <Box>
          <IconButton value={"Download"} iconSource={downloadIcon} />
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
                  borderBottom: (theme) =>
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
            {data &&
              data
                .sort(
                  (a, b) => Date.parse(b.recordedAt) - Date.parse(a.recordedAt)
                )
                .map((el: RecordType, i: number) => {
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
                      <td>{new Date(el.recordedAt).toLocaleDateString()}</td>
                      <td>{new Date(el.recordedAt).toLocaleTimeString()}</td>
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
