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
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: "Poppins",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    marginRight: "5px",
  };

  const valueStyles: React.CSSProperties = {
    fontFamily: "Inter",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    textAlign: "start",
  };

  return (
    <Fragment>
      <Card className={`custom-card ${cardClass}`} style={cardStyles}>
        <Card.Body className="d-flex flex-column">
          <div className={`${mainClass}`}>
            <div className={parentClass}>
              <span
                className={`text-muted mt-2 ${headingClass}`}
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

              {/* Display textbefore if enabled */}
              {textbefore && card.inc && (
                <div className="text-muted d-inline-flex" style={labelStyles}>
                  {card.inc}
                  <span className={`text-${card.color} ms-1 d-inline-flex`}>
                    {card.percentageChange}
                    {card.icon && <i className={`${card.icon} fs-16`}></i>}
                  </span>
                </div>
              )}
            </div>

            {/* Display icon */}
            <div
              style={{ width: "40px", height: "40px" }}
              className={`avatar avatar-${badgeClass} bg-${card.backgroundColor} ${badgeColor}`}
            >
              {svgIcon ||
                (Icon ? <i className={`${displayIconClass} fs-5`} /> : null)}
            </div>
          </div>

          {/* Display values array if it exists */}
          {card.values && card.values.length > 0 && (
            <div className="mt-2 flex-grow-1">
              {card.title === "Bugünkü Kasa Durumu" ? (
                // Special layout for Kasa Durumu - two column layout
                <div className="row g-2">
                  <div className="col-6">
                    <div className="text-center mb-1" style={labelStyles}>
                      {card.values[0]?.label}
                    </div>
                    <div className="d-flex align-items-center justify-content-start mb-1">
                      <span style={labelStyles}>{card.values[0]?.prefix}</span>
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
                    <div className="text-center mb-1" style={labelStyles}>
                      {card.values[1]?.label}
                    </div>
                    <div className="d-flex align-items-center justify-content-start mb-1 ">
                      <span style={labelStyles}>{card.values[1]?.prefix}</span>
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
                </div>
              ) : (
                // Default layout for other cards
                <React.Fragment>
                  {card.values.map((item, idx) => (
                    <div
                      key={idx}
                      className="d-flex align-items-center justify-content-start mb-1 text-muted"
                    >
                      <span style={labelStyles}>{item.label}</span>
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
                  ))}
                </React.Fragment>
              )}
            </div>
          )}

          {/* Display textafter if enabled */}
          {textafter && card.inc && !card.change && (
            <div
              className="text-muted d-inline-flex mt-auto"
              style={labelStyles}
            >
              {card.inc}
              <span className={`text-${card.color} ms-1 d-inline-flex`}>
                {card.percentageChange}
                {card.icon && <i className={`${card.icon} fs-16`}></i>}
              </span>
            </div>
          )}

          {/* Display change info if it exists */}
          {card.change && (
            <div className="d-flex align-items-center justify-content-start mt-auto">
              <span style={labelStyles} 
                className="text-muted me-1"
              >{card.change.label}</span>
              <span
                className={`text-${card.change.color} fw-medium`}
                style={valueStyles}
              >
                {card.change.value}
              </span>
            </div>
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Spkcardscomponent;
