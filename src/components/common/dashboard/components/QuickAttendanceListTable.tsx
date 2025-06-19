import { useState } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import { QuickAttendanceList } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface QuickAttendanceListTableProps {
  quickAttendanceList: QuickAttendanceList[];
}

const QuickAttendanceListTable: React.FC<QuickAttendanceListTableProps> = ({ quickAttendanceList }) => {
  const [activeTab, setActiveTab] = useState<string>("Sabah");

  // Fixed height container style
  const containerStyle = {
    height: '300px', // Fixed height for 5 rows + header
    maxHeight: '300px', // Ensure it doesn't expand
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden' // Hide overflow initially
  };
  
  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: 'auto' as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: '100%' // Fill the container
  };

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

  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    // In a real implementation, you would filter based on the boarding time or a specific session field
    const filteredList = [...quickAttendanceList];
    
    // If less than 5 rows, add empty rows to maintain height
    if (filteredList.length < 5) {
      const emptyRowsNeeded = 5 - filteredList.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        filteredList.push({} as QuickAttendanceList);
      }
    }
    
    return filteredList;
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
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Durak No" },
                  { title: "Öğrenci Adı" },
                  { title: "Binme Saati" },
                  { title: "Durum" },
                  { title: "İletişim Bilgisi" },
                ]}
              >
                {prepareTableData().map((item, index) => {
                  // Check if this is an empty row
                  const isEmpty = !item.student_name;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={5}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`attendance-${index}`}>
                      <td className="text-nowrap">{index + 1}</td>
                      <td className="text-nowrap">{item.student_name}</td>
                      <td className="text-nowrap">{item.boarding_time}</td>
                      <td className={`text-nowrap ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </td>
                      <td className="text-nowrap">{item.contact_no}</td>
                    </tr>
                  );
                })}
              </SpkTablescomponent>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default QuickAttendanceListTable;