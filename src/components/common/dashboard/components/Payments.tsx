import { Card, Col } from "react-bootstrap"
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx"
import { Supplier } from "../type.ts"

interface SupplierPayment {
  supplierPayments: Supplier[]
}

const Payments: React.FC<SupplierPayment> = ({ supplierPayments }) => {
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
    const paymentData = [...supplierPayments];
    
    // If less than 5 rows, add empty rows to maintain height
    if (paymentData.length < 5) {
      const emptyRowsNeeded = 5 - paymentData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        paymentData.push({} as Supplier);
      }
    }
    
    return paymentData;
  };

  return (
    <Col>
      {/* Ödemeler Tablosu */}
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Ödemeler</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Kişi / Firma" },
                  { title: "Vade" },
                  { title: "Ödeme Şekli" },
                  { title: "Tutar" },
                  { title: "Durum" },
                ]}
              >
                {prepareTableData().map((supplier, index) => {
                  // Check if this is an empty row
                  const isEmpty = !supplier.name;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={5}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`supplier-${index}`}>
                      <td
                        className="text-truncate"
                        style={{ maxWidth: "100px" }}
                        title={supplier.name}
                      >
                        {supplier.name}
                      </td>
                      <td className="text-nowrap">{supplier.expiry}</td>
                      <td className="text-nowrap">
                        {supplier.payment_method === "bank"
                          ? "Banka"
                          : supplier.payment_method}
                      </td>
                      <td className="text-nowrap">₺{supplier.total}</td>
                      <td className="text-nowrap">
                        <span
                          className={`text-nowrap text-${
                            supplier.status === "ödendi"
                              ? "success"
                              : supplier.status === "ödenmedi"
                              ? "danger"
                              : "primary"
                          }`}
                        >
                          {supplier.status && (
                            supplier.status.charAt(0).toUpperCase() +
                            supplier.status.slice(1)
                          )}
                        </span>
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

export default Payments