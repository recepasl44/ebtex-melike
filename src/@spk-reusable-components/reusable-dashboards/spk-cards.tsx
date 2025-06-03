import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface CardValue {
  label: string;
  value: string;
  prefix?: string;
}

interface CardItem {
  id?: number;
  title: string;
  count?: string;
  inc?: string;
  percentageChange?: string;
  color?: string;
  icon?: string;
  iconClass?: string;
  backgroundColor?: string;
  values?: CardValue[];
  change?: {
    label: string;
    value: string;
    color: string;
  };
}

interface SpkcardscomponentProps {
  cardClass?: string;
  Icon?: boolean;
  textbefore: boolean;
  textafter: boolean;
  svgIcon?: JSX.Element;
  mainClass?: string;
  parentClass?: string | "";
  card: CardItem;
  badgeClass?: string;
  dataClass?: string;
  headingClass?: string;
  badgeColor?: string;
  iconClass?: string;
}

const Spkcardscomponent: React.FC<SpkcardscomponentProps> = ({
  card,
  cardClass = "",
  textbefore = false,
  textafter = true,
  Icon = true,
  svgIcon,
  mainClass = "",
  parentClass = "",
  dataClass = "",
  badgeClass = "md",
  headingClass = "",
  badgeColor = "",
  iconClass = "",
}) => {
  const displayIconClass = iconClass || card.iconClass || card.icon;

  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  const cardStyles: React.CSSProperties = {
    width: "100%",
    height: "162px",
    borderRadius: "10px",
    background: isDark ? "#19191c" : "#FFF",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
  };

  // Icon container styles
  const iconContainerStyles: React.CSSProperties = {
    width: "40px",
    height: "40px",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    marginTop: "8px",
    marginRight: "8px",
  };
  const labelStyles: React.CSSProperties = {
    color: isDark ? "#FFF" : "#6E829F",
    fontFamily: "Poppins",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    marginRight: "5px",
  };

  const valueStyles: React.CSSProperties = {
    color: isDark ? "#FFF" : "#212B37",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    textAlign: "start",
  };
  // Scrollable content styles
  const contentStyles: React.CSSProperties = {
    overflowY: "auto",
    maxHeight: "calc(100% - 30px)",
    paddingRight: "5px",
  };
  const dividerStyles: React.CSSProperties = {
    width: "100%",
    height: "1px",
    backgroundColor: isDark
      ? "rgba(255,255,255,0.1)"
      : "rgba(110, 130, 159, 0.1)",
    position: "absolute",
  };
  return (
    <Fragment>
      <Card className={`custom-card ${cardClass}`} style={cardStyles}>
        <Card.Body
          className="d-flex flex-column p-3"
          style={{ height: "100%" }}
        >
          {/* Header section */}
          <div className={`d-flex justify-content-between ${mainClass}`}>
            <div className={parentClass}>
              <span
                className={`text-muted mt-2 text-nowrap ${headingClass}`}
                style={labelStyles}
              >
                {card.title}
              </span>

              {/* Display count if it exists */}
              {card.count && (
                <h4 className={`fw-medium ${dataClass}`} style={valueStyles}>
                  {card.count}
                </h4>
              )}
              {/* Add divider after title */}
              <div style={dividerStyles}></div>

              {/* Display textbefore if enabled */}
              {textbefore && card.inc && (
                <div className="text-muted d-inline-flex" style={labelStyles}>
                  {card.inc}
                  <span className={`text-${card.color} ms-1 d-inline-flex`}>
                    {card.percentageChange}
                    {card.icon && (
                      <i
                        className={`${card.icon} fs-16`}
                        style={{ padding: "4px" }}
                      ></i>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Display icon */}
            <div
              style={iconContainerStyles}
              className={`avatar avatar-${badgeClass} bg-${card.backgroundColor} ${badgeColor}`}
            >
              {svgIcon ||
                (Icon ? <i className={`${displayIconClass} fs-5`} /> : null)}
            </div>
          </div>

          {/* Scrollable content section */}
          <div className="flex-grow-1 mt-2" style={contentStyles}>
            {/* Display values array if it exists */}
            {card.values && card.values.length > 0 && (
              <div>
                {card.title === "Bugünkü Kasa Durumu" ? (
                  // Special layout for Kasa Durumu - two column layout
                  <div className="row g-2">
                    <div className="col-6">
                      <div
                        className="d-flex align-items-center justify-content-start mb-1"
                        style={labelStyles}
                      >
                        {card.values[0]?.label}
                      </div>
                      <div className="d-flex align-items-center justify-content-start mb-1">
                        <span style={labelStyles}>
                          {card.values[0]?.prefix}
                        </span>
                        <h5 className="fw-medium mb-0">
                          <span
                            className={`text-${card.color || ""} fw-medium`}
                            style={valueStyles}
                          >
                            {card.values[0]?.value}
                          </span>
                        </h5>
                      </div>
                      <div className="d-flex align-items-center justify-content-start mb-1">
                        <span style={labelStyles}>
                          {card.values[2]?.label || "Banka"}
                        </span>
                        <h5 className="fw-medium mb-0">
                          <span
                            className={`text-${card.color || ""} fw-medium`}
                            style={valueStyles}
                          >
                            {card.values[2]?.value}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="d-flex align-items-center justify-content-start mb-1"
                        style={labelStyles}
                      >
                        {card.values[1]?.label}
                      </div>
                      <div className="d-flex align-items-center justify-content-start mb-1">
                        <span style={labelStyles}>
                          {card.values[1]?.prefix}
                        </span>
                        <h5 className="fw-medium mb-0">
                          <span
                            className={`text-${card.color || ""} fw-medium`}
                            style={valueStyles}
                          >
                            {card.values[1]?.value}
                          </span>
                        </h5>
                      </div>
                      <div className="d-flex align-items-center justify-content-start mb-1">
                        <span style={labelStyles}>
                          {card.values[3]?.label || "Banka"}
                        </span>
                        <h5 className="fw-medium mb-0">
                          <span
                            className={`text-${card.color || ""} fw-medium`}
                            style={valueStyles}
                          >
                            {card.values[3]?.value}
                          </span>
                        </h5>
                      </div>
                    </div>

                    {/* Display change info inside the Kasa Durumu card */}
                    {card.change && (
                      <div className="col-12 mt-1">
                        <div
                          className="d-flex mb-1 text-muted"
                          style={{ minHeight: "20px" }}
                        >
                          <div style={{ width: "50%", minWidth: "100px" }}>
                            <span style={labelStyles}>{card.change.label}</span>
                          </div>
                          <div>
                            <h5 className="fw-medium mb-0">
                              <span
                                className={`text-${card.change.color} fw-medium`}
                                style={valueStyles}
                              >
                                {card.change.value}
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <React.Fragment>
                    <div className="d-flex flex-column">
                      {card.values.map((item, idx) => (
                        <div
                          key={idx}
                          className="d-flex mb-1 text-muted"
                          style={{ minHeight: "20px" }}
                        >
                          <div style={{ width: "50%", minWidth: "100px" }}>
                            <span style={labelStyles}>{item.label}</span>
                          </div>
                          <div>
                            <h5 className="fw-medium mb-0">
                              {item.prefix && (
                                <span
                                  style={{ ...labelStyles, fontSize: "12px" }}
                                  className="me-1 text-muted"
                                >
                                  {item.prefix}:
                                </span>
                              )}
                              <span
                                className={`text-${card.color || ""} fw-medium`}
                                style={valueStyles}
                              >
                                {item.value}
                              </span>
                            </h5>
                          </div>
                        </div>
                      ))}

                      {/* Display change info after values in standard layout */}
                      {card.change && (
                        <div
                          className="d-flex mb-1 text-muted"
                          style={{ minHeight: "20px" }}
                        >
                          <div style={{ width: "50%", minWidth: "100px" }}>
                            <span style={labelStyles}>{card.change.label}</span>
                          </div>
                          <div>
                            <h5 className="fw-medium mb-0">
                              <span
                                className={`text-${card.change.color} fw-medium`}
                                style={valueStyles}
                              >
                                {card.change.value}
                              </span>
                            </h5>
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )}
              </div>
            )}

            {/* Show change if there are no values but there is a change */}
            {(!card.values || card.values.length === 0) && card.change && (
              <div className="d-flex flex-column">
                <div
                  className="d-flex mb-2 text-muted"
                  style={{ minHeight: "24px" }}
                >
                  <div style={{ width: "50%", minWidth: "100px" }}>
                    <span style={labelStyles}>{card.change.label}</span>
                  </div>
                  <div>
                    <h5 className="fw-medium mb-0">
                      <span
                        className={`text-${card.change.color} fw-medium`}
                        style={valueStyles}
                      >
                        {card.change.value}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer section */}
          <div className="mt-auto">
            {/* Display textafter if enabled */}
            {textafter && card.inc && !card.change && (
              <div
                className="d-flex mb-2 text-muted"
                style={{ minHeight: "24px" }}
              >
                <div style={{ width: "50%", minWidth: "100px" }}>
                  <span style={labelStyles}>{card.inc}</span>
                </div>
                <div>
                  <h5 className="fw-medium mb-0">
                    <span
                      className={`text-${card.color} fw-medium`}
                      style={valueStyles}
                    >
                      {card.percentageChange}
                      {card.icon && (
                        <i
                          className={`${card.icon} fs-16`}
                          style={{ padding: "16px" }}
                        ></i>
                      )}
                    </span>
                  </h5>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Spkcardscomponent;
