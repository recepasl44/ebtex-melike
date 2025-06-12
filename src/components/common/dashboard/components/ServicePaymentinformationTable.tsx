import { Card, Col } from "react-bootstrap";
import { ServicePaymentInformation } from "../type.ts"
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface ServicePaymentinformationTableProps {
    servicePaymentinformation: ServicePaymentInformation[]
}

const ServicePaymentinformationTable: React.FC<ServicePaymentinformationTableProps> = ({
  servicePaymentinformation
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
    const paymentData = [...servicePaymentinformation];
    
    // If less than 5 rows, add empty rows to maintain height
    if (paymentData.length < 5) {
      const emptyRowsNeeded = 5 - paymentData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        paymentData.push({} as ServicePaymentInformation);
      }
    }
    
    return paymentData;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Servis Ödeme Bilgileri</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Plakası" },
                  { title: "Grup Adı" },
                  { title: "Yolcu Kapasitesi" },
                  { title: "Yolcu Sayısı" },
                  { title: "Gelir Toplamı" },
                  { title: "Ödenen" },
                  { title: "Kalan" }
                ]}
              >
                {prepareTableData().map((payment, index) => {
                  // Check if this is an empty row
                  const isEmpty = !payment.service_plate;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={7}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`payment-${index}`}>
                      <td className="text-nowrap">{payment.service_plate}</td>
                      <td className="text-nowrap">{payment.group_name}</td>
                      <td className="text-nowrap">{payment.passenger_capacity}</td>
                      <td className="text-nowrap">{payment.number_of_passengers}</td>
                      <td className="text-nowrap">₺{payment.total_income}</td>
                      <td className="text-nowrap">₺{payment.paid}</td>
                      <td className="text-nowrap">₺{payment.remainder}</td>
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

export default ServicePaymentinformationTable