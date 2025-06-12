import React from "react";
import { Card, Col } from "react-bootstrap";
import { Status } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface ServicesStatusTableProps {
    data: Status[];
}

const ServicesStatusTable: React.FC<ServicesStatusTableProps> = ({ data }) => {
  // Fixed height container style
  const containerStyle = {
    height: '350px', // Fixed height for 5 rows + header
    maxHeight: '350px', // Ensure it doesn't expand
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
    const serviceData = [...data];
    
    // If less than 5 rows, add empty rows to maintain height
    if (serviceData.length < 5) {
      const emptyRowsNeeded = 5 - serviceData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        serviceData.push({} as Status);
      }
    }
    
    return serviceData;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Servis Durumu</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Plaka" },
                  { title: "Rota" },
                  { title: "Konum" },
                  { title: "Eksik Öğrenci" },
                  { title: "Tahmini Varış" },
                ]}
              >
                {prepareTableData().map((service, index) => {
                  // Check if this is an empty row
                  const isEmpty = !service.plate;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={5}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`service-${index}`}>
                      <td className="text-nowrap">{service.plate}</td>
                      <td className="text-nowrap">{service.route}</td>
                      <td className="text-nowrap">{service.location}</td>
                      <td className="text-nowrap">{service.missing_student}</td>
                      <td className="text-nowrap">{service.estimated_arrival}</td>
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

export default ServicesStatusTable;