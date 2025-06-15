import React from "react";
import { Card, Col } from "react-bootstrap";
import { DailyBulletin } from "../type.ts";

interface CurrentBulletinProps {
  daily_bulletins: DailyBulletin[];
}

const CurrentBulletin: React.FC<CurrentBulletinProps> = ({
  daily_bulletins = [],
}) => {
  // Card style with fixed height
  const cardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
  };

  // Card body style with fixed height and scrolling
  const cardBodyStyle = {
    height: "600px", // Same height as other dashboard components
    overflowY: "auto" as const, // Enable scrolling if content exceeds height
    padding: "0", // Keep the existing zero padding
  };

  // Days in Turkish for display
  const getDayLabel = (index: number) => {
    const days = ["Paz", "Sal", "Çar", "Per", "Cum"];
    return days[index % days.length];
  };

  // Different color classes for day boxes
  const getColorClass = (index: number) => {
    const colors = ["pink", "teal", "warning", "info", "pink"];
    return colors[index % colors.length];
  };

  // Day number display (alternating between 21 and 31)
  const getDayNumber = (index: number) => {
    const days = [21, 31, 21, 31, 21];
    return days[index % days.length];
  };

  // Enhanced avatar style
  const avatarStyle = {
    width: "55px",
    height: "55px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Col xxl={12}>
      <Card className="custom-card" style={cardStyle}>
        <div className="card-header justify-content-between">
          <div className="card-title">Güncel Bülten</div>
        </div>
        <Card.Body className="p-0" style={cardBodyStyle}>
          <ul className="list-unstyled timeline-widget1 mb-0 px-3">
            {/* Add empty bulletins if there are fewer than 3 items */}
            {daily_bulletins.length === 0
              ? // If no bulletins, show placeholder items
                Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <li className="timeline-widget-list" key={`empty-${index}`}>
                      <div className="d-flex align-items-center flex-nowrap mt-4 pb-3">
                        <div
                          className={`avatar avatar-xl bg-light-transparent me-2 flex-shrink-0`}
                          style={avatarStyle}
                        >
                          <div className="text-center">
                            <div className="fw-medium lh-1 mb-1">&nbsp;</div>
                            <div className="fs-12 text-default fw-medium lh-1">
                              &nbsp;
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap flex-fill align-items-top justify-content-between flex-nowrap gap-2">
                          <div className="events-width">
                            <p className="mb-1 timeline-widget-content fw-semibold">
                              &nbsp;
                            </p>
                            <p className="mb-0 fs-12 lh-1 text-muted d-flex align-items-center flex-wrap">
                              &nbsp;
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
              : // Render actual bulletins
                daily_bulletins.map((bulletin, index) => (
                  <li className="timeline-widget-list" key={index}>
                    <div className="d-flex align-items-center flex-nowrap mt-4 pb-3">
                      <div
                        className={`avatar avatar-xl bg-${getColorClass(
                          index
                        )}-transparent me-2 flex-shrink-0`}
                        style={avatarStyle}
                      >
                        <div className="text-center">
                          <div className="fw-medium lh-1 mb-1">
                            {getDayNumber(index)}
                          </div>
                          <div className="fs-12 text-default fw-medium lh-1">
                            {getDayLabel(index)}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap flex-fill align-items-top justify-content-between flex-nowrap gap-2">
                        <div className="events-width">
                          <p className="mb-1 timeline-widget-content fw-semibold">
                            {bulletin.title}
                          </p>
                          <p className="mb-0 fs-12 lh-1 text-muted d-flex align-items-center flex-wrap">
                            {bulletin.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CurrentBulletin;
