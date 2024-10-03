import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import StatsPanel from "./StatsPanel";
import ExplanationPanel from "./ExplanaitionPanel"; // Dodajemy panel wyjaśnień

interface Node {
  row: number;
  col: number;
  isWall: boolean;
  f: number;
  g: number;
  h: number;
  parent: Node | null;
}

const numRows = 10;
const numCols = 10;

const AStarVisualizer = () => {
  const svgRef = useRef(null);
  const [grid, setGrid] = useState<Node[][]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [steps, setSteps] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);  // Dla wyjaśnień

  useEffect(() => {
    const width = 500;
    const height = 500;
    const cellSize = width / numCols;

    const initialGrid: Node[][] = [];
    for (let row = 0; row < numRows; row++) {
      const rowArray: Node[] = [];
      for (let col = 0; col < numCols; col++) {
        rowArray.push({
          row,
          col,
          isWall: Math.random() < 0.2,
          f: Infinity,
          g: Infinity,
          h: 0,
          parent: null,
        });
      }
      initialGrid.push(rowArray);
    }
    initialGrid[0][0].isWall = false;
    initialGrid[numRows - 1][numCols - 1].isWall = false;

    setGrid(initialGrid);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .selectAll("rect")
      .data(initialGrid.flat())
      .enter()
      .append("rect")
      .attr("x", (d: Node) => d.col * cellSize)
      .attr("y", (d: Node) => d.row * cellSize)
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("fill", (d: Node) => (d.isWall ? "black" : "white"))
      .attr("stroke", "gray");

    const aStarSearch = () => {
      const startNode = initialGrid[0][0];
      const endNode = initialGrid[numRows - 1][numCols - 1];
      startNode.g = 0;
      startNode.f = heuristic(startNode, endNode);

      const openSet: Node[] = [startNode];
      const closedSet: Node[] = [];

      function heuristic(node: Node, end: Node): number {
        return Math.abs(node.row - end.row) + Math.abs(node.col - end.col);
      }

      function reconstructPath(current: Node | null) {
        setCurrentStep(5);  // Ostatni krok, znalezienie ścieżki
        while (current !== null) {
          svg
            .selectAll("rect")
            .filter((d: Node) => d === current)
            .attr("fill", "lightgreen");
          current = current.parent;
        }
      }

      function aStarStep() {
        if (openSet.length === 0) {
          console.log("Nie znaleziono ścieżki");
          return;
        }

        let current = openSet.reduce((prev, curr) => (prev.f < curr.f ? prev : curr));
        setSteps((prevSteps) => prevSteps + 1);
        setCurrentStep(1);  // Wybieramy węzeł do eksploracji

        if (current === endNode) {
          console.log("Ścieżka znaleziona");
          reconstructPath(current);
          return;
        }

        openSet.splice(openSet.indexOf(current), 1);
        closedSet.push(current);

        const neighbors = getNeighbors(current);

        neighbors.forEach((neighbor: Node) => {
          if (closedSet.includes(neighbor) || neighbor.isWall) return;

          const tentativeGScore = current.g + 1;
          setComparisons((prevComparisons) => prevComparisons + 1);

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (tentativeGScore >= neighbor.g) {
            return;
          }

          setCurrentStep(2);  // Obliczanie wartości g i f
          neighbor.parent = current;
          neighbor.g = tentativeGScore;
          neighbor.f = neighbor.g + heuristic(neighbor, endNode);
        });

        svg
          .selectAll("rect")
          .filter((d: Node) => d === current)
          .attr("fill", "lightblue");

        setTimeout(aStarStep, 100);
      }

      function getNeighbors(node: Node): Node[] {
        const neighbors: Node[] = [];
        const { row, col } = node;
        if (row > 0) neighbors.push(initialGrid[row - 1][col]);
        if (row < numRows - 1) neighbors.push(initialGrid[row + 1][col]);
        if (col > 0) neighbors.push(initialGrid[row][col - 1]);
        if (col < numCols - 1) neighbors.push(initialGrid[row][col + 1]);
        return neighbors;
      }

      aStarStep();
    };

    aStarSearch();
  }, []);

  return (
    <div className="flex">
      <svg ref={svgRef} width={500} height={500}></svg>
      <div className="ml-4">
        <StatsPanel comparisons={comparisons} swaps={0} steps={steps} />
        <ExplanationPanel currentStep={currentStep} />  {/* Dodany panel wyjaśnień */}
      </div>
    </div>
  );
};

export default AStarVisualizer;
