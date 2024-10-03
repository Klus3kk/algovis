import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface AlgorithmVisualizerProps {
  array: number[];
  speed: number;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ array, speed }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const barWidth = width / array.length;

    const yScale = d3.scaleLinear().domain([0, Math.max(...array)]).range([0, height]);

    svg.selectAll("*").remove();  // Clear previous content

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

    const bubbleSort = async (arr: number[]) => {
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      let swapped;
      do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true;

            bars
              .data(arr)
              .transition()
              .duration(speed)
              .attr("y", (d) => height - yScale(d))
              .attr("height", (d) => yScale(d));

            await delay(speed);  // Delay between steps for visualization
          }
        }
      } while (swapped);
    };

    bubbleSort([...array]);  // Sort the array without mutating the original
  }, [array, speed]);

  return <svg ref={svgRef} width={500} height={300}></svg>;
};

export default AlgorithmVisualizer;
