"use client"

import { useState, useEffect } from "react";

export default function Home() {
  const [algorithms, setAlgorithms] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/algorithms")
      .then((response) => response.json())
      .then((data) => setAlgorithms(data.algorithms));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Algorithms</h2>
      <ul className="list-disc ml-5">
        {algorithms.map((algo, index) => (
          <li key={index} className="p-2 border-b">{algo}</li>
        ))}
      </ul>
    </div>
  );
}
