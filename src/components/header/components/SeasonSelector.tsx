import React from "react";
import { useSeasonsBranches } from "../hooks/useSeasonsBranches";

const SeasonSelector: React.FC = () => {
  const { seasons, selectedSeason, handleSeasonChange } = useSeasonsBranches();

  // Debug için
  console.log("SeasonSelector - seasons:", seasons);

  if (!seasons || seasons.length === 0) {
    return (
      <div className="season-selector p-3 text-center">
        <span className="text-muted">Sezon bulunamadı</span>
      </div>
    );
  }

  return (
    <div className="season-selector">
      {seasons.map((season) => (
        <div
          key={season.id}
          className={`dropdown-item ${
            selectedSeason === season.id ? "active" : ""
          }`}
          style={{ cursor: "pointer", padding: "8px 16px" }}
          onClick={() => handleSeasonChange(season.id)}
        >
          {season.name}
        </div>
      ))}
    </div>
  );
};

export default SeasonSelector;
