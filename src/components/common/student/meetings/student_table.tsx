import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { Meeting } from "../../../../types/meetings/list";
import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useMeetingsList } from "../../../hooks/meetings/useList";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteMeeting } from "../../../../slices/meetings/delete/thunk";
import CalculateModal from "../calculate/CalculateModal";

export default function StudentMeetingTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentIdFromUrl = searchParams.get("student_id");

  const [showCalculateModal, setShowCalculateModal] = useState(false);

  const meetingParams = {
    enabled: true,
    page: page,
    pageSize: pageSize,
    student_id: studentIdFromUrl ? Number(studentIdFromUrl) : undefined,
  };

  const { meetingsData, loading, error, totalPages, totalItems } =
    useMeetingsList(meetingParams);

  useEffect(() => {
    setPage(1);
  }, [studentIdFromUrl]);

  const columns: ColumnDefinition<Meeting>[] = useMemo(
    () => [
      {
        key: "branche",
        label: "Şube",
        render: (row) =>
          row.branche ? String((row.branche as { name: string }).name) : "-",
      },

      {
        key: "season",
        label: "Sezon",
        render: (row) =>
          row.season ? String((row.season as { name: string }).name) : "-",
      },
      {
        key: "meeting_date",
        label: "Tarih",
        render: (row) => (row.meeting_date ? row.meeting_date : "-"),
      },
      {
        key: "type_id",
        label: "Görüşme Türü",
        render: (row) => (row.type_id ? String(row.type_id) : "-"),
      },
      {
        key: "id",
        label: "Kayıt No",
        render: (row) => (row.id ? row.id : "-"),
      },
      {
        key: "created_by",
        label: "Oluşturan",
        render: (row) => (row.created_by ? String(row.created_by) : "-"),
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <Button
              variant="info-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => navigate(`/meetingscrud/${row.id}`)}
            >
              <i className="ti ti-pencil"></i>
            </Button>{" "}
            <Button
              variant="danger-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => openDeleteModal && openDeleteModal(row)}
            >
              <i className="ti ti-trash"></i>
            </Button>{" "}
          </>
        ),
      },
    ],
    [navigate]
  );

  return (
    <>
      <ReusableTable<Meeting>
        columns={columns}
        data={meetingsData}
        loading={loading}
        error={error}
        showModal={false}
        showExportButtons={true}
        tableMode="single"
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        exportFileName="meetings"
        currentPage={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onAdd={() => navigate("/meetingscrud")}
        onDeleteRow={(row) => {
          deleteMeeting(row.id);
        }}
        button={() => setShowCalculateModal(true)}
        buttonText="Ücret Hesapla"
      />

      <CalculateModal
        show={showCalculateModal}
        onHide={() => setShowCalculateModal(false)}
        studentId={studentIdFromUrl ? Number(studentIdFromUrl) : null}
      />
    </>
  );
}
