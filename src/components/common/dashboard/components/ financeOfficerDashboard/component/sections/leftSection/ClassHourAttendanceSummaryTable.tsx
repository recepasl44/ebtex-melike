import React, { useState } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";
import { ClassHourAttendanceSummary } from "../../../../../type";

interface ClassHourAttendanceSummaryTableProps {
  data: ClassHourAttendanceSummary[];
}

const ClassHourAttendanceSummaryTable: React.FC<ClassHourAttendanceSummaryTableProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Ortaokul");
  
  const schoolLevels = ["Anaokul", "İlkokul", "Ortaokul", "Lise"];

  return (
      <Col xxl={12} xl={12}>
        <Card className="custom-card">
          <Card.Header className="justify-content-between">
            <Card.Title>Ders Saati Yoklama Özeti</Card.Title>
          </Card.Header>
          <Card.Body className="p-3">
            {/* School Level Tabs */}
            <Nav className="mb-3" variant="pills">
              {schoolLevels.map((level) => (
                <Nav.Item key={level}>
                  <Nav.Link 
                    className={` ${activeTab === level ? 'active bg-light-primary text-primary' : ''}`} 
                    style={{ 
                      padding: "8px 24px", 
                      color: activeTab !== level ? "#6c757d" : "",
                      backgroundColor: activeTab === level ? "#f0f6ff" : "#f9f9f9",
                      marginRight: "10px"
                    }}
                    onClick={() => setActiveTab(level)}
                  >
                    {level}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            {/* Attendance Table */}
            <div className="table-responsive">
              <SpkTablescomponent
                tableClass="text-wrap"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Sınıf" },
                  { title: "Toplam Öğrenci" },
                  { title: "Gelmeyenler" },
                  { title: "Geç Gelenler" },
                  { title: "Detaylar" },
                ]}
              >
                {data.map((item, index) => (
                  <tr key={`attendance-${index}`}>
                    <td className="text-nowrap">{item.name}</td>
                    <td className="text-nowrap">{item.total_student}</td>
                    <td className="text-nowrap">{item["not _come"]}</td> 
                    <td className="text-nowrap">{item.arrivals}</td>
                    <td className="text-center">
                      <button 
                        className="btn rounded-circle" 
                        style={{ 
                          backgroundColor: "#f0f6ff",
                          width: "40px",
                          height: "40px",
                          padding: "0"
                        }}
                      >
                        <i className="bi bi-eye" style={{ color: "#0d6efd" }} />
                      </button>
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

export default ClassHourAttendanceSummaryTable;