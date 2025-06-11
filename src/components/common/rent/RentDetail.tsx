import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Modal, Form, Button } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useRentShow } from "../../hooks/rent/useRentShow";
import { RentInstallment, RentPayment } from "../../../types/rent/detail";

interface RentDetailModalProps {
  show: boolean;
  onClose: () => void;
}

const RentDetailPage: React.FC<RentDetailModalProps> = ({ show, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const { rent, getRent } = useRentShow();

  const [installments, setInstallments] = useState<RentInstallment[]>([]);
  const [payments, setPayments] = useState<RentPayment[]>([]);

  const [showAddInstallment, setShowAddInstallment] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const [newInstallment, setNewInstallment] = useState({
    due_date: "",
    amount: "",
  });

  const [newPayment, setNewPayment] = useState({
    payment_no: 1,
    payment_date: "",
    amount: "",
  });

  const handleAddInstallment = () => {
    const totalAmount = installments.reduce(
      (sum, inst) => sum + Number(inst.amount),
      0
    );

    if (totalAmount + Number(newInstallment.amount) > Number(rent?.total_rent)) {
      alert("Taksitlerin toplamı kira toplamını aşamaz.");
      return;
    }

    const newItem: RentInstallment = {
      installment_no: installments.length + 1,
      due_date: newInstallment.due_date,
      amount: newInstallment.amount,
      remaining_amount: newInstallment.amount,
      payments: [],
    };

    setInstallments([...installments, newItem]);
    setNewInstallment({ due_date: "", amount: "" });
    setShowAddInstallment(false);
  };

  const handleAddPayment = () => {
    const newItem: RentPayment = {
      payment_no: Number(newPayment.payment_no),
      payment_date: newPayment.payment_date,
      amount: newPayment.amount,
    };

    setPayments([...payments, newItem]);
    setNewPayment({
      payment_no: payments.length + 2,
      payment_date: "",
      amount: "",
    });
    setShowAddPayment(false);
  };

  useEffect(() => {
    if (id) {
      getRent(Number(id));
    }
  }, [id, getRent]);

  useEffect(() => {
    if (rent) {
      setInstallments(rent.installments || []);
      setPayments(
        rent.installments.flatMap((i) => (i.payments ?? []).map((p) => ({ ...p })))
      );
    }
  }, [rent]);

  const installmentColumns: ColumnDefinition<RentInstallment>[] = useMemo(
    () => [
      { key: "installment_no", label: "Sıra No" },
      { key: "due_date", label: "Tarih" },
      { key: "amount", label: "Tutar" },
    ],
    []
  );

  const paymentColumns: ColumnDefinition<RentPayment>[] = useMemo(
    () => [
      { key: "payment_no", label: "Sıra No" },
      { key: "payment_date", label: "Tarih" },
      { key: "amount", label: "Tutar" },
    ],
    []
  );

  const totalPaid = useMemo(
    () => payments.reduce((sum, p) => sum + Number(p.amount), 0),
    [payments]
  );

  const remaining = useMemo(() => {
    if (!rent) return 0;
    return Number(rent.total_rent) - totalPaid;
  }, [rent, totalPaid]);

  if (!rent) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Kira Ödemeleri</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <p>Kira Toplamı: {rent.total_rent}</p>
          <p>Ödenen: {totalPaid}</p>
          <p>Kalan: {remaining}</p>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Card>
                <Card.Header as="h5">Taksitler</Card.Header>
                <Card.Body className="p-3">
                  <ReusableTable<RentInstallment>
                    columns={installmentColumns}
                    data={installments}
                    onAdd={() => setShowAddInstallment(true)}
                  />
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6 mb-3">
              <Card>
                <Card.Header as="h5">Ödemeler</Card.Header>
                <Card.Body className="p-3">
                  <ReusableTable<RentPayment>
                    columns={paymentColumns}
                    data={payments}
                    onAdd={() => setShowAddPayment(true)}
                  />
                  <div className="mt-2 text-end fw-bold">
                    Toplam: {totalPaid}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>

    {/* Installment Modal */}
    <Modal
      show={showAddInstallment}
      onHide={() => setShowAddInstallment(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Taksit Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tarih</Form.Label>
            <Form.Control
              type="date"
              value={newInstallment.due_date}
              onChange={(e) =>
                setNewInstallment({ ...newInstallment, due_date: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tutar</Form.Label>
            <Form.Control
              type="number"
              value={newInstallment.amount}
              onChange={(e) =>
                setNewInstallment({ ...newInstallment, amount: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAddInstallment(false)}>
          Vazgeç
        </Button>
        <Button variant="primary" onClick={handleAddInstallment}>
          Ekle
        </Button>
      </Modal.Footer>
    </Modal>

    {/* Payment Modal */}
    <Modal
      show={showAddPayment}
      onHide={() => setShowAddPayment(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Ödeme Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Sıra No</Form.Label>
            <Form.Control
              type="number"
              value={newPayment.payment_no}
              onChange={(e) =>
                setNewPayment({ ...newPayment, payment_no: Number(e.target.value) })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tarih</Form.Label>
            <Form.Control
              type="date"
              value={newPayment.payment_date}
              onChange={(e) =>
                setNewPayment({ ...newPayment, payment_date: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tutar</Form.Label>
            <Form.Control
              type="number"
              value={newPayment.amount}
              onChange={(e) =>
                setNewPayment({ ...newPayment, amount: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAddPayment(false)}>
          Vazgeç
        </Button>
        <Button variant="primary" onClick={handleAddPayment}>
          Ekle
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default RentDetailPage;
