import { useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import ReusableTable, { ColumnDefinition, FilterDefinition } from "../ReusableTable";
import { IncomingCheckFormModal, IncomingCheckDetailModal, IncomingCheckCashModal, IncomingCheckPaymentModal } from "./crud";

export interface IncomingCheck {
  id: number;
  company: string;
  creditor: string;
  type: string;
  date: string;
  bank: string;
  amountDue: number;
  amountPaid: number;
  remaining: number;
  description: string;
  status: string;
}

const dummyData: IncomingCheck[] = [
  {
    id: 1,
    company: "ABC Ltd",
    creditor: "John Doe",
    type: "Çek",
    date: "2024-01-01",
    bank: "Ziraat",
    amountDue: 1000,
    amountPaid: 300,
    remaining: 700,
    description: "",
    status: "Beklemede",
  },
];

export default function IncomingChecksTable() {
  const [data, setData] = useState<IncomingCheck[]>(dummyData);
  const [selected, setSelected] = useState<IncomingCheck | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showCash, setShowCash] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [filterCompany, setFilterCompany] = useState("");
  const [filterCreditor, setFilterCreditor] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterBank, setFilterBank] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      (!filterCompany || row.company.includes(filterCompany)) &&
      (!filterCreditor || row.creditor.includes(filterCreditor)) &&
      (!filterType || row.type === filterType) &&
      (!filterBank || row.bank.includes(filterBank))
    );
  }, [data, filterCompany, filterCreditor, filterType, filterBank]);

  const columns: ColumnDefinition<IncomingCheck>[] = useMemo(
    () => [
      { key: "company", label: "Firma" },
      { key: "creditor", label: "Verecekli" },
      { key: "type", label: "Türü" },
      { key: "date", label: "Tarih" },
      { key: "bank", label: "Alıcı Banka" },
      {
        key: "amountDue",
        label: "Ödenecek",
        render: (row) => row.amountDue.toLocaleString(),
      },
      {
        key: "amountPaid",
        label: "Ödenen",
        render: (row) => row.amountPaid.toLocaleString(),
      },
      {
        key: "remaining",
        label: "Kalan",
        render: (row) => row.remaining.toLocaleString(),
      },
      { key: "description", label: "Açıklama" },
      { key: "status", label: "Durum" },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <Button size="sm" variant="primary" onClick={() => {setSelected(row);setShowDetail(true);}}>
              Detay
            </Button>{" "}
            <Button size="sm" variant="success" onClick={() => {setSelected(row);setShowCash(true);}}>
              Bozdur
            </Button>{" "}
            <Button size="sm" variant="warning" onClick={() => {setSelected(row);setShowPayment(true);}}>
              Ödeme
            </Button>{" "}
            <Button size="sm" variant="info" onClick={() => {setSelected(row);setShowForm(true);}}>
              Düzenle
            </Button>{" "}
            <Button size="sm" variant="danger" onClick={() => setData(d=>d.filter(x=>x.id!==row.id))}>
              Sil
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const filters: FilterDefinition[] = [
    { key: "company", label: "Firma", type: "text", value: filterCompany, onChange: setFilterCompany },
    { key: "creditor", label: "Verecekli", type: "text", value: filterCreditor, onChange: setFilterCreditor },
    {
      key: "type",
      label: "Türü",
      type: "select",
      value: filterType,
      onChange: setFilterType,
      options: [
        { value: "Çek", label: "Çek" },
        { value: "Senet", label: "Senet" },
      ],
    },
    { key: "bank", label: "Alıcı Banka", type: "text", value: filterBank, onChange: setFilterBank },
  ];

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<IncomingCheck>
        columns={columns}
        data={filteredData}
        filters={filters}
        onAdd={() => { setSelected(null); setShowForm(true); }}
        addButtonText="Ekle"
        tableMode="single"
      />

      {showForm && (
        <IncomingCheckFormModal
          show={showForm}
          onClose={() => setShowForm(false)}
          initialValues={selected || undefined}
          onSubmit={(val) => {
            if (selected) {
              setData((prev) => prev.map((d) => (d.id === selected.id ? { ...val, id: selected.id } : d)));
            } else {
              setData((prev) => [...prev, { ...val, id: Date.now() }]);
            }
            setShowForm(false);
          }}
        />
      )}

      {showDetail && selected && (
        <IncomingCheckDetailModal check={selected} show={showDetail} onClose={() => setShowDetail(false)} />
      )}

      {showCash && selected && (
        <IncomingCheckCashModal show={showCash} onClose={() => setShowCash(false)} />
      )}

      {showPayment && selected && (
        <IncomingCheckPaymentModal show={showPayment} onClose={() => setShowPayment(false)} />
      )}
    </div>
  );
}
