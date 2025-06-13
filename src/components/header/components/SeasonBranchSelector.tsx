import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
// Icons
import exchangeLight from "../../../assets/images/media/exchange.svg";
import exchangeDark from "../../../assets/images/media/exchange-dark.svg";
import SeasonSelector from "./SeasonSelector";
import BranchSelector from "./BranchSelector";

const SeasonBranchSelector: React.FC = () => {
  const [showSeasonCard, setShowSeasonCard] = useState(false);
  const [showBranchCard, setShowBranchCard] = useState(false);

  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";
  const iconSrc = isDark ? exchangeDark : exchangeLight;

  return (
    <div className="season-branch-selector header-element position-relative">
      <Dropdown>
        <Dropdown.Toggle variant="link" className="header-link no-caret">
          <img
            src={iconSrc}
            alt="Season & Branch"
            style={{ width: 14, height: 14 }}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="dropdown-menu-end"
          style={{ minWidth: "180px" }}
        >
          {/* Sezon Dropdown */}
          <div
            className="dropdown-item d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowSeasonCard(!showSeasonCard);
              setShowBranchCard(false);
            }}
          >
            <span>Sezon</span>
            <i className="bi bi-chevron-right"></i>
          </div>

          <Dropdown.Divider />

          {/* Şube Dropdown */}
          <div
            className="dropdown-item d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowBranchCard(!showBranchCard);
              setShowSeasonCard(false);
            }}
          >
            <span>Şube</span>
            <i className="bi bi-chevron-right"></i>
          </div>
        </Dropdown.Menu>
      </Dropdown>

      {/* Season Card */}
      {showSeasonCard && (
        <div
          className="season-branch-card bg-white border rounded shadow-lg"
          style={{
            top: "100%",
            right: "0",
            minWidth: "200px",
            zIndex: 1050,
            marginTop: "5px",
          }}
        >
          <div className="card-header bg-light border-bottom px-3 py-2">
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-medium">Sezon Seç</span>
              <button
                className="btn-close btn-sm"
                onClick={() => setShowSeasonCard(false)}
              ></button>
            </div>
          </div>
          <div className="card-body p-0">
            <SeasonSelector />
          </div>
        </div>
      )}

      {/* Branch Card */}
      {showBranchCard && (
        <div
          className="season-branch-card bg-white border rounded shadow-lg"
          style={{
            top: "100%",
            right: "0",
            minWidth: "200px",
            zIndex: 1050,
            marginTop: "5px",
          }}
        >
          <div className="card-header bg-light border-bottom px-3 py-2">
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-medium">Şube Seç</span>
              <button
                className="btn-close btn-sm"
                onClick={() => setShowBranchCard(false)}
              ></button>
            </div>
          </div>
          <div className="card-body p-0">
            <BranchSelector />
          </div>
        </div>
      )}

      {/* Backdrop to close cards when clicking outside */}
      {(showSeasonCard || showBranchCard) && (
        <div
          className="position-fixed"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1040,
          }}
          onClick={() => {
            setShowSeasonCard(false);
            setShowBranchCard(false);
          }}
        />
      )}
    </div>
  );
};

export default SeasonBranchSelector;
