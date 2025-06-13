import ReusableTable, { ColumnDefinition } from "../../ReusableTable";

export interface Debt {
  id: number;
  borc_tutari: number;
  askeri_borc: number;
  due_date: string;
  odenen: number;
  kalan: number;
  kullanici: string;
}

interface DebtTableProps {
  debts: Debt[];
  onSelectDebt: (debt: Debt) => void;
  onEditDebt?: (debt: Debt) => void;
  onDeleteDebt?: (id: number) => void;
}

export default function DebtTable({
  debts,
  onSelectDebt,
  onEditDebt,
  onDeleteDebt,
}: DebtTableProps) {
  const columns: ColumnDefinition<Debt>[] = [
    { key: "borc_tutari", label: "Borç Tutarı" },
    { key: "askeri_borc", label: "Askeri Borç Tutarı" },
    { key: "due_date", label: "Son Ödeme Tarihi" },
    { key: "odenen", label: "Ödenen Tutar" },
    { key: "kalan", label: "Kalan Tutar" },
    { key: "kullanici", label: "Kullanıcı" },
    {
      key: "actions",
      label: "İşlemler",
      render: (row) => (
        <>
          <button
            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            onClick={() => onSelectDebt(row)}
          >
            <i className="ti ti-check" />
          </button>
          <button
            className="btn btn-icon btn-sm btn-info-light rounded-pill ms-1"
            onClick={() => onEditDebt && onEditDebt(row)}
          >
            <i className="ti ti-pencil" />
          </button>
          <button
            className="btn btn-icon btn-sm btn-danger-light rounded-pill ms-1"
            onClick={() => onDeleteDebt && onDeleteDebt(row.id)}
          >
            <i className="ti ti-trash" />
          </button>
        </>
      ),
    },
  ];

  return (
    <ReusableTable<Debt>
      tableMode="single"
      showExportButtons={false}
      data={debts}
      columns={columns}
    />
  );
}
