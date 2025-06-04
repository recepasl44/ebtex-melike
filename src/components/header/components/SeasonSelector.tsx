// D:\xintra_react_ts\src\components\header\components\SeasonSelector.tsx
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import { useSeasonsBranches } from "../hooks/useSeasonsBranches";
import calendarLight from "../../../assets/images/media/calender.svg";
import calendarDark from "../../../assets/images/media/calender-dark.svg";

const SeasonSelector: React.FC = () => {
  const { seasons, selectedSeason, handleSeasonChange } = useSeasonsBranches();

  // Redux'tan tema bilgisi
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";
  const iconSrc = isDark ? calendarDark : calendarLight;

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdownSeasonToggle"
        variant="link"
        className="header-link no-caret"
      >
        <img
          src={iconSrc}
          alt="Season Icon"
          style={{ width: 14, height: 14 }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="main-header-dropdown dropdown-menu-end">
        <Dropdown.ItemText className="fw-medium">
          Select Season
        </Dropdown.ItemText>
        <Dropdown.Divider />
        {seasons.map((season) => (
          <Dropdown.Item
            key={season.id}
            active={selectedSeason === season.id}
            onClick={() => handleSeasonChange(season.id)}
          >
            {season.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SeasonSelector;
