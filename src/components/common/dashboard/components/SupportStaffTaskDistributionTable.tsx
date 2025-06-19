import { Card, Col } from "react-bootstrap";
import { StaffTaskDistributionTable } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface SupportStaffTaskDistributionTableProps {
    data : StaffTaskDistributionTable[];
}
const SupportStaffTaskDistributionTable: React.FC<SupportStaffTaskDistributionTableProps> = ({
  data,
}) => {
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
  
  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const taskData = [...data];
    
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
          <Card.Title>Destek Personeli Görev Tablosu</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Görev Kategorisi" },
                  { title: "Adı ve Soyadı" },
                  { title: "Görev Tarihi ve Saati" },
                  { title: "Görev Yeri" },
                  { title: "Görev Durumu" },
                  { title: "Açıklamalar" }
                ]}
              >
                {prepareTableData().map((item, index) => {
                  // Check if this is an empty row
                  const isEmpty = !item.name;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={6}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`task-${index}`}>
                      <td className="text-nowrap">{item.task_categories}</td>
                      <td className="text-nowrap">{item.name}</td>
                      <td className="text-nowrap">{item.mission_time}</td>
                      <td className="text-nowrap">{item.task_place}</td>
                      <td className="text-nowrap">{item.task_status}</td>
                      <td className="text-truncate" style={{ maxWidth: "150px" }} title={item.description}>
                        {item.description}
                      </td>
                    </tr>
                  );
                })}
              </SpkTablescomponent>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default SupportStaffTaskDistributionTable