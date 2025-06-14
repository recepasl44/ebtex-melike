import { useMemo, useState } from "react";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { CheckRecord } from "../../../types/checksandpromissory/list";
import CheckCrud from "./crud";
import CheckDetail from "./detail";
import PaymentModal from "./paymentModal";

export default function ChecksAndPromissoryTable() {
  const [data, setData] = useState<CheckRecord[]>([
    {
      id: 1,
      check_type: "Çek",
      owner: "Ali Yılmaz",
      company: "ABC AŞ",
      debtor: "Mehmet",
      creditor: "Veli",
      creditor_phone: "05001112233",
      kind: "Senet",
      date: "2024-01-01",
      recipient_bank: "Banka 1",
      document_no: "DOC001",
      payable_amount: 1000,
      paid_amount: 200,
      remaining_amount: 800,
      status: "Beklemede",
      description: "Örnek kayıt",
      image: null,
      payments: [],
    },
  ]);
  const [showCrud, setShowCrud] = useState(false);
  const [editing, setEditing] = useState<CheckRecord | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailRecord, setDetailRecord] = useState<CheckRecord | null>(null);
  const [showPayments, setShowPayments] = useState(false);
  const [paymentRecord, setPaymentRecord] = useState<CheckRecord | null>(null);

  const columns: ColumnDefinition<CheckRecord>[] = useMemo(
    () => [
      { key: "check_type", label: "Çek Türü" },
      { key: "owner", label: "Çek Sahibi" },
      { key: "company", label: "Firma" },
      { key: "creditor", label: "Alacaklı" },
      { key: "date", label: "Tarih" },
      { key: "payable_amount", label: "Ödenecek Tutar" },
      { key: "paid_amount", label: "Ödenen Tutar" },
      { key: "remaining_amount", label: "Kalan Tutar" },
      { key: "status", label: "Durum" },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <button
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
              onClick={() => {
                setDetailRecord(row);
                setShowDetail(true);
              }}
            >
              <i className="ti ti-eye" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-warning-light rounded-pill"
              onClick={() => {
                setPaymentRecord(row);
                setShowPayments(true);
              }}
            >
              <i className="ti ti-currency-dollar" />
            </button>
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
    setData((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSave = (rec: CheckRecord) => {
    setData((prev) => {
      const exists = prev.find((d) => d.id === rec.id);
      if (exists) {
        return prev.map((d) => (d.id === rec.id ? rec : d));
      }
      return [...prev, rec];
    });
  };

  const handlePaymentChange = (payments: PaymentRecord[]) => {
    if (!paymentRecord) return;
    setData((prev) =>
      prev.map((d) => (d.id === paymentRecord.id ? { ...d, payments } : d))
    );
  };

  return (
    <div className="container mt-3">
      <ReusableTable<CheckRecord>
        pageTitle="Çek / Senet"
        tableMode="single"
        onAdd={() => {
          setEditing(null);
          setShowCrud(true);
        }}
        columns={columns}
        data={data}
      />
      {showCrud && (
        <CheckCrud
          show={showCrud}
          onClose={() => setShowCrud(false)}
          onSave={handleSave}
          record={editing || undefined}
        />
      )}
      {showDetail && (
        <CheckDetail
          show={showDetail}
          onClose={() => setShowDetail(false)}
          record={detailRecord}
        />
      )}
      {showPayments && paymentRecord && (
        <PaymentModal
          show={showPayments}
          payments={paymentRecord.payments}
          onClose={() => setShowPayments(false)}
          onChange={handlePaymentChange}
        />
      )}
    </div>
  );
}
