import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SupplierDetailModal from "../../supplier/supplierDetail/DetailModal";
import ReusableTable, {
  ColumnDefinition,
} from "../../ReusableTable";
import FilterGroup, {
  FilterDefinition,
} from "./component/organisms/SearchFilters";
import { useExpencesTable } from "../../../hooks/expences/main/useExpenseList";
import { IExpense } from "../../../../types/expences/main/list";

import { useExpenseDelete } from "../../../hooks/expences/main/useExpenseDelete";
import { useSeasonsList } from "../../../hooks/season/useSeasonsList";
import { useBranchTable } from "../../../hooks/branch/useBranchList";
import { useCategoriesList } from "../../../hooks/expences/expenseCategories/useCategoriesList";
import { useSuppliersTable } from "../../../hooks/suppliers/useSuppliersList";
import Pageheader from "../../../page-header/pageheader";


export default function ExpenseListPage() {
  const navigate = useNavigate();
  const { removeExpence } = useExpenseDelete();

  const [season, setSeason] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [supplierSearch, setSupplierSearch] = useState("");
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const [filtersEnabled, setFiltersEnabled] = useState({
    season: false,
    branch: false,
    category: false,
    supplier: false,
  });

  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);

  const { seasonsData } = useSeasonsList({ enabled: filtersEnabled.season, page: 1, paginate: 100 });
  const { branchData } = useBranchTable({ enabled: filtersEnabled.branch });
  const { categoriesData } = useCategoriesList({ enabled: filtersEnabled.category });
  const { suppliersData } = useSuppliersTable({ enabled: filtersEnabled.supplier, search: supplierSearch });

  const {
    expensesData,

    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
    setFilter,
  } = useExpencesTable({ enabled: true });

  useEffect(() => {
    setFilter({
      seasson_id: season || undefined,
      branch_id: branch || undefined,
      expense_category_id: category || undefined,
      supplier_id: supplierId || undefined,
      start_date: dateRange.startDate || undefined,
      end_date: dateRange.endDate || undefined,
    });
  }, [season, branch, category, supplierId, dateRange, setFilter]);

  const columns: ColumnDefinition<IExpense>[] = useMemo(
    () => [
      {
        key: "seasson_name",
        label: "Sezon",
        render: (row) => row.seasson_name || "-",
      },
      {
        key: "branch_name",
        label: "Şube",
        render: (row) => row.branch_name || "-",
      },
      {
        key: "supplier",
        label: "Tedarikçi",
        render: (row) => row.supplier?.name || "-",
      },
      {
        key: "invoice_date",
        label: "Tarih",
        render: (row) => row.invoice_date || "-",
      },
      {
        key: "invoice_amount",
        label: "Fatura Tutar",
        render: (row) =>
          row.invoice_amount
            ? `${parseFloat(row.invoice_amount).toLocaleString()} ₺`
            : "-",
      },
      {
        key: "amount",
        label: "Ödenen Tutar",
        render: (row) =>
          row.amount ? `${parseFloat(row.amount).toLocaleString()} ₺` : "-",
      },
      {
        key: "remaining_amount",
        label: "Kalan Tutar",
        render: (row) => {
          if (row.invoice_amount && row.amount) {
            const remain =
              parseFloat(row.invoice_amount) - parseFloat(row.amount);
            return `${remain.toLocaleString()} ₺`;
          }
          return "-";
        },
      },
      {
        key: "description",
        label: "Açıklama",
        render: (row) => row.description || "-",
      },
      {
        key: "invoice_serial_no",
        label: "Fatura/Fiş No",
        render: (row) => row.invoice_serial_no || "-",
      },
      {
        key: "invoice_date_detail",
        label: "Fatura/Fiş Tarihi",
        render: (row) => row.invoice_date || "-",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <button
              onClick={() => {
                setSelectedSupplier(row.supplier_id);
                setShowSupplierModal(true);
              }}
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            >
              <i className="ti ti-eye" />
            </button>
            <button
              onClick={() => navigate(`/expensecrud/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              onClick={() => openDeleteModal && openDeleteModal(row)}
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ],
    [navigate]
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "season",
        label: "Sezon",
        type: "select" as const,
        col: 1,
        value: season,
        options: (seasonsData || []).map((s) => ({
          value: String(s.id),
          label: s.name,
        })),
        onClick: () => setFiltersEnabled((p) => ({ ...p, season: true })),
        onChange: (val: string) => setSeason(val),
      },
      {
        key: "branch",
        label: "Şube",
        type: "select" as const,
        col: 1,
        value: branch,
        options: (branchData || []).map((b) => ({
          value: String(b.id),
          label: b.name,
        })),
        onClick: () => setFiltersEnabled((p) => ({ ...p, branch: true })),
        onChange: (val: string) => setBranch(val),
      },
      {
        key: "category",
        label: "Gider Kalemi",
        type: "select" as const,
        col: 1,
        value: category,
        options: (categoriesData || []).map((c) => ({
          value: String(c.id),
          label: c.name,
        })),
        onClick: () => setFiltersEnabled((p) => ({ ...p, category: true })),
        onChange: (val: string) => setCategory(val),
      },
      {
        key: "supplier_id",
        label: "Tedarikçi",
        type: "autocomplete" as const,
        col: 1,
        value: supplierId,
        options: (suppliersData || []).map((s) => ({
          value: String(s.id),
          label: s.name,
        })),
        onFocus: () => setFiltersEnabled((p) => ({ ...p, supplier: true })),
        onChange: (val: string) => {
          setSupplierId(val);
          setSupplierSearch(val);
        },
      },
      {
        key: "date_range",
        label: "Tarih Aralığı",
        type: "doubledate" as const,
        col: 1,
        value: dateRange,
        onChange: (dates: any) => {
          if (!dates) {
            setDateRange({ startDate: "", endDate: "" });
            return;
          }
          const { startDate, endDate } = dates;
          setDateRange({ startDate: startDate || "", endDate: endDate || "" });
        },
      },
    ],
    [
      season,
      branch,
      category,
      supplierId,
      supplierSearch,
      dateRange,
      seasonsData,
      branchData,
      categoriesData,
      suppliersData,
    ]
  );

  return (
    <div className="container-fluid mt-3">
      <Pageheader title="Giderler" currentpage="Gider Kayıtları" />
      <FilterGroup filters={filters} columnsPerRow={4} navigate={navigate} />

      <ReusableTable<IExpense>
        // pageTitle="Gider Listesi"
        onAdd={() => navigate("/expensecrud")}
        columns={columns}
        data={expensesData}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize: any) => {
          setPageSize(newSize);
          setPage(1);
        }}
        exportFileName="expences"
        showExportButtons={true}
        tableMode="single"
        onDeleteRow={(row) => {
          removeExpence(Number(row.id));
        }}
      />
      <SupplierDetailModal
        show={showSupplierModal}
        supplierId={selectedSupplier || undefined}
        onClose={() => setShowSupplierModal(false)}
      />
    </div>
  );
}
