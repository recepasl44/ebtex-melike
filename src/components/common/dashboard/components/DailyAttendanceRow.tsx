import React from "react";
import { Col, Card } from "react-bootstrap";
import SpkCountrycard from "../../../../@spk-reusable-components/reusable-dashboards/spk-countrycard.tsx";

interface AttendanceCardData {
  id?: string | number;
  src: string;
  states: string;
  color: string;
  data: string | number;
  now: number;
}

interface DailyAttendanceRowProps {
  attendanceData: AttendanceCardData[];
}

const DailyAttendanceRow: React.FC<DailyAttendanceRowProps> = ({
  attendanceData,
}) => {
  return (
    <Col xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Günlük Devam Durumu</Card.Title>
        </Card.Header>
        <Card.Body>
          <ul className="list-unstyled sales-country-list">
            {attendanceData.map((item) => (
              <SpkCountrycard
                key={item.id || item.states}
                src={item.src}
                states={item.states}
                color={item.color}
                count={item.data}
                now={item.now}
              />
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DailyAttendanceRow;
