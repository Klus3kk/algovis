import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface AlgorithmVisualizerProps {
  array: number[];
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ array }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const barWidth = width / array.length;

    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...array)])
      .range([0, height]);

    // Clear previous content
    svg.selectAll("*").remove();

    // Create bars
    const bars = svg
      .selectAll("rect")
      .data(array)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * barWidth)
      .attr("y", (d) => height - yScale(d))
      .attr("width", barWidth - 2)
      .attr("height", (d) => yScale(d))
      .attr("fill", "steelblue");

    // Implement Bubble Sort with visual updates
    const bubbleSort = async (arr: number[]) => {
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      let swapped;
      do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            // Swap elements
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true;

            // Update the bars
            bars
              .data(arr)
              .transition()
              .duration(300)
              .attr("y", (d) => height - yScale(d))
              .attr("height", (d) => yScale(d));

            await delay(300); // Delay for better visualization
          }
        }
      } while (swapped);
    };

    bubbleSort([...array]); // Pass a copy of the array to avoid mutation
  }, [array]);

  return <svg ref={svgRef} width={500} height={300}></svg>;
};

export default AlgorithmVisualizer;
