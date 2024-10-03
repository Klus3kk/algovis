import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// Interfejs dla węzła (node)
interface Node {
  row: number;
  col: number;
  isWall: boolean;
  f: number;
  g: number;
  h: number;
  parent: Node | null;
}

// Ustawienia siatki
const numRows = 10;
const numCols = 10;

const AStarVisualizer = () => {
  const svgRef = useRef(null);
  const [grid, setGrid] = useState<Node[][]>([]);  // Określony typ siatki

  useEffect(() => {
    const width = 500;
    const height = 500;
    const cellSize = width / numCols;

    // Inicjalizacja gridu z typowaniem
    const initialGrid: Node[][] = [];
    for (let row = 0; row < numRows; row++) {
      const rowArray: Node[] = [];
      for (let col = 0; col < numCols; col++) {
        rowArray.push({
          row,
          col,
          isWall: Math.random() < 0.2, // Generowanie losowych przeszkód
          f: Infinity,
          g: Infinity,
          h: 0,
          parent: null,
        });
      }
      initialGrid.push(rowArray);
    }
    initialGrid[0][0].isWall = false; // Start
    initialGrid[numRows - 1][numCols - 1].isWall = false; // Koniec

    setGrid(initialGrid);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Czyszczenie poprzedniego contentu

    svg
      .selectAll("rect")
      .data(initialGrid.flat())
      .enter()
      .append("rect")
      .attr("x", (d: Node) => d.col * cellSize)  // Określamy typ dla d
      .attr("y", (d: Node) => d.row * cellSize)  // Określamy typ dla d
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("fill", (d: Node) => (d.isWall ? "black" : "white"))
      .attr("stroke", "gray");

    // Implementacja A*
    const aStarSearch = () => {
      const startNode = initialGrid[0][0];
      const endNode = initialGrid[numRows - 1][numCols - 1];
      startNode.g = 0;
      startNode.f = heuristic(startNode, endNode);

      const openSet: Node[] = [startNode];
      const closedSet: Node[] = [];

      function heuristic(node: Node, end: Node): number {
        return Math.abs(node.row - end.row) + Math.abs(node.col - end.col); // Manhattan distance
      }

      function reconstructPath(current: Node | null) {
        while (current !== null) {
          svg
            .selectAll("rect")
            .filter((d: Node) => d === current)
            .attr("fill", "lightgreen"); // Wypełnienie ścieżki
          current = current.parent;
        }
      }

      function aStarStep() {
        if (openSet.length === 0) {
          console.log("Nie znaleziono ścieżki");
          return;
        }

        let current = openSet.reduce((prev, curr) => (prev.f < curr.f ? prev : curr));

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

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (tentativeGScore >= neighbor.g) {
            return;
          }

          neighbor.parent = current;
          neighbor.g = tentativeGScore;
          neighbor.f = neighbor.g + heuristic(neighbor, endNode);
        });

        svg
          .selectAll("rect")
          .filter((d: Node) => d === current)
          .attr("fill", "lightblue");

        setTimeout(aStarStep, 100); // Kroki algorytmu co 100ms
      }

      function getNeighbors(node: Node): Node[] {
        const neighbors: Node[] = [];
        const { row, col } = node;
        if (row > 0) neighbors.push(initialGrid[row - 1][col]); // Up
        if (row < numRows - 1) neighbors.push(initialGrid[row + 1][col]); // Down
        if (col > 0) neighbors.push(initialGrid[row][col - 1]); // Left
        if (col < numCols - 1) neighbors.push(initialGrid[row][col + 1]); // Right
        return neighbors;
      }

      aStarStep();
    };

    aStarSearch();
  }, []);

  return <svg ref={svgRef} width={500} height={500}></svg>;
};

export default AStarVisualizer;
