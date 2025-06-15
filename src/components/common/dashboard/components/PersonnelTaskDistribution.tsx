import React from "react";
import { Card, Col } from "react-bootstrap";
import { StaffTaskDistributionTable } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface PresonelTaskDistributionProps {
    personnelTaskDistribution: StaffTaskDistributionTable[]
}

const PersonnelTaskDistribution: React.FC<PresonelTaskDistributionProps> = ({
  personnelTaskDistribution = [],
}) => {
  // Fixed height table container style
  const tableContainerStyle = {
    height: '300px', // Fixed height for 5 rows + header
    maxHeight: '300px', // Ensure it doesn't expand
    overflow: 'hidden', // Hide overflow initially
    display: 'flex',
    flexDirection: 'column' as const
  };
  
  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: 'auto' as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: '100%' // Fill the container
  };

  const getStatusColorClass = (status: string) => {
    status = status.toLowerCase();
    switch (status) {
      case "tamamlandı":
        return "danger";
      case "devam ediyor":
        return "success";
      case "görev durumu":
        return "primary";
      default:
        return "primary";
    }
  };
  
  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const taskData = Array.isArray(personnelTaskDistribution)
      ? [...personnelTaskDistribution]
      : [];
    
    // If less than 5 rows, add empty rows to maintain height
    if (taskData.length < 5) {
      const emptyRowsNeeded = 5 - taskData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        taskData.push({} as StaffTaskDistributionTable);
      }
    }
    
    return taskData;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Personel Görev Dağılımı</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height table container with vertical scroll */}
          <div className="table-responsive" style={tableContainerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Görev Kategorisi" },
                  { title: "Adı Soyadı" },
                  { title: "Görev Tarih ve Saati" },
                  { title: "Görev Yeri" },
                  { title: "Görev Durumu" },
                  { title: "İletişim Bilgisi" },
                  { title: "Açıklamalar" },
                ]}
              >
                {prepareTableData().map((item, index) => {
                  // Check if this is an empty row
                  const isEmpty = !item.name;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={7}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`task-${index}`}>
                      <td className="text-nowrap">{item.task_categories}</td>
                      <td className="text-nowrap">{item.name}</td>
                      <td className="text-nowrap">{item.mission_time}</td>
                      <td className="text-nowrap">{item.task_place}</td>
                      <td className="text-nowrap">
                        <span
                          className={`text-${getStatusColorClass(item.task_status)}-transparent text-${getStatusColorClass(item.task_status)}`}
                          style={{ padding: "6px 12px" }}
                        >
                          {item.task_status.charAt(0).toUpperCase() + item.task_status.slice(1)}
                        </span>
                      </td>
                      <td className="text-nowrap">{item.contact_information}</td>
                      <td className="text-wrap" style={{ maxWidth: "250px" }}>{item.description}</td>
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

export default PersonnelTaskDistribution;