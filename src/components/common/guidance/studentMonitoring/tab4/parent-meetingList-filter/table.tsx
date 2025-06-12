import { Button } from "react-bootstrap";
import { ColumnDefinition } from "../../../../ReusableTable";
import { GuardianMeetingData } from "../../../../../../types/guardianMeeting/list";
import { useNavigate } from "react-router-dom";

export default function columnsParentMeeting(_params?: any) {
  const navigate = useNavigate();

  const columnsParentMeeting: ColumnDefinition<GuardianMeetingData>[] = [
    {
      key: "student.program.name",
      label: "Sınıfı",
      render: (row: GuardianMeetingData) => {
        return row.student?.program?.name || "-";
      },
    },
    {
      key: "date",
      label: "Tarih",
      render: (row: GuardianMeetingData) => {
        return row.meeting_date || "-";
      },
    },
    {
      key: "student_name",
      label: "Öğrencinin Adı",
      render: (row: GuardianMeetingData) => {
        return row.student
          ? `${row.student.first_name} ${row.student.last_name}`
          : "-";
      },
    },
    {
      key: "guardian_id",
      label: "Veli Adı Soyadı",
      render: (row: GuardianMeetingData) => {
        return row.guardian?.full_name || "-";
      },
    },
    {
      key: "notes",
      label: "Görüşme Türü",
      render: (row: GuardianMeetingData) => {
        return row.notes || "-";
      },
    },
    {
      key: "status",
      label: "Durum",
      render: (row: GuardianMeetingData) => {
        const isMet = row.meeting_type === 1;
        const style = {
          color: isMet ? "#21CE9E" : "#FB4242",
          textAlign: "center" as const,
          fontFamily: "Inter",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
        };

        return <span style={style}>{isMet ? "Görüşüldü" : "Gelmedi"}</span>;
      },
    },
    {
      key: "actions",
      label: "İşlem",
      render: (row) => {
        // Remove unused parameter
        return (
          <div className="flex gap-2">
            <Button
              variant="info-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() =>
                navigate(
                  `/guidance/studentMonitoring/tab4/parent-meetingList-filter/crud/${row.id}`
                )
              }
            >
              <i className="ti ti-pencil"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return {
    columnsParentMeeting,
  };
}
