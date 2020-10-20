/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { jsx, useThemeUI } from "theme-ui";
import { extent, max } from "d3-array";
import { curveBasis } from "@visx/curve";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { DateValueType, LineGraphType } from "../common/interfaces";

const getX = (d: DateValueType) => d.date;
const getY = (d: DateValueType) => d.value;

export const LineGraph = ({ width, height, data }: LineGraphType) => {
  const context = useThemeUI();
  const { theme } = context;

  const padding: number = theme.space ? Number(theme.space[3]) : 0;

  const xScale = scaleTime<number>({
    domain: extent(data, getX) as [Date, Date],
  });

  const yScale = scaleLinear<number>({
    domain: [0, max(data, getY) as number],
  });

  xScale.range([0, width - padding * 2]);
  yScale.range([height - padding, 0]);

  return (
    <svg width={width} height={height}>
      <rect sx={{ fill: "background", width: width, height: height }} />
      <Group top={padding} left={padding}>
        <LinePath<DateValueType>
          curve={curveBasis}
          data={data}
          // TODO: [DATAHUB-36] Type this function
          // @ts-ignore
          x={(d) => xScale(getX(d))}
          // @ts-ignore
          y={(d) => yScale(getY(d))}
          sx={{
            stroke: "primary",
            strokeWidth: 2,
            strokeOpacity: 1,
            shapeRendering: "geometricPrecision",
          }}
        />
      </Group>
    </svg>
  );
};
