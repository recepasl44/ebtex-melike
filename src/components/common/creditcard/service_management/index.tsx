import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import DebtTable, { Debt } from "./debt/table";
import PaymentTable, { Payment } from "./payment/table";

export default function CreditCardDetailTables() {
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: 1,
      borc_tutari: 1000,
      askeri_borc: 200,
      due_date: "2025-06-01",
      odenen: 300,
      kalan: 700,
      kullanici: "Admin",
    },
  ]);

  const [payments, setPayments] = useState<Record<number, Payment[]>>({
    1: [
      {
        id: 1,
        tip: "Kısmi Ödeme",
        tutar: 300,
        turu: "Nakit",
        banka: "-",
        tarih: "2024-01-01",
        kullanici: "Admin",
      },
    ],
  });

  const [selectedDebtId, setSelectedDebtId] = useState<number | null>(null);

  const selectedPayments =
    (selectedDebtId && payments[selectedDebtId]) || [];

  return (
    <Row>
      <Col md={6}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <Card.Title className="mb-0">Kredi Kartı Borçları</Card.Title>
            <Button size="sm" onClick={() => alert("add")}>Ekle</Button>
          </Card.Header>
          <Card.Body>
            <DebtTable
              debts={debts}
              onSelectDebt={(d) => setSelectedDebtId(d.id)}
              onEditDebt={() => alert("edit")}
              onDeleteDebt={(id) =>
                setDebts((ds) => ds.filter((item) => item.id !== id))
              }
            />
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <Card.Title className="mb-0">Ödemeler</Card.Title>
            <Button size="sm" onClick={() => alert("add")}>Ekle</Button>
          </Card.Header>
          <Card.Body>
            <PaymentTable
              payments={selectedPayments}
              onEditPayment={() => alert("edit")}
              onDeletePayment={() => alert("delete")}
              customFooter={
                selectedDebtId === null && (
                  <div className="text-center p-2">Borç seçiniz</div>
                )
              }
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
