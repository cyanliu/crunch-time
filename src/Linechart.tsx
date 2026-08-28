import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// 1. Define the shape of your data
export interface DataItem {
  label: string;
  value: number;
}

// 2. Define the component's expected Props
interface LineChartProps {
  data: DataItem[];
  width?: number;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 500,
  height = 300,
}) => {
  // 3. Strongly type your DOM reference
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    // 1. Clear any previous elements to avoid duplication on re-renders
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 2. Setup scales using D3 utilities
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([height, 0]); // Inverted coordinates for SVG space

    // 3. Render the X and Y Axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

    svg.append("g").call(yAxis);

    // 4. Bind the data and draw the bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label) || 0)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", "#0070aa");
  }, [data, width, height]); // Re-run effect whenever these dependencies change

  // Drawing logic will live here...

  // 4. Return an empty SVG wrapper for D3 to inject into
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ overflow: "visible", margin: "50px" }}
    />
  );
};
