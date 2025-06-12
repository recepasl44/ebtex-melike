import React from "react";
import { Card, Col } from "react-bootstrap";
import { GuidanceCounselingInterviewTable } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface GuidanceandCounselingInterviewTableProps {
  data: GuidanceCounselingInterviewTable;
}

const GuidanceandCounselingInterviewTable: React.FC<GuidanceandCounselingInterviewTableProps> = ({ data }) => {
  // Fixed height container style
  const containerStyle = {
    height: '340px', // Fixed height for 5 rows + header
    maxHeight: '340px', // Ensure it doesn't expand
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

  const getStatusColor = (status: string): string => {
    switch(status.toLowerCase()) {
      case "bekliyor":
      case "bekleniyor":
        return "text-warning";
      case "tamamlandı":
        return "text-success";
      case "görüşülmedi":
        return "text-danger";
      default:
        return "";
    }
  };

  // Prepare sample data for display to maintain consistent height
  const prepareTableData = () => {
    // Start with the actual data
    const rows = [data];
    
    // Add empty rows to maintain height
    if (rows.length < 5) {
      const emptyRowsNeeded = 5 - rows.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        rows.push({} as GuidanceCounselingInterviewTable);
      }
    }
    
    return rows;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Rehberlik ve Danışmanlık Görüşme Tablosu</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Görüşülen" },
                  { title: "Görüşme Tarihi" },
                  { title: "Görüşme Saati" },
                  { title: "Durum" },
                  { title: "Notlar" },
                ]}
              >
                {prepareTableData().map((row, index) => {
                  // Check if this is an empty row
                  const isEmpty = !row.discussed;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={5}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`interview-${index}`}>
                      <td className="text-nowrap">{row.discussed}</td>
                      <td className="text-nowrap">{row.meeting_time}</td>
                      <td className="text-nowrap">{row.meeting_hour}</td>
                      <td className={`text-nowrap ${getStatusColor(row.status)}`}>
                        {row.status}
                      </td>
                      <td className="text-truncate" style={{ maxWidth: "150px" }} title={row.notes}>
                        {row.notes}
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
  );
};

export default GuidanceandCounselingInterviewTable;