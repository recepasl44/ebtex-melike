import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
} from "../../../components/common/ReusableTable";
import { useCoursesTable } from "../../../components/hooks/course/useList";
import { data } from "../../../types/courses/list";
import { Button } from "react-bootstrap";

export default function test() {
  const navigate = useNavigate();

  const {
    coursesData,
    loading,
    error,

    page,
    pageSize,
    totalPages,
    totalItems,

    setPage,
    setPageSize,
  } = useCoursesTable({ enabled: true });

  const columns: ColumnDefinition<data>[] = useMemo(
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
        render: (row) => (row.level?.name ? row.level?.name : "-"),
      },
      {
        key: "created_by",
        label: "Oluşturan",
        render: (row) =>
          row.level?.program?.name
            ? `Kullanıcı #${row.level?.program?.name}`
            : "",
      },

      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/coursecrud/${row.id}`)}
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
        <Button variant="success" onClick={() => navigate("/coursecrud")}>
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
        />
      </div>

      <ReusableTable<data>
        columns={columns}
        data={coursesData}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        exportFileName="branches"
      />
    </div>
  );
}
