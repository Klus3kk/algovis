import React from 'react';

interface StatsPanelProps {
  comparisons: number;
  swaps: number;
  steps: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ comparisons, swaps, steps }) => {
  return (
    <div className="stats-panel p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Real-Time Stats</h3>
      <p>Comparisons: {comparisons}</p>
      <p>Swaps: {swaps}</p>
      <p>Steps: {steps}</p>
    </div>
  );
};

export default StatsPanel;
