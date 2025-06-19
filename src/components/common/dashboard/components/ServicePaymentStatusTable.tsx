import { Card, Col } from "react-bootstrap";
import { Status2 } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface ServicePaymentStatusTableProps {
  servicePaymentStatus: Status2[];
}

const ServicePaymentStatusTable: React.FC<ServicePaymentStatusTableProps> = ({ servicePaymentStatus }) => {
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
    const paymentData = [...servicePaymentStatus];
    
    // If less than 5 rows, add empty rows to maintain height
    if (paymentData.length < 5) {
      const emptyRowsNeeded = 5 - paymentData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        paymentData.push({} as Status2);
      }
    }
    
    return paymentData;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Servis Ödeme Durumu</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Adı Soyadı" },
                  { title: "Yıllık Ücret" },
                  { title: "Ödenen" },
                  { title: "Kalan" },
                  { title: "Durum" },
                  { title: "Detay" },
                ]}
              >
                {prepareTableData().map((payment, index) => {
                  // Check if this is an empty row
                  const isEmpty = !payment.name;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={6}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`payment-${index}`}>
                      <td className="text-nowrap">{payment.name}</td>
                      <td className="text-nowrap">₺{payment.yearly_price}</td>
                      <td className="text-nowrap">₺{payment.paid}</td>
                      <td className="text-nowrap">₺{payment.remainder}</td>
                      <td className="text-nowrap">{payment.status === "ödendi" ? "Bekleniyor" : payment.status}</td>
                      <td className="text-nowrap text-center">
                        <div
                          style={{
                            background: '#f0f5ff',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="bi bi-eye" style={{ color: '#6f7cff', fontSize: '16px' }}></i>
                        </div>
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

export default ServicePaymentStatusTable;