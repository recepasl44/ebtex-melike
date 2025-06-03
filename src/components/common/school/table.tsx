import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../ReusableTable";
import { useSchoolTable } from "../../hooks/school/useSchoolList";
import { useSchoolDelete } from "../../hooks/school/useSchoolDelete";
import { ISchool } from "../../../types/schools/list";

export default function SchoolListPage() {
  const navigate = useNavigate();
  const { removeSchool } = useSchoolDelete();

  const {
    schoolData,
    loading,
    error,
    page,
    paginate,
    totalPages,
    totalItems,
    setPage,
    setPaginate,
    setSearchTerm,
    searchTerm,
  } = useSchoolTable({ enabled: true });

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "name",
        label: "Okul Adı",
        type: "text",
        value: searchTerm,
        onChange: (val: string) => {
          setSearchTerm(val);
          setPage(1);
        },
      },
    ],
    [searchTerm, setSearchTerm, setPage]
  );

  const columns: ColumnDefinition<ISchool>[] = useMemo(
    () => [
      { key: "id", label: "ID" },
      {
        key: "name",
        label: "Okul Adı",
        render: (row) => row.name || "-",
      },
      {
        key: "country",
        label: "Ülke",
        render: (row) => row.country?.name || "-",
      },
      {
        key: "city",
        label: "Şehir",
        render: (row) => row.city?.name || "-",
      },
      {
        key: "county",
        label: "İlçe",
        render: (row) => row.county?.name || "-",
      },
      {
        key: "type",
        label: "Okul Tipi",
        render: (row) => row.type?.name || "-",
      },

      {
        key: "actions",
        label: "İşlemler",
        style: { textAlign: "right", width: 120 },
        render: (row, openDeleteModal) => (
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              onClick={() => openDeleteModal?.(row)}
            >
              <i className="ti ti-trash" />
            </button>

            <button
              onClick={() => navigate(`/schoolcrud/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <ReusableTable<ISchool>
      pageTitle="Okul Listesi"
      columns={columns}
      data={schoolData}
      filters={filters}
      loading={loading}
      error={error}
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={paginate}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newSize) => {
        setPaginate(newSize);
        setPage(1);
      }}
      onAdd={() => navigate("/schoolcrud")}
      onDeleteRow={(row) => removeSchool(row.id)}
      tableMode="single"
      showExportButtons
      exportFileName="schools"
    />
  );
}
