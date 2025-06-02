import { Button } from "react-bootstrap";
import { ScheduledAssignmentData } from "../../../../../../types/scheduledAssignments/list";
import { ColumnDefinition } from "../../../../ReusableTable";
import { useNavigate } from "react-router-dom";

export function statusNumbersTable(_params?: any) {
  const navigate = useNavigate();
  const statusNumbers: ColumnDefinition<ScheduledAssignmentData>[] = [
    {
      key: "student",
      label: "Öğrenciler",
      render: (row: ScheduledAssignmentData) => {
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
      key: "completed",
      label: "Yapıldı",
      render: (row: ScheduledAssignmentData) => (
        <span
          style={{ color: "#21CE9E", fontWeight: 500, textAlign: "center" }}
        >
          {row.controlled || 0}
        </span>
      ),
    },
    {
      key: "not_completed",
      label: "Yapılmadı",
      render: (row: ScheduledAssignmentData) => (
        <span
          style={{ color: "#FB4242", fontWeight: 500, textAlign: "center" }}
        >
          {row.un_controlled || 0}
        </span>
      ),
    },
    {
      key: "incomplete",
      label: "Eksik",
      render: (row: ScheduledAssignmentData) => (
        <span
          style={{ color: "#FFC658", fontWeight: 500, textAlign: "center" }}
        >
          {row.status == 0 ? "0" : "1"}
        </span>
      ),
    },
    {
      key: "absent",
      label: "Gelmedi",
      render: (row: ScheduledAssignmentData) => (
        <span
          style={{ color: "#9E5CF7", fontWeight: 500, textAlign: "center" }}
        >
          {row.absent || 0}
        </span>
      ),
    },
    {
      key: "unchecked",
      label: "Kontrol Edilmedi",
      render: (row: ScheduledAssignmentData) => (
        <span
          style={{ color: "#FB4242", fontWeight: 500, textAlign: "center" }}
        >
          {row.unchecked || 0}
        </span>
      ),
    },
    {
      key: "active",
      label: "Aktif",
      render: (row: ScheduledAssignmentData) => (
        <span
          style={{ color: "#0EA5E8", fontWeight: 500, textAlign: "center" }}
        >
          {row.status_number == 0 ? "Pasif" : "Aktif"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (row: ScheduledAssignmentData) => {
        return (
          <div className="flex gap-2 justify-content-center">
            <Button
              variant="primary-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => {
                navigate(
                  `/guidance/work-schedule/Tab1/TabChild4/detail_index/${row.id}?student_id=${row.student?.id}`
                );
              }}
            >
              <i className="ti ti-eye"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return statusNumbers;
}
