import { useEffect, useMemo, useState } from "react";
import { Modal, Tabs, Tab, Button, Card } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useRentShow } from "../../hooks/rent/useRentShow";
import { RentInstallment, RentPayment } from "../../../types/rent/detail";

interface RentDetailModalProps {
  show: boolean;
  rentId: number | null;
  onClose: () => void;
}

const RentDetailModal: React.FC<RentDetailModalProps> = ({ show, rentId, onClose }) => {
  const { rent, getRent } = useRentShow();
  const [installments, setInstallments] = useState<RentInstallment[]>([]);
  const [payments, setPayments] = useState<RentPayment[]>([]);
  const [showInstModal, setShowInstModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);

  useEffect(() => {
    if (show && rentId) {
      (async () => {
        const r = await getRent(rentId);
        if (r) {
          setInstallments(r.installments || []);
          const pays = r.installments.flatMap((i) => i.payments || []);
          setPayments(pays);
        }
      })();
    }
  }, [show, rentId, getRent]);

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

  const totalPaid = useMemo(() => {
    return payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  }, [payments]);

  const remaining = useMemo(() => {
    if (!rent) return 0;
    return Number(rent.total_rent) - totalPaid;
  }, [rent, totalPaid]);

  const addInstallment = (values: { due_date: string; amount: number }) => {
    const current = installments.reduce((s, i) => s + Number(i.amount), 0);
    if (rent && current + values.amount > Number(rent.total_rent)) {
      alert("Taksit toplamı kira toplamını geçemez");
      return;
    }
    const newItem: RentInstallment = {
      installment_no: installments.length + 1,
      due_date: values.due_date,
      amount: String(values.amount),
      remaining_amount: String(values.amount),
      payments: [],
    };
    setInstallments([...installments, newItem]);
    setShowInstModal(false);
  };

  const addPayment = (values: { payment_date: string; amount: number }) => {
    const newPayment: RentPayment = {
      payment_no: payments.length + 1,
      payment_date: values.payment_date,
      amount: String(values.amount),
    };
    setPayments([...payments, newPayment]);
    setShowPayModal(false);
  };

  const installmentFields: FieldDefinition[] = [
    { name: "due_date", label: "Tarih", type: "date", required: true },
    { name: "amount", label: "Tutar", type: "currency", required: true },
  ];

  const paymentFields: FieldDefinition[] = [
    { name: "payment_date", label: "Tarih", type: "date", required: true },
    { name: "amount", label: "Tutar", type: "currency", required: true },
  ];

  return (
    <>
      <Modal show={show} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Kira Detayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="installments" id="rent-detail-tabs" className="mb-3">
            <Tab eventKey="installments" title="Taksitler">
              <div className="mb-2 text-end">
                <Button size="sm" onClick={() => setShowInstModal(true)}>
                  Ekle
                </Button>
              </div>
              <ReusableTable
                columns={installmentColumns}
                data={installments}
                totalItems={installments.length}
              />
            </Tab>
            <Tab eventKey="payments" title="Ödemeler">
              <div className="mb-2 text-end">
                <Button size="sm" onClick={() => setShowPayModal(true)}>
                  Ekle
                </Button>
              </div>
              <ReusableTable
                columns={paymentColumns}
                data={payments}
                totalItems={payments.length}
              />
              <Card className="mt-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <span>Toplam Ödenen:</span>
                    <span>{totalPaid}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Kalan:</span>
                    <span>{remaining}</span>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>

      <ReusableModalForm
        show={showInstModal}
        title="Taksit Ekle"
        fields={installmentFields}
        initialValues={{ due_date: "", amount: 0 }}
        onSubmit={addInstallment}
        confirmButtonLabel="Ekle"
        cancelButtonLabel="Vazgeç"
        onClose={() => setShowInstModal(false)}
      />

      <ReusableModalForm
        show={showPayModal}
        title="Ödeme Ekle"
        fields={paymentFields}
        initialValues={{ payment_date: "", amount: 0 }}
        onSubmit={addPayment}
        confirmButtonLabel="Ekle"
        cancelButtonLabel="Vazgeç"
        onClose={() => setShowPayModal(false)}
      />
    </>
  );
};

export default RentDetailModal;
