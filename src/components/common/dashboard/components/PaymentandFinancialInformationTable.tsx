import React from "react";
import { Card, Col } from "react-bootstrap";
import { PaymentAndFinancialInformation } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
interface PaymentandFinancialInformationTableProps {
  paymentInformation: PaymentAndFinancialInformation;
}
// Define type for the row data including optional properties
interface PaymentRowData {
  type: string;
  total_amount: string;
  paid_amount: string;
  remaining_debt: string;
  isEmpty?: boolean;
  isSummary?: boolean;
}
const PaymentandFinancialInformationTable: React.FC<
  PaymentandFinancialInformationTableProps
> = ({ paymentInformation }) => {
  const containerStyle = {
    height: "300px",
    maxHeight: "300px",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
  };
  const scrollContainerStyle = {
    overflowY: "auto" as const,
    flex: 1,
    height: "100%",
  };
  const formatCurrency = (value: string) => {
    return `₺${parseFloat(value).toLocaleString("tr-TR")}`;
  };
  const prepareTableData = (): PaymentRowData[] => {
    // Use the defined interface for rows
    const serviceRows: PaymentRowData[] = paymentInformation.services.map(
      (service) => ({
        type: service.type,
        total_amount: service.total_amount,
        paid_amount: service.paid_amount,
        remaining_debt: service.remaining_debt,
      })
    );
    // Add summary row
    const summaryRow: PaymentRowData = {
      type: "Toplamlar",
      total_amount: paymentInformation.summary.total_amount,
      paid_amount: paymentInformation.summary.paid_amount,
      remaining_debt: paymentInformation.summary.remaining_debt,
      isSummary: true,
    };
    // Calculate number of empty rows needed
    // We need at least 5 rows - including summary row
    const minNeededRows = 5;
    const currentRows = serviceRows.length;
    // If we have less than minNeededRows-1 service rows, add empty rows
    if (currentRows < minNeededRows - 1) {
      const emptyRowsNeeded = minNeededRows - 1 - currentRows;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Now TypeScript knows isEmpty is allowed
        serviceRows.push({
          type: "",
          total_amount: "",
          paid_amount: "",
          remaining_debt: "",
          isEmpty: true,
        });
      }
    }
    // Return combined data with summary row at the end
    return [...serviceRows, summaryRow];
  };
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between d-flex align-items-center">
          <Card.Title>Ödeme ve Finansal Bilgiler</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Hizmet Türü" },
                  { title: "Toplam Tutar" },
                  { title: "Ödenen Tutar" },
                  { title: "Kalan Borç" },
                ]}
              >
                {prepareTableData().map((item, index, array) => {
                  // Check if this is an empty row
                  if (item.isEmpty) {
                    return (
                      <tr key={`empty-${index}`} style={{ height: "48px" }}>
                        <td colSpan={4}>&nbsp;</td>
                      </tr>
                    );
                  }
                  // Check if this is the summary row (last row)
                  const isSummary = index === array.length - 1;
                  return (
                    <tr
                      key={`payment-row-${index}`}
                      className={isSummary ? "fw-bold" : ""}
                    >
                      <td className="text-nowrap">{item.type}</td>
                      <td className="text-nowrap">
                        {formatCurrency(item.total_amount)}
                      </td>
                      <td className="text-nowrap">
                        {formatCurrency(item.paid_amount)}
                      </td>
                      <td className="text-nowrap">
                        {formatCurrency(item.remaining_debt)}
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
export default PaymentandFinancialInformationTable;
