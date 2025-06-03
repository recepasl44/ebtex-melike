import { Button } from "react-bootstrap";
import { ColumnDefinition } from "../../../../ReusableTable";
import { useNavigate } from "react-router-dom";
import { useGuidanceMeetingDelete } from "../../../../../hooks/guidanceMeeting/useDelete";
import { GuardianMeetingData } from "../../../../../../types/guardianMeeting/list";

// Create a component that uses hooks properly
const TableActions = () => {
  const navigate = useNavigate();
  const { deleteExistingGuidanceMeeting } = useGuidanceMeetingDelete();

  return {
    navigate,
    deleteExistingGuidanceMeeting,
  };
};

export default function interviewTable(_params?: any) {
  const { navigate, deleteExistingGuidanceMeeting } = TableActions();
  const interview: ColumnDefinition<GuardianMeetingData>[] = [
    {
      key: "description",
      label: "Öğrenci Adı",
      render: (row: GuardianMeetingData) => {
        const firstName = row.student?.first_name || "";
        const lastName = row.student?.last_name || "";
        const studentName =
          firstName + (firstName && lastName ? " " : "") + lastName;
        return (
          <span style={{ textAlign: "center" }}>{studentName || "-"}</span>
        );
      },
    },
    {
      key: "meeting_type",
      label: "Görüşme Türü",
      render: (row: GuardianMeetingData) => {
        return <span>{row.meeting_type || "-"}</span>;
      },
    },
    {
      key: "meeting_date",
      label: "Tarih",
      render: (row: GuardianMeetingData) => {
        // Format date part only (YYYY-MM-DD)
        return (
          <span>{row.meeting_date ? row.meeting_date.split(" ")[0] : "-"}</span>
        );
      },
    },
    {
      key: "time",
      label: "Saat",
      render: (row: GuardianMeetingData) => {
        // Extract time part only (HH:MM:SS)
        return (
          <span>{row.meeting_date ? row.meeting_date.split(" ")[1] : "-"}</span>
        );
      },
    },
    {
      key: "working_time",
      label: "Görüşme Süresi",
      render: (row: GuardianMeetingData) => {
        return <span>{row.meeting_date || "-"}</span>;
      },
    },
    {
      key: "status",
      label: "Durum",
      render: (row: GuardianMeetingData) => {
        const statusText = row.status === 0 ? "Beklemede" : "Tamamlandı";
        const statusClass = row.status === 0 ? "text-warning" : "text-success";
        return <span className={statusClass}>{statusText}</span>;
      },
    },
    {
      key: "details",
      label: "Görüşme Detayı",
      render: (row: GuardianMeetingData) => {
        return <span>{row.notes || "-"}</span>;
      },
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (row) => {
        return (
          <div className="flex gap-2">
            {" "}
            <Button
              variant="info-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => {
                navigate(
                  `/guidance/work-schedule/Tab1/TabChild2/crud/${row.id}`
                );
              }}
            >
              <i className="ti ti-pencil"></i>
            </Button>{" "}
            <Button
              variant="danger-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => {
                deleteExistingGuidanceMeeting(row.id);
              }}
            >
              <i className="ti ti-trash"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return {
    interview,
  };
}
