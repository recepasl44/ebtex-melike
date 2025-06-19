import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import DebtTable, { Debt } from "./debt/table";
import PaymentTable, { Payment } from "./payment/table";
import DebtCrud, { DebtFormValues } from "./debt/crud";
import PaymentCrud, { PaymentFormValues } from "./payment/crud";

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

  const [showDebtModal, setShowDebtModal] = useState<{
    mode: "add" | "edit";
    data?: Debt;
  } | null>(null);

  const [showPaymentModal, setShowPaymentModal] = useState<{
    mode: "add" | "edit";
    data?: Payment;
  } | null>(null);

  const bankOptions = [
    { value: "1", label: "Banka 1" },
    { value: "2", label: "Banka 2" },
  ];

  const selectedPayments =
    (selectedDebtId && payments[selectedDebtId]) || [];

  const handleAddDebt = (values: DebtFormValues) => {
    const newDebt: Debt = {
      id: debts.length + 1,
      borc_tutari: Number(values.borc_tutari) || 0,
      askeri_borc: Number(values.askeri_borc) || 0,
      due_date: values.due_date || "",
      odenen: 0,
      kalan: Number(values.borc_tutari) || 0,
      kullanici: "Admin",
    };
    setDebts((d) => [...d, newDebt]);
    setShowDebtModal(null);
  };

  const handleEditDebt = (values: DebtFormValues) => {
    if (!showDebtModal?.data) return;
    setDebts((ds) =>
      ds.map((d) =>
        d.id === showDebtModal.data!.id
          ? {
              ...d,
              odenen: Number(values.tutar),
              kalan: d.borc_tutari - Number(values.tutar),
            }
          : d
      )
    );
    setShowDebtModal(null);
  };

  const handleAddPayment = (values: PaymentFormValues) => {
    if (!selectedDebtId) return;
    const newPayment: Payment = {
      id: (payments[selectedDebtId]?.length || 0) + 1,
      tip: values.tip,
      tutar: Number(values.tutar),
      turu: values.turu,
      banka: values.banka || "-",
      tarih: values.tarih,
      kullanici: "Admin",
    };
    setPayments((p) => ({
      ...p,
      [selectedDebtId]: [...(p[selectedDebtId] || []), newPayment],
    }));
    setShowPaymentModal(null);
  };

  const handleEditPayment = (values: PaymentFormValues) => {
    if (!selectedDebtId || !showPaymentModal?.data) return;
    setPayments((p) => ({
      ...p,
      [selectedDebtId]: (p[selectedDebtId] || []).map((pm) =>
        pm.id === showPaymentModal.data!.id
          ? {
              ...pm,
              tip: values.tip,
              tutar: Number(values.tutar),
              turu: values.turu,
              banka: values.banka || "-",
              tarih: values.tarih,
            }
          : pm
      ),
    }));
    setShowPaymentModal(null);
  };

  return (
    <>
    <Row>
      <Col md={6}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <Card.Title className="mb-0">Kredi Kartı Borçları</Card.Title>
            <Button
              size="sm"
              onClick={() =>
                setShowDebtModal({ mode: "add" })
              }
            >
              Ekle
            </Button>
          </Card.Header>
          <Card.Body>
            <DebtTable
              debts={debts}
              onSelectDebt={(d) => setSelectedDebtId(d.id)}
              onEditDebt={(d) =>
                setShowDebtModal({ mode: "edit", data: d })
              }
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
            <Button
              size="sm"
              onClick={() => setShowPaymentModal({ mode: "add" })}
            >
              Ekle
            </Button>
          </Card.Header>
          <Card.Body>
            <PaymentTable
              payments={selectedPayments}
              onEditPayment={(p) =>
                setShowPaymentModal({ mode: "edit", data: p })
              }
              onDeletePayment={(id) =>
                selectedDebtId &&
                setPayments((ps) => ({
                  ...ps,
                  [selectedDebtId]: (ps[selectedDebtId] || []).filter(
                    (pm) => pm.id !== id
                  ),
                }))
              }
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
      {showDebtModal && (
        <DebtCrud
          show={true}
          mode={showDebtModal.mode}
          initialValues={
            showDebtModal.mode === "add"
              ? { borc_tutari: 0, askeri_borc: 0, due_date: "" }
              : {
                  tip: "kismi",
                  tutar: showDebtModal.data?.odenen || 0,
                  turu: "nakit",
                  tarih: new Date().toISOString().split("T")[0],
                }
          }
          bankOptions={bankOptions}
          onSubmit={(vals, helpers) => {
            if (showDebtModal.mode === "add") {
              handleAddDebt(vals);
            } else {
              handleEditDebt(vals);
            }
            helpers.setSubmitting(false);
          }}
          onClose={() => setShowDebtModal(null)}
        />
      )}
      {showPaymentModal && (
        <PaymentCrud
          show={true}
          mode={showPaymentModal.mode}
          initialValues={
            showPaymentModal.mode === "add"
              ? {
                  tip: "kismi",
                  tutar: 0,
                  turu: "nakit",
                  tarih: new Date().toISOString().split("T")[0],
                }
              : {
                  ...showPaymentModal.data!,
                }
          }
          bankOptions={bankOptions}
          onSubmit={(vals, helpers) => {
            if (showPaymentModal.mode === "add") {
              handleAddPayment(vals);
            } else {
              handleEditPayment(vals);
            }
            helpers.setSubmitting(false);
          }}
          onClose={() => setShowPaymentModal(null)}
        />
      )}
    </>
  );
}
