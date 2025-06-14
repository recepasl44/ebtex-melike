import { useMemo, useState } from "react";
import { Button, Card } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useListStudents } from "../../../hooks/student/useList";
import { IStudent } from "../../../../types/student/list";
import { formatDate } from "../../../../utils/formatters";
import StudentDetailModal from "../../payment_details";

export default function StudentInstallmentsTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [showModal, setShowModal] = useState(false);

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
            onClick={() => {
              setSelectedStudent(row);
              setShowModal(true);
            }}
          >
            <i className="ti ti-eye"></i>
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div className="container-fluid mt-3">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white border-bottom-0 pb-0">
          <h5 className="mb-0 fw-semibold">Öğrenci Taksitleri</h5>
        </Card.Header>
        <Card.Body>
          <ReusableTable<IStudent>
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
            exportFileName="student-installments"
          />
        </Card.Body>
      </Card>
      {selectedStudent && (
        <StudentDetailModal
          show={showModal}
          student={{
            id: selectedStudent.id,
            name: `${selectedStudent.first_name} ${selectedStudent.last_name}`,
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
