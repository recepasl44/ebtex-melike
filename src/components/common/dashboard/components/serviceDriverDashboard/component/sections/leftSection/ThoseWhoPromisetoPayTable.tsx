import React, { useState } from "react";
import { Card, Col, ButtonGroup, Button } from "react-bootstrap";
import { ThoseWhoPromiseToPay } from "../../../../../type";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface ThoseWhoPromisetoPayTableProps {
  data: ThoseWhoPromiseToPay[];
}

const ThoseWhoPromisetoPayTable: React.FC<ThoseWhoPromisetoPayTableProps> = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState<"today" | "weekly" | "monthly">("today");

  const formatCurrency = (amount: string) => {
    return `₺${parseFloat(amount).toLocaleString('tr-TR')}`;
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "ödendi":
      case "tamamlandı":
        return "text-success";
      case "ödenmedi":
        return "text-danger";
      case "günü gelmedi":
        return "text-info";
      default:
        return "";
    }
  };

  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "tamamlandı":
        return "Ödendi";
      case "günü gelmedi":
        return "Günü Gelmedi";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Format description based on status
  const formatDescription = (status: string, description: string) => {
    if (status.toLowerCase() === "tamamlandı") {
      return "Tamamlandı.";
    } else if (status.toLowerCase() === "ödenmedi") {
      return "Hatırlatma gönderildi.";
    } else if (status.toLowerCase() === "günü gelmedi") {
      return "Ödeme tarihi bekleniyor.";
    } else {
      return description;
    }
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>Ödeme Vaadinde Bulunanlar</Card.Title>
          <ButtonGroup>
            <Button 
              variant={timeFilter === "today" ? "primary" : "outline-primary"} 
              onClick={() => setTimeFilter("today")}
            >
              Bugün
            </Button>
            <Button 
              variant={timeFilter === "weekly" ? "primary" : "outline-primary"} 
              onClick={() => setTimeFilter("weekly")}
            >
              Haftalık
            </Button>
            <Button 
              variant={timeFilter === "monthly" ? "primary" : "outline-primary"} 
              onClick={() => setTimeFilter("monthly")}
            >
              Aylık
            </Button>
          </ButtonGroup>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-nowrap mb-0"
              tBodyClass="table-group-divider"
              header={[
                { title: "Dönem" },
                { title: "Adı Soyadı" },
                { title: "Telefon Numarası" },
                { title: "Ödeme Tarihi" },
                { title: "Miktar" },
                { title: "Durum" },
                { title: "Açıklama" },
              ]}
            >
              {data.map((payment, index) => (
                <tr key={`payment-${index}`}>
                  <td>{payment.seasson}</td>
                  <td>{payment.name}</td>
                  <td>{payment.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}</td>
                  <td>{payment.payment_date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1.$2.$3')}</td>
                  <td>{formatCurrency(payment.amount)}</td>
                  <td className={getStatusClass(payment.status)}>
                    {formatStatus(payment.status)}
                  </td>
                  <td>{formatDescription(payment.status, payment.description)}</td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ThoseWhoPromisetoPayTable;