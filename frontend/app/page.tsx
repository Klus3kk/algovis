"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const [showTitle, setShowTitle] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    // Fetch algorithms from backend
    fetch("http://localhost:3001/algorithms")
      .then((response) => response.json())
      .then((data) => setAlgorithms(data.algorithms));

    // Slow reveal effect for title and algorithm list
    setTimeout(() => setShowTitle(true), 500); // Reveal title after 0.5s
    setTimeout(() => setShowList(true), 1000); // Reveal list after 1s
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className={`text-6xl font-bold mb-8 transition-opacity duration-1000 ${showTitle ? 'opacity-100' : 'opacity-0'}`}>
        Algorithm Visualizer
      </h1>

      <ul className={`transition-opacity duration-1000 ${showList ? 'opacity-100' : 'opacity-0'}`}>
        {algorithms.map((algo, index) => (
          <li
            key={index}
            className="text-2xl font-semibold cursor-pointer hover:text-primary mb-4"
          >
            {/* Use Link component for client-side navigation */}
            <Link href={`/algorithm/${algo}`}>
              {algo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
