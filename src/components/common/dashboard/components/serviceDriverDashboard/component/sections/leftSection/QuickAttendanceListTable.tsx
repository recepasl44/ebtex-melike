import { useState } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import { QuickAttendanceList } from "../../../../../type";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface QuickAttendanceListTableProps {
  quickAttendanceList: QuickAttendanceList[];
}

const QuickAttendanceListTable: React.FC<QuickAttendanceListTableProps> = ({ quickAttendanceList }) => {
  const [activeTab, setActiveTab] = useState<string>("Sabah");
  
  // In a real implementation, you would filter based on the boarding time or a specific session field
  // For now, we'll just show all data regardless of tab
  const filteredList = quickAttendanceList;
  
  // Function to determine status color
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "geldi":
        return "text-success";
      case "gelmedi":
        return "text-danger";
      case "erken":
        return "text-primary";
      default:
        return "";
    }
  };
  
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between d-flex align-items-center">
          <Card.Title>Hızlı Yoklama Listesi</Card.Title>
          <Nav className="nav nav-tabs nav-tabs-header">
            {["Sabah", "Öğle", "Öğle", "Akşam"].map((tab) => (
              <Nav.Item key={tab}>
                <Nav.Link
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Durak No" },
                { title: "Öğrenci Adı" },
                { title: "Binme Saati" },
                { title: "Durum" },
                { title: "İletişim Bilgisi" },
              ]}
            >
              {filteredList.map((item, index) => (
                <tr key={`attendance-${index}`}>
                  <td className="text-nowrap">{index + 1}</td>
                  <td className="text-nowrap">{item.student_name}</td>
                  <td className="text-nowrap">{item.boarding_time}</td>
                  <td className={`text-nowrap ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </td>
                  <td className="text-nowrap">{item.contact_no}</td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default QuickAttendanceListTable;