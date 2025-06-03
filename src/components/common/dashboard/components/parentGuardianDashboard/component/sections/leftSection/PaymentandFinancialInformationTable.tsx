import React from "react";
import { Card, Col } from "react-bootstrap";
import { PaymentAndFinancialInformation } from "../../../../../type";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface PaymentandFinancialInformationTableProps {
  paymentInformation: PaymentAndFinancialInformation;
}

const PaymentandFinancialInformationTable: React.FC<PaymentandFinancialInformationTableProps> = ({
  paymentInformation
}) => {
  const tableData = [
    ...paymentInformation.services.map((service) => ({
      type: service.type,
      total_amount: service.total_amount,
      paid_amount: service.paid_amount,
      remaining_debt: service.remaining_debt
    })),
    {
      type: "Toplamlar",
      total_amount: paymentInformation.summary.total_amount,
      paid_amount: paymentInformation.summary.paid_amount,
      remaining_debt: paymentInformation.summary.remaining_debt
    }
  ];

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between d-flex align-items-center">
          <Card.Title>Ödeme ve Finansal Bilgiler</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Hizmet Türü" },
                { title: "Toplam Tutar" },
                { title: "Ödenen Tutar" },
                { title: "Kalan Borç" },
              ]}
            >
              {tableData.map((item, index) => (
                <tr key={`payment-row-${index}`} className={index === tableData.length - 1 ? "fw-bold" : ""}>
                  <td>{item.type}</td>
                  <td>{item.total_amount}</td>
                  <td>{item.paid_amount}</td>
                  <td>{item.remaining_debt}</td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PaymentandFinancialInformationTable;