import { Card, Col, Nav } from "react-bootstrap";
import { PdrMeetingList } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { useState } from "react";

interface ConsultingMeetingListstableProps {
    data: PdrMeetingList[];
    }
const ConsultingMeetingListstable: React.FC<ConsultingMeetingListstableProps> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("Bugün");


  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between d-flex align-items-center">
          <Card.Title>Danışmanlık Görüşmeleri Listesi</Card.Title>
          <Nav className="nav nav-tabs nav-tabs-header">
            <Nav.Item>
              <Nav.Link
                className={activeFilter === "Bugün" ? "active" : ""}
                onClick={() => setActiveFilter("Bugün")}
              >
                Bugün
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={activeFilter === "Haftalık" ? "active" : ""}
                onClick={() => setActiveFilter("Haftalık")}
              >
                Haftalık
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={activeFilter === "Aylık" ? "active" : ""}
                onClick={() => setActiveFilter("Aylık")}
              >
                Aylık
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Öğrenci Adı" },
                { title: "Görüşme Türü" },
                { title: "Tarih" },
                { title: "Saat" },
                { title: "Görüşme Süresi" },
                { title: "Durum" },
                { title: "Notlar" },
              ]}
            >
              {data.map((meeting, index) => (
                <tr key={`meeting-${index}`}>
                  <td className="text-nowrap">{meeting.student_name}</td>
                  <td className="text-nowrap">{meeting.meeting_type}</td>
                  <td className="text-nowrap">{meeting.date}</td>
                  <td className="text-nowrap">{meeting.hourse}</td>
                  <td className="text-nowrap">{meeting.minute}dk</td>
                  <td className="text-nowrap">
                    <span
                    >
                      {meeting.status}
                    </span>
                  </td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>
                    {meeting.description}
                  </td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ConsultingMeetingListstable;
