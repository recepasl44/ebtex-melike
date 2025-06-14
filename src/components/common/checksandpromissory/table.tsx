import { useMemo, useState } from "react";
import ReusableTable, { ColumnDefinition, FilterDefinition } from "../ReusableTable";
import { CheckRecord, PaymentRecord } from "../../../types/checksandpromissory/list";
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

  const [filterCheckType, setFilterCheckType] = useState("");
  const [filterOwner, setFilterOwner] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [filterCreditor, setFilterCreditor] = useState("");
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
      { key: "debtor", label: "Verecekli" },
      { key: "creditor", label: "Alacaklı" },
      { key: "creditor_phone", label: "Alacaklı Tel" },
      { key: "date", label: "Tarih" },
      { key: "recipient_bank", label: "Alıcı Banka" },
      { key: "payable_amount", label: "Ödenecek" },
      { key: "paid_amount", label: "Ödenen" },
      { key: "remaining_amount", label: "Kalan" },
      { key: "description", label: "Açıklama" },
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

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "check_type",
        label: "Çek Türü",
        type: "text",
        value: filterCheckType,
        onChange: setFilterCheckType,
      },
      {
        key: "owner",
        label: "Çek Sahibi",
        type: "text",
        value: filterOwner,
        onChange: setFilterOwner,
      },
      {
        key: "company",
        label: "Firma",
        type: "text",
        value: filterCompany,
        onChange: setFilterCompany,
      },
      {
        key: "creditor",
        label: "Alıcı",
        type: "text",
        value: filterCreditor,
        onChange: setFilterCreditor,
      },
    ],
    [filterCheckType, filterOwner, filterCompany, filterCreditor]
  );

  const filteredData = useMemo(() => {
    return data.filter((d) =>
      (!filterCheckType || d.check_type.toLowerCase().includes(filterCheckType.toLowerCase())) &&
      (!filterOwner || d.owner.toLowerCase().includes(filterOwner.toLowerCase())) &&
      (!filterCompany || d.company.toLowerCase().includes(filterCompany.toLowerCase())) &&
      (!filterCreditor || d.creditor.toLowerCase().includes(filterCreditor.toLowerCase()))
    );
  }, [data, filterCheckType, filterOwner, filterCompany, filterCreditor]);

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
        filters={filters}
        data={filteredData}
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
