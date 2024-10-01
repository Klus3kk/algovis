interface AlgorithmListProps {
    algorithms: string[];
  }
  
  const AlgorithmList: React.FC<AlgorithmListProps> = ({ algorithms }) => {
    return (
      <ul className="list-disc ml-5 mt-3">
        {algorithms.map((algo, index) => (
          <li key={index} className="p-2 border-b">
            {algo}
          </li>
        ))}
      </ul>
    );
  };
  
  export default AlgorithmList;
  