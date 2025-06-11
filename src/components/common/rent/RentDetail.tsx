import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Modal, Tabs, Tab } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useRentShow } from "../../hooks/rent/useRentShow";
import { RentInstallment, RentPayment } from "../../../types/rent/detail";
import { formatCurrency, formatDate } from "../../../utils/formatters";

interface RentDetailModalProps {
  show: boolean;
  onClose: () => void;
}

interface AddInstallmentFormValues {
  due_date: string;
  amount: number;
}

interface AddPaymentFormValues {
  payment_no: number;
  payment_date: string;
  amount: number;
}

function AddInstallmentModal({
  show,
  onClose,
  onSave,
  currentTotal,
  maxTotal,
}: {
  show: boolean;
  onClose: () => void;
  onSave: (inst: RentInstallment) => void;
  currentTotal: number;
  maxTotal: number;
}) {
  const fields: FieldDefinition[] = [
    { name: "due_date", label: "Tarih", type: "date", required: true },
    { name: "amount", label: "Tutar", type: "number", required: true },
  ];

  const initialValues: AddInstallmentFormValues = {
    due_date: "",
    amount: 0,
  };

  function handleSubmit(values: AddInstallmentFormValues) {
    const newTotal = currentTotal + Number(values.amount);
    if (newTotal > maxTotal) {
      alert("Taksit toplamı kiranın toplamını geçemez");
      return;
    }

    onSave({
      installment_no: 0,
      due_date: values.due_date,
      amount: values.amount.toString(),
      remaining_amount: values.amount.toString(),
      payments: [],
    });
    onClose();
  }

  return (
    <ReusableModalForm<AddInstallmentFormValues>
      show={show}
      title="Taksit Ekle"
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel="Ekle"
      cancelButtonLabel="Vazgeç"
      onClose={onClose}
      mode="single"
    />
  );
}

function AddPaymentModal({
  show,
  onClose,
  onSave,
  nextNo,
}: {
  show: boolean;
  onClose: () => void;
  onSave: (p: RentPayment) => void;
  nextNo: number;
}) {
  const fields: FieldDefinition[] = [
    { name: "payment_no", label: "Sıra No", type: "number", required: true },
    { name: "payment_date", label: "Tarih", type: "date", required: true },
    { name: "amount", label: "Tutar", type: "number", required: true },
  ];

  const initialValues: AddPaymentFormValues = {
    payment_no: nextNo,
    payment_date: "",
    amount: 0,
  };

  function handleSubmit(values: AddPaymentFormValues) {
    onSave({
      payment_no: values.payment_no,
      payment_date: values.payment_date,
      amount: values.amount.toString(),
    });
    onClose();
  }

  return (
    <ReusableModalForm<AddPaymentFormValues>
      show={show}
      title="Ödeme Ekle"
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel="Ekle"
      cancelButtonLabel="Vazgeç"
      onClose={onClose}
      mode="single"
    />
  );
}

const RentDetailPage: React.FC<RentDetailModalProps> = ({ show, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const { rent, getRent } = useRentShow();

  const [installments, setInstallments] =
    useState<RentInstallment[]>([]);
  const [paymentsState, setPaymentsState] = useState<RentPayment[]>([]);
  const [activeTab, setActiveTab] = useState<string>("installments");
  const [showAddInstallment, setShowAddInstallment] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  function handleSaveInstallment(newInst: RentInstallment) {
    newInst.installment_no = installments.length + 1;
    setInstallments([...installments, newInst]);
  }

  function handleSavePayment(newPay: RentPayment) {
    setPaymentsState([...paymentsState, newPay]);
  }

  useEffect(() => {
    if (id) {
      getRent(Number(id));
    }
  }, [id, getRent]);

  useEffect(() => {
    if (rent) {
      setInstallments(rent.installments);
      const paymentList = rent.installments.flatMap((i) =>
        (i.payments ?? []).map((p) => ({ ...p }))
      );
      setPaymentsState(paymentList);
    }
  }, [rent]);

  const installmentColumns: ColumnDefinition<RentInstallment>[] = useMemo(
    () => [
      { key: "installment_no", label: "Sıra No" },
      {
        key: "due_date",
        label: "Tarih",
        render: (row) => formatDate(row.due_date),
      },
      {
        key: "amount",
        label: "Tutar",
        render: (row) => formatCurrency(row.amount),
      },
    ],
    []
  );

  const paymentColumns: ColumnDefinition<RentPayment>[] = useMemo(
    () => [
      { key: "payment_no", label: "Sıra No" },
      {
        key: "payment_date",
        label: "Tarih",
        render: (row) => formatDate(row.payment_date),
      },
      {
        key: "amount",
        label: "Tutar",
        render: (row) => formatCurrency(row.amount),
      },
    ],
    []
  );


  const totalPaid = useMemo(() => {
    return paymentsState.reduce((sum, p) => sum + Number(p.amount), 0);
  }, [paymentsState]);

  const remaining = useMemo(() => {
    if (!rent) return 0;
    return Number(rent.total_rent) - totalPaid;
  }, [rent, totalPaid]);

  const installmentsTotal = useMemo(
    () => installments.reduce((sum, i) => sum + Number(i.amount), 0),
    [installments]
  );

  const paymentsTotal = useMemo(
    () => paymentsState.reduce((sum, p) => sum + Number(p.amount), 0),
    [paymentsState]
  );

  if (!rent) {
    return null;
  }

  return (
    <>
      <Modal show={show} onHide={onClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Kira Ödemeleri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <p>Kira Toplamı: {formatCurrency(rent.total_rent)}</p>
            <p>Ödenen: {formatCurrency(totalPaid)}</p>
            <p>Kalan: {formatCurrency(remaining)}</p>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k || "installments")}
              className="mb-3"
            >
              <Tab eventKey="installments" title="Taksitler">
                <ReusableTable<RentInstallment>
                  columns={installmentColumns}
                  data={installments}
                  onAdd={() => setShowAddInstallment(true)}
                />
                <div className="mt-2 text-end fw-bold">
                  Toplam: {formatCurrency(installmentsTotal)}
                </div>
              </Tab>
              <Tab eventKey="payments" title="Ödemeler">
                <ReusableTable<RentPayment>
                  columns={paymentColumns}
                  data={paymentsState}
                  onAdd={() => setShowAddPayment(true)}
                />
                <div className="mt-2 text-end fw-bold">
                  Toplam: {formatCurrency(paymentsTotal)}
                </div>
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
      </Modal>

      <AddInstallmentModal
        show={showAddInstallment}
        onClose={() => setShowAddInstallment(false)}
        onSave={handleSaveInstallment}
        currentTotal={installmentsTotal}
        maxTotal={Number(rent.total_rent)}
      />
      <AddPaymentModal
        show={showAddPayment}
        onClose={() => setShowAddPayment(false)}
        onSave={handleSavePayment}
        nextNo={paymentsState.length + 1}
      />
    </>
  );
};

export default RentDetailPage;
