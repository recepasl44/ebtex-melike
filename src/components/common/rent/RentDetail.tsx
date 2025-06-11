import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Modal } from "react-bootstrap";
import ReusableModalForm from "../ReusableModalForm";
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

  interface InstallmentForm {
    due_date: string;
    amount: string;
  }

  interface PaymentForm {
    payment_no: number;
    payment_date: string;
    amount: string;
  }

  const [installmentInitial, setInstallmentInitial] = useState<InstallmentForm>({
    due_date: "",
    amount: "",
  });

  const [paymentInitial, setPaymentInitial] = useState<PaymentForm>({
    payment_no: 1,
    payment_date: "",
    amount: "",
  });

  const handleAddInstallment = (
    values: InstallmentForm,
    _helpers: any
  ) => {
    const totalAmount = installments.reduce(
      (sum, inst) => sum + Number(inst.amount),
      0
    );

    if (totalAmount + Number(values.amount) > Number(rent?.total_rent)) {
      alert("Taksitlerin toplamı kira toplamını aşamaz.");
      return;
    }

    const newItem: RentInstallment = {
      installment_no: installments.length + 1,
      due_date: values.due_date,
      amount: values.amount,
      remaining_amount: values.amount,
      payments: [],
    };

    setInstallments([...installments, newItem]);
    setInstallmentInitial({ due_date: "", amount: "" });
    setShowAddInstallment(false);
  };

  const handleAddPayment = (values: PaymentForm, _helpers: any) => {
    const newItem: RentPayment = {
      payment_no: Number(values.payment_no),
      payment_date: values.payment_date,
      amount: values.amount,
    };

    setPayments([...payments, newItem]);
    setPaymentInitial({
      payment_no: values.payment_no + 1,
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
    <ReusableModalForm<InstallmentForm>
      show={showAddInstallment}
      title="Taksit Ekle"
      fields={[
        { name: "due_date", label: "Tarih", type: "date", required: true },
        { name: "amount", label: "Tutar", type: "currency", required: true },
      ]}
      initialValues={installmentInitial}
      onSubmit={handleAddInstallment}
      confirmButtonLabel="Ekle"
      cancelButtonLabel="Vazgeç"
      onClose={() => setShowAddInstallment(false)}
      autoFocus
    />

    {/* Payment Modal */}
    <ReusableModalForm<PaymentForm>
      show={showAddPayment}
      title="Ödeme Ekle"
      fields={[
        { name: "payment_no", label: "Sıra No", type: "number", required: true },
        { name: "payment_date", label: "Tarih", type: "date", required: true },
        { name: "amount", label: "Tutar", type: "currency", required: true },
      ]}
      initialValues={paymentInitial}
      onSubmit={handleAddPayment}
      confirmButtonLabel="Ekle"
      cancelButtonLabel="Vazgeç"
      onClose={() => setShowAddPayment(false)}
      autoFocus
    />
    </>
  );
};

export default RentDetailPage;
