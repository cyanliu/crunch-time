import React, { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

export interface DataItem {
  date: Date;
  value: number;
}

interface LineChartProps {
  dataset: DataItem[];
  width?: number;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  dataset: dataset,
  width = 500,
  height = 300,
}) => {
  // bounds = area inside the graph axis = calculated by substracting the margins
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis
  const [min, max] = d3.extent(dataset, (d) => d.value);
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [dataset, height]);

  // X axis
  const [xMin, xMax] = d3.extent(dataset, (d) => d.date);
  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .domain([xMin || 0, xMax || 0])
      .range([0, boundsWidth]);
  }, [dataset, width]);

  // Render the X and Y axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3
      .axisBottom<Date>(xScale)
      .tickFormat(d3.timeFormat("%b %Y"));
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  // Build the line
  const lineBuilder = d3
    .line<DataItem>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));
  const linePath = lineBuilder(dataset);
  if (!linePath) {
    return null;
  }

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <path
            d={linePath}
            opacity={1}
            stroke="#9a6fb0"
            fill="none"
            strokeWidth={2}
          />
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};
