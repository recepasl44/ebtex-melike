import React from "react";
import { useSeasonsBranches } from "../hooks/useSeasonsBranches";

const BranchSelector: React.FC = () => {
  const { branches, selectedBranch, handleBranchChange } = useSeasonsBranches();

  // Debug için
  console.log("BranchSelector - branches:", branches);

  if (!branches || branches.length === 0) {
    return (
      <div className="branch-selector p-3 text-center">
        <span className="text-muted">Şube bulunamadı</span>
      </div>
    );
  }

  return (
    <div className="branch-selector">
      {branches.map((branch) => (
        <div
          key={branch.id}
          className={`dropdown-item ${
            selectedBranch === branch.id ? "active" : ""
          }`}
          style={{ cursor: "pointer", padding: "8px 16px" }}
          onClick={() => handleBranchChange(branch.id)}
        >
          {branch.name}
        </div>
      ))}
    </div>
  );
};

export default BranchSelector;
