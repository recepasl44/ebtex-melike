import { useMemo, useState } from "react";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../ReusableTable";
import { useInvoiceStatistics } from "../../hooks/invoice/useInvoiceStatistics";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useSeasonsList } from "../../hooks/season/useSeasonsList";
import { formatCurrency, formatDate } from "../../../utils/formatters";

const MONTH_OPTIONS = [
  { value: 1, label: "Ocak" },
  { value: 2, label: "Şubat" },
  { value: 3, label: "Mart" },
  { value: 4, label: "Nisan" },
  { value: 5, label: "Mayıs" },
  { value: 6, label: "Haziran" },
  { value: 7, label: "Temmuz" },
  { value: 8, label: "Ağustos" },
  { value: 9, label: "Eylül" },
  { value: 10, label: "Ekim" },
  { value: 11, label: "Kasım" },
  { value: 12, label: "Aralık" },
];
import Pageheader from "../../page-header/pageheader";

export default function InvoiceStatisticsTable() {
  const [branch, setBranch] = useState("");
  const [season, setSeason] = useState("");
  const [months, setMonths] = useState<number[]>([]);

  const { branchData } = useBranchTable({ enabled: true });
  const { seasonsData } = useSeasonsList({ enabled: true });

  const { data, loading, error } = useInvoiceStatistics({
    enabled: true,
    branch_id: branch ? Number(branch) : undefined,
    season_id: season ? Number(season) : undefined,
    months: months.length ? months : undefined,
  });

  const [detailStudents, setDetailStudents] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [studentInvoices, setStudentInvoices] = useState<any | null>(null);
  const [showStudent, setShowStudent] = useState(false);

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "branch_id",
        label: "Şube",
        type: "select" as const,
        value: branch,
        options: (branchData || []).map((b) => ({ value: String(b.id), label: b.name })),
        onChange: (val: string) => setBranch(val),
      },
      {
        key: "season_id",
        label: "Sezon",
        type: "select" as const,
        value: season,
        options: (seasonsData || []).map((s) => ({ value: String(s.id), label: s.name })),
        onChange: (val: string) => setSeason(val),
      },
      {
        key: "months",
        label: "Ay",
        type: "multiselect" as const,
        value: months,
        options: MONTH_OPTIONS,
        onChange: (vals: number[]) => setMonths(vals),
      },
    ],
    [branch, season, months, branchData, seasonsData]
  );

  const columns: ColumnDefinition<any>[] = useMemo(
    () => [
      { key: "season_name", label: "Sezon", render: (r) => r.season_name },
      { key: "branch_name", label: "Şube", render: (r) => r.branch_name },
      { key: "month", label: "Tarih", render: (r) => r.month },
      {
        key: "total_amount",
        label: "Fatura Tutarı",
        render: (r) => formatCurrency(r.total_amount),
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <button
            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            onClick={() => {
              setDetailStudents(row.students || []);
              setShowDetail(true);
            }}
          >
            <i className="ti ti-eye" />
          </button>
        ),
      },
    ],
    []
  );

  const studentColumns: ColumnDefinition<any>[] = [
    { key: "branch_name", label: "Şube" },
    { key: "identification_no", label: "T.C. Kimlik No" },
    { key: "full_name", label: "Adı Soyadı" },
    { key: "level_name", label: "Sınıf Seviyesi" },
    { key: "class_name", label: "Sınıf/Şube" },
    { key: "parent_name", label: "Veli Adı Soyadı" },
    { key: "parent_relation", label: "Veli Yakınlığı" },
    { key: "parent_phone", label: "Veli Telefon" },
    {
      key: "total_amount",
      label: "Fatura Tutarı",
      render: (r) => formatCurrency(r.total_amount),
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (st) => (
        <button
          className="btn btn-icon btn-sm btn-info-light rounded-pill"
          onClick={() => {
            setStudentInvoices(st);
            setShowStudent(true);
          }}
        >
          <i className="ti ti-eye" />
        </button>
      ),
    },
  ];

  const renderInvoiceTable = (student: any) => {
    const services = Array.from(
      new Set((student.invoices || []).map((inv: any) => inv.service_name))
    );

    const columns: ColumnDefinition<any>[] = [
      { key: "date", label: "Tarih", render: (r) => formatDate(r.date) },
      ...services.map((s) => ({
        key: s,
        label: s,
        render: (r) => (r[s] ? formatCurrency(r[s]) : ""),
      })),
    ];

    const rows = (student.invoices || []).map((inv: any) => ({
      date: inv.date,
      [inv.service_name]: inv.amount,
    }));

    return (
      <ReusableTable
        data={rows}
        columns={columns}
        tableMode="single"
        showExportButtons={false}
        showModal={showStudent}
        onCloseModal={() => {
          setShowStudent(false);
          setStudentInvoices(null);
        }}
        modalTitle={student.full_name}
      />
    );
  };

  return (
    <>
      <Pageheader title="Fatura Yönetimi" currentpage="Fatura İstatistiği" />
      <ReusableTable
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        filters={filters}
        tableMode="single"
        showExportButtons
      />

      <ReusableTable
        data={detailStudents}
        columns={studentColumns}
        tableMode="single"
        showExportButtons={false}
        showModal={showDetail}
        onCloseModal={() => setShowDetail(false)}
        modalTitle="Fatura Detayı"
      />

      {studentInvoices && renderInvoiceTable(studentInvoices)}
    </>
  );
}
