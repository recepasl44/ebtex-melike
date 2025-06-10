import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useListStudents } from "../../hooks/student/useList";
import { IStudent } from "../../../types/student/list";
import { formatDate } from "../../../utils/formatters";

export default function StudentInstallmentsTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, loading, error, totalPages, totalItems } = useListStudents({
    enabled: true,
    page,
    paginate: pageSize,
  });

  const columns: ColumnDefinition<IStudent>[] = useMemo(
    () => [
      {
        key: "season",
        label: "Sezon",
        render: (row) => row.season ? row.season.name : "-",
      },
      {
        key: "branch",
        label: "Şube Adı",
        render: (row) => row.branche ? row.branche.name : "-",
      },
      {
        key: "register_date",
        label: "Tarih",
        render: (row) => formatDate(row.register_date),
      },
      {
        key: "full_name",
        label: "Adı Soyadı",
        render: (row) => `${row.first_name} ${row.last_name}`,
      },
      {
        key: "program",
        label: "Okul Seviyesi",
        render: (row) => row.program ? row.program.name : "-",
      },
      {
        key: "level",
        label: "Sınıf Seviyesi",
        render: (row) => row.level ? row.level.name : "-",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <Button
            variant="primary-light"
            size="sm"
            className="btn-icon rounded-pill"
            onClick={() => navigate(`/studentpaymentdetails/${row.id}`)}
          >
            <i className="ti ti-eye"></i>
          </Button>
        ),
      },
    ],
    [navigate]
  );

  return (
    <ReusableTable<IStudent>
      pageTitle="Öğrenci Taksitleri"
      columns={columns}
      data={data}
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
      showExportButtons={true}
    />
  );
}
