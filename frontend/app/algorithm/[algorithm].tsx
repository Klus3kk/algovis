"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AlgorithmVisualizer from "../components/AlgorithmVisualizer";

export const dynamic = "force-dynamic";

export default function AlgorithmPage() {
  
  const router = useRouter();
  const { algorithm } = router.query;
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20); // Default array size
  const [speed, setSpeed] = useState<number>(300); // Default speed

  useEffect(() => {
    if (!algorithm) return; // If the algorithm is not yet ready, return early

    const randomArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(randomArray);
  }, [algorithm, arraySize]);

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArraySize(Number(e.target.value));
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-10">
      <h2 className="text-4xl font-bold mb-8">Visualizing {algorithm}</h2>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-5">
        <AlgorithmVisualizer array={array} speed={speed} />
      </div>

      {/* Sliders */}
      <div className="mt-10 w-full max-w-md space-y-4">
        <label className="block">
          <span className="text-lg">Array Size: {arraySize}</span>
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={handleArraySizeChange}
            className="w-full"
          />
        </label>

        <label className="block">
          <span className="text-lg">Visualization Speed (ms): {speed}</span>
          <input
            type="range"
            min="50"
            max="1000"
            value={speed}
            onChange={handleSpeedChange}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );
}
