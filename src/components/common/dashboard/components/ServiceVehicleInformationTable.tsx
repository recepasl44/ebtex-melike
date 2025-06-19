import { Card, Col } from "react-bootstrap";
import { ServiceVehicleInformation } from "../type.ts"
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface ServiceVehicleInformationTableProps {
    serviceVehicleInformation: ServiceVehicleInformation[]
}

const ServiceVehicleInformationTable: React.FC<ServiceVehicleInformationTableProps> = ({
  serviceVehicleInformation
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
    const vehicleData = [...serviceVehicleInformation];
    
    // If less than 5 rows, add empty rows to maintain height
    if (vehicleData.length < 5) {
      const emptyRowsNeeded = 5 - vehicleData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        vehicleData.push({} as ServiceVehicleInformation);
      }
    }
    
    return vehicleData;
  };
  
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Servis Araç Bilgileri</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Araç Plakası" },
                  { title: "Servis Şoförü" },
                  { title: "Bakım Tarihi" },
                  { title: "Sigorta Yenileme Tarihi" },
                  { title: "Muayene Tarihi" },
                ]}
              >
                {prepareTableData().map((vehicle, index) => {
                  // Check if this is an empty row
                  const isEmpty = !vehicle.plate_no;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={5}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`vehicle-${index}`}>
                      <td className="text-nowrap">{vehicle.plate_no}</td>
                      <td className="text-nowrap">{vehicle.service_driver}</td>
                      <td className="text-nowrap">{vehicle.maintenance_date}</td>
                      <td className="text-nowrap">{vehicle.insurance_and_renewal_date}</td>
                      <td className="text-nowrap">{vehicle.examination_date}</td>
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

export default ServiceVehicleInformationTable