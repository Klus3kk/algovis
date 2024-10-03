import { useRouter } from 'next/router';
import AlgorithmVisualizer from "../components/AlgorithmVisualizer";
import { useState, useEffect } from "react";

export default function AlgorithmPage() {
  const router = useRouter();
  const { algorithm } = router.query; // Get the selected algorithm from the URL
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    // Check if the router is ready (the query params are available)
    if (!router.isReady) return;

    // Generate a random array for visualization when the router is ready
    const randomArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    setArray(randomArray);

  }, [router.isReady]); // This effect runs only when the router is ready

  if (!algorithm) {
    return <p>Loading...</p>; // Optional loading state while the router is initializing
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-10">
      <h2 className="text-4xl font-bold mb-8">Visualizing {algorithm}</h2>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-5">
        <AlgorithmVisualizer array={array} />
      </div>

      <div className="mt-10 flex space-x-4">
        <button className="px-4 py-2 bg-primary text-foreground rounded hover:bg-opacity-75">Play</button>
        <button className="px-4 py-2 bg-gray-500 text-foreground rounded hover:bg-opacity-75">Pause</button>
        <button className="px-4 py-2 bg-gray-500 text-foreground rounded hover:bg-opacity-75">Reset</button>
      </div>
    </div>
  );
}
