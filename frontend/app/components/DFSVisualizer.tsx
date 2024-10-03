import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Interfejsy dla węzłów i krawędzi grafu
interface Node {
  id: number;
  x: number;
  y: number;
}

interface Link {
  source: number;
  target: number;
}

// Definiowanie przykładowego grafu
const graph = {
  nodes: [
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 300, y: 100 },
    { id: 3, x: 200, y: 300 },
    { id: 4, x: 400, y: 300 },
  ] as Node[],
  links: [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
  ] as Link[],
};

const DFSVisualizer = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Czyszczenie poprzedniego contentu

    const width = 500;
    const height = 400;

    // Rysowanie węzłów
    const nodes = svg
      .selectAll("circle")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("cx", (d: Node) => d.x)
      .attr("cy", (d: Node) => d.y)
      .attr("r", 20)
      .attr("fill", "lightblue");

    // Rysowanie krawędzi
    const links = svg
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("x1", (d: Link) => {
        const sourceNode = graph.nodes.find((n) => n.id === d.source);
        return sourceNode ? sourceNode.x : 0;  // Sprawdzenie, czy sourceNode istnieje
      })
      .attr("y1", (d: Link) => {
        const sourceNode = graph.nodes.find((n) => n.id === d.source);
        return sourceNode ? sourceNode.y : 0;  // Sprawdzenie, czy sourceNode istnieje
      })
      .attr("x2", (d: Link) => {
        const targetNode = graph.nodes.find((n) => n.id === d.target);
        return targetNode ? targetNode.x : 0;  // Sprawdzenie, czy targetNode istnieje
      })
      .attr("y2", (d: Link) => {
        const targetNode = graph.nodes.find((n) => n.id === d.target);
        return targetNode ? targetNode.y : 0;  // Sprawdzenie, czy targetNode istnieje
      })
      .attr("stroke", "black");

    // Implementacja DFS
    const dfs = (nodeId: number, visited = new Set<number>()) => {
      const currentNode = graph.nodes.find((n) => n.id === nodeId);
      if (!currentNode || visited.has(nodeId)) return;  // Sprawdzenie, czy currentNode istnieje
      visited.add(nodeId);

      // Zaznaczanie węzła jako odwiedzonego
      nodes
        .filter((d: Node) => d.id === nodeId)
        .attr("fill", "orange");

      const neighbors = graph.links
        .filter((link: Link) => link.source === nodeId || link.target === nodeId)
        .map((link: Link) => (link.source === nodeId ? link.target : link.source));

      neighbors.forEach((neighborId: number) => dfs(neighborId, visited));
    };

    dfs(1); // Uruchomienie DFS z węzła początkowego
  }, []);

  return <svg ref={svgRef} width={500} height={400}></svg>;
};

export default DFSVisualizer;
