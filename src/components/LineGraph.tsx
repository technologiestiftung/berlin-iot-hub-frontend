/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { jsx, useThemeUI } from "theme-ui";
import { extent, max } from "d3-array";
import { curveLinear } from "@visx/curve";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear, scaleUtc, coerceNumber } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { timeFormat } from "d3-time-format";
import { DateValueType, LineGraphType } from "../common/interfaces";

const getX = (d: DateValueType) => d.date;
const getY = (d: DateValueType) => d.value;

const getMinMax = (vals: (number | { valueOf(): number })[]) => {
  const numericVals = vals.map(coerceNumber);
  return [Math.min(...numericVals), Math.max(...numericVals)];
};

export const LineGraph = ({ width, height, data }: LineGraphType) => {
  const context = useThemeUI();
  const { theme } = context;

  const padding: number = theme.space ? Number(theme.space[4]) : 0;
  const paddingLeft: number = theme.space ? Number(theme.space[5]) : 0;

  const graphWidth: number = width - paddingLeft - padding;
  const graphHeight: number = height - padding;

  const xScale = scaleTime<number>({
    domain: extent(data, getX) as [Date, Date],
  });

  const yScale = scaleLinear<number>({
    domain: [0, max(data, getY) as number],
  });

  xScale.range([0, graphWidth]);
  yScale.range([graphHeight, 0]);

  const xAxis = {
    scale: scaleUtc({
      domain: getMinMax(data.map((el) => el.date)),
      range: [0, graphWidth],
    }),
    values: data.map((el) => el.date),
    tickFormat: (v: Date) => timeFormat("%H:%M:%S"),
  };

  const yAxis = {
    scale: scaleLinear({
      domain: getMinMax(data.map((el) => el.value)),
      range: [graphHeight, 0],
    }),
    values: data.map((el) => el.value),
  };

  return (
    <svg width={width} height={height} sx={{ overflow: "visible" }}>
      <rect
        sx={{
          fill: "background",
          width: graphWidth,
          height: graphHeight,
        }}
        x={paddingLeft}
      />
      <AxisBottom
        scale={xAxis.scale}
        top={graphHeight}
        left={paddingLeft}
        hideAxisLine={true}
        numTicks={6}
        tickStroke={
          theme.colors?.mediumgrey ? `${theme.colors.mediumgrey}` : "inherit"
        }
      />
      <AxisLeft
        scale={yAxis.scale}
        left={paddingLeft}
        hideAxisLine={true}
        hideTicks={true}
        numTicks={4}
        tickStroke={
          theme.colors?.mediumgrey ? `${theme.colors.mediumgrey}` : "inherit"
        }
      />
      <Group left={paddingLeft}>
        <LinePath<DateValueType>
          curve={curveLinear}
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
