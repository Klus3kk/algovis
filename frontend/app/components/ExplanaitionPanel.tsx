import React from 'react';

interface ExplanationPanelProps {
  currentStep: number;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ currentStep }) => {
  const explanations = {
    0: "Zaczynamy algorytm A*. Znajdowanie najkrótszej ścieżki w siatce.",
    1: "Wybieramy węzeł z najniższą wartością f i eksplorujemy jego sąsiadów.",
    2: "Obliczamy wartość g i f dla sąsiadów.",
    3: "Jeśli sąsiad nie jest w zamkniętym zbiorze i jego g jest mniejsze, dodajemy go do zbioru otwartego.",
    4: "Kontynuujemy eksplorację, aż znajdziemy węzeł końcowy.",
    5: "Ścieżka została znaleziona! Rekonstruujemy ścieżkę.",
  };

  return (
    <div className="explanation-panel p-4 bg-gray-100 shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Explanation:</h3>
      <p>{explanations[currentStep] || "Algorytm w trakcie działania..."}</p>
    </div>
  );
};

export default ExplanationPanel;
