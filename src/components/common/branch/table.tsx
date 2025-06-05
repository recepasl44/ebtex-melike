import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
} from "../ReusableTable";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { Branch } from "../../../types/branch/list";
import { Button } from "react-bootstrap";

export default function BranchListPage() {
  const navigate = useNavigate();

  const {
    branchData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    /*setPageSize,
    searchTerm,
    setSearchTerm, */
  } = useBranchTable({enabled :true});

  const columns: ColumnDefinition<Branch>[] = useMemo(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "name",
        label: "Şube Adı",
        render: (row) => (row.name ? row.name : "-"),
      },
      {
        key: "type",
        label: "Tür",
        render: (row) => (row.type ? row.type : "-"),
      },
      {
        key: "created_by",
        label: "Oluşturan",
        render: (row) => (row.created_by ? `Kullanıcı #${row.created_by}` : ""),
      },

      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/branchcrud/${row.id}`)}
            >
              Güncelle
            </Button>{" "}
            <Button variant="danger" size="sm" onClick={() => {}}>
              Sil
            </Button>
          </>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Şube List</h4>
        <Button variant="success" onClick={() => navigate("/branchcrud")}>
          Ekle
        </Button>
      </div>

      <div className="mb-3 d-flex align-items-center gap-2">
        <label htmlFor="searchInput" className="form-label mb-0">
          Şube Adı:
        </label>
        <input
          type="text"
          id="searchInput"
          className="form-control"
          style={{ width: 200 }}
          /*
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }} */
        />
      </div>

      <ReusableTable<Branch>
        columns={columns}
        data={branchData}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        exportFileName="branches"
      />
    </div>
  );
}
