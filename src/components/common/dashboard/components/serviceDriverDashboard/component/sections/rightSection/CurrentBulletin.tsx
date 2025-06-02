import React from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import { DailyBulletin } from "../../../../../type";
import SpkDropdown from "../../../../../../../../@spk-reusable-components/reusable-uielements/spk-dropdown";

interface CurrentBulletinProps {
    daily_bulletins: DailyBulletin[];
}

const CurrentBulletin: React.FC<CurrentBulletinProps> = ({ daily_bulletins }) => {
  
  
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
  
  return (
    <Col xxl={12}>
      <Card className="custom-card">
        <div className="card-header justify-content-between">
          <div className="card-title">Güncel Bülten</div>
        </div>
        <Card.Body className="p-0">
          <ul className="list-unstyled timeline-widget1 mb-0">
            {daily_bulletins.map((bulletin, index) => (
              <li className="timeline-widget-list" key={index}>
                <div className="d-flex align-items-center flex-nowrap mt-4">
                  <div className={`avatar avatar-xl bg-${getColorClass(index)}-transparent me-2 flex-shrink-0`}>
                    <div className="text-center">
                      <div className="fw-medium lh-1 mb-1">{getDayNumber(index)}</div>
                      <div className="fs-12 text-default fw-medium lh-1">{getDayLabel(index)}</div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap flex-fill align-items-top justify-content-between flex-nowrap gap-2">
                    <div className="events-width">
                      <p className="mb-1 timeline-widget-content fw-semibold">{bulletin.title}</p>
                      <p className="mb-0 fs-12 lh-1 text-muted d-flex align-items-center flex-wrap">
                        {bulletin.detail}
                      </p>
                    </div>
                    <SpkDropdown 
                      toggleas="a" 
                      Icon={true} 
                      IconClass="fe fe-more-vertical" 
                      Customtoggleclass="btn btn-light btn-icon no-caret"
                    >
                      <li><Dropdown.Item href="#!">Bugün</Dropdown.Item></li>
                      <li><Dropdown.Item href="#!">Bu Ay</Dropdown.Item></li>
                      <li><Dropdown.Item href="#!">Bu Dönem</Dropdown.Item></li>
                    </SpkDropdown>
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