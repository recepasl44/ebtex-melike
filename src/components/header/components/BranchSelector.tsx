// D:\xintra_react_ts\src\components\header\components\BranchSelector.tsx
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useSeasonsBranches } from "../hooks/useSeasonsBranches";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

// Dark / Light ikonlar:
import exchangeLight from "../../../assets/images/media/exchange.svg";
import exchangeDark from "../../../assets/images/media/exchange-dark.svg";

const BranchSelector: React.FC = () => {
  const { branches, selectedBranch, handleBranchChange } = useSeasonsBranches();

  // Redux store'dan tema modunu okuyalım:
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";
  const iconSrc = isDark ? exchangeDark : exchangeLight;

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdownBranchToggle"
        variant="link"
        className="header-link no-caret"
      >
        <img
          src={iconSrc}
          alt="Branch Icon"
          style={{ width: 14, height: 14 }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="main-header-dropdown dropdown-menu-end">
        <Dropdown.ItemText className="fw-medium">
          Select Branch
        </Dropdown.ItemText>
        <Dropdown.Divider />
        {branches.map((branch) => (
          <Dropdown.Item
            key={branch.id}
            active={selectedBranch === branch.id}
            onClick={() => handleBranchChange(branch.id)}
          >
            {branch.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default BranchSelector;
