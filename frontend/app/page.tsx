"use client"

import { useState, useEffect } from "react";
import AlgorithmVisualizer from "./components/AlgorithmVisualizer";


export default function Home() {
  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    // Fetch algorithms from the backend
    fetch("http://localhost:3001/algorithms")
      .then((response) => response.json())
      .then((data) => setAlgorithms(data.algorithms));

    // Generate a random array for visualization
    const randomArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    setArray(randomArray);
  }, []);

  const handleAlgorithmSelect = (algo: string) => {
    setSelectedAlgorithm(algo);
    // Here you can implement different algorithm visualizations
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Algorithms</h2>
      <ul className="list-disc ml-5">
        {algorithms.map((algo, index) => (
          <li
            key={index}
            className="p-2 border-b cursor-pointer"
            onClick={() => handleAlgorithmSelect(algo)}
          >
            {algo}
          </li>
        ))}
      </ul>

      {selectedAlgorithm && (
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4">{selectedAlgorithm} Visualization</h3>
          <AlgorithmVisualizer array={array} />
        </div>
      )}
    </div>
  );
}
