import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { Meeting } from "../../../../types/meetings/list";
import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useMeetingsList } from "../../../hooks/meetings/useList";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteMeeting } from "../../../../slices/meetings/delete/thunk";
import CalculateModal from "../calculate/CalculateModal";
import Pageheader from "../../../page-header/pageheader";

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
        key: "season",
        label: "Sezon",
        render: (row) =>
          row.season ? String((row.season as { name: string }).name) : "-",
      },
      {
        key: "branche",
        label: "Şube",
        render: (row) =>
          row.branche ? String((row.branche as { name: string }).name) : "-",
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
        key: "meeting_note",
        label: "Görüşme Notu",
        render: (row) => row.meeting_note || "-",
      },
      {
        key: "meeting_price",
        label: "Ücret",
        render: (row) => (row.meeting_price ? String(row.meeting_price) : "-"),
      },
      {
        key: "created_by",
        label: "Kayıt Eden",
        render: (row) => (row.created_by ? String(row.created_by) : "-"),
      },
      {
        key: "meeting_by",
        label: "Görüşme Yetkilisi",
        render: (row) => (row.meeting_by ? String(row.meeting_by) : "-"),
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
    <div className="px-4">
      <Pageheader title="Ön Kayıt" currentpage="Görüşmeler" />
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
        deleteMessage={(row) =>
          `${(row.student as any)?.first_name ?? ""} ${(row.student as any)?.last_name ?? ""} adlı kullanıcının ${row.meeting_date} tarihli görüşme kaydını silmek istediğinize emin misiniz?`
        }
        deleteCancelButtonLabel="Vazgeç"
        deleteConfirmButtonLabel="Sil"
        button={() => setShowCalculateModal(true)}
        buttonText="Ücret Hesapla"
      />

      <CalculateModal
        show={showCalculateModal}
        onHide={() => setShowCalculateModal(false)}
        studentId={studentIdFromUrl ? Number(studentIdFromUrl) : null}
      />
    </div>
  );
}
