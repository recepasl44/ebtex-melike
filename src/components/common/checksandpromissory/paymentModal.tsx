import { useMemo, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { PaymentRecord } from "../../../types/checksandpromissory/list";
import PaymentCrud from "./paymentCrud";

interface PaymentModalProps {
  show: boolean;
  payments: PaymentRecord[];
  onClose: () => void;
  onChange: (payments: PaymentRecord[]) => void;
}

export default function PaymentModal({ show, payments, onClose, onChange }: PaymentModalProps) {
  const [data, setData] = useState<PaymentRecord[]>(payments);
  const [showCrud, setShowCrud] = useState(false);
  const [editing, setEditing] = useState<PaymentRecord | null>(null);

  const columns: ColumnDefinition<PaymentRecord>[] = useMemo(
    () => [
      { key: "date", label: "Tarih" },
      { key: "amount_paid", label: "Ödenen Tutar" },
      { key: "payer", label: "Ödeme Yapan" },
      { key: "receipt_no", label: "Makbuz No" },
      { key: "user", label: "Kullanıcı" },
      { key: "description", label: "Açıklama" },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <button
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
              onClick={() => {
                setEditing(row);
                setShowCrud(true);
              }}
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              onClick={() => handleDelete(row.id)}
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ],
    []
  );

  const handleDelete = (id: number) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    const newData = data.filter((p) => p.id !== id);
    setData(newData);
    onChange(newData);
  };

  const handleSave = (payment: PaymentRecord) => {
    let newData = [] as PaymentRecord[];
    if (editing) {
      newData = data.map((p) => (p.id === payment.id ? payment : p));
    } else {
      newData = [...data, payment];
    }
    setData(newData);
    onChange(newData);
  };

  return (
    <>
      <Modal show={show} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Ödeme Kayıtları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReusableTable<PaymentRecord>
            tableMode="single"
            columns={columns}
            data={data}
            onAdd={() => {
              setEditing(null);
              setShowCrud(true);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
      {showCrud && (
        <PaymentCrud
          show={showCrud}
          onClose={() => setShowCrud(false)}
          onSave={handleSave}
          payment={editing || undefined}
        />
      )}
    </>
  );
}
