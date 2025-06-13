import ReusableTable, { ColumnDefinition } from "../../../ReusableTable";

export interface Payment {
  id: number;
  tip: string;
  tutar: number;
  turu: string;
  banka: string;
  tarih: string;
  kullanici: string;
}

interface PaymentTableProps {
  payments: Payment[];
  onEditPayment?: (payment: Payment) => void;
  onDeletePayment?: (id: number) => void;
  customFooter?: React.ReactNode;
}

export default function PaymentTable({
  payments,
  onEditPayment,
  onDeletePayment,
  customFooter,
}: PaymentTableProps) {
  const columns: ColumnDefinition<Payment>[] = [
    { key: "tip", label: "Ödeme Tipi" },
    { key: "tutar", label: "Ödenen Tutar" },
    { key: "turu", label: "Ödeme Türü" },
    { key: "banka", label: "Banka Hesabı" },
    { key: "tarih", label: "Tarih" },
    { key: "kullanici", label: "Kullanıcı" },
    {
      key: "actions",
      label: "İşlemler",
      render: (row) => (
        <>
          <button
            className="btn btn-icon btn-sm btn-info-light rounded-pill"
            onClick={() => onEditPayment && onEditPayment(row)}
          >
            <i className="ti ti-pencil" />
          </button>
          <button
            className="btn btn-icon btn-sm btn-danger-light rounded-pill ms-1"
            onClick={() => onDeletePayment && onDeletePayment(row.id)}
          >
            <i className="ti ti-trash" />
          </button>
        </>
      ),
    },
  ];

  return (
    <ReusableTable<Payment>
      tableMode="single"
      showExportButtons={false}
      data={payments}
      columns={columns}
      customFooter={customFooter}
    />
  );
}
