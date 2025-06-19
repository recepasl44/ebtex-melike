import { Button } from "react-bootstrap";
import { ScheduledAssignmentData } from "../../../../../../types/scheduledAssignments/list";
import { ColumnDefinition } from "../../../../ReusableTable";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export function homeworkNumbersTable(_params?: any) {
  const navigate = useNavigate();

  const homeworkNumbers: ColumnDefinition<ScheduledAssignmentData>[] = [
    {
      key: "level_id",
      label: "Sınıf/Şube",
      render: (row: ScheduledAssignmentData) =>
        row.first_name || `Sınıf ${row.level_id}`,
    },
    {
      key: "",
      label: "Öğrenci Adı",
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
      key: "start_date",
      label: "Planlanan",
      render: (row: ScheduledAssignmentData) => {
        if (!row.start_date) return "-";
        return format(new Date(row.start_date), "dd.MM.yyyy");
      },
    },
    {
      key: "controlled",
      label: "Kontrol Edilen",
      render: (row: ScheduledAssignmentData) => {
        // API response içindeki status_count'tan status 1 (controlled) değerini buluyoruz
        const controlledItem = row.status_count?.find(
          (group) => group[0]?.status === 1
        );
        const count = controlledItem ? controlledItem[0]?.count : 0;
        return (
          <span
            style={{ color: "#21CE9E", fontWeight: 500, textAlign: "center" }}
          >
            {count}
          </span>
        );
      },
    },
    {
      key: "uncontrolled",
      label: "Kontrol Edilmeyen",
      render: (row: ScheduledAssignmentData) => {
        // API response içindeki status_count'tan status 0 (un_controlled) değerini buluyoruz
        const uncontrolledItem = row.status_count?.find(
          (group) => group[0]?.status === 0
        );
        const count = uncontrolledItem ? uncontrolledItem[0]?.count : 0;
        return (
          <span
            style={{ color: "#FB4242", fontWeight: 500, textAlign: "center" }}
          >
            {count}
          </span>
        );
      },
    },
    {
      key: "active",
      label: "Aktif",
      render: (row: ScheduledAssignmentData) => {
        // API response'da direkt aktif count, status_number alanında geliyor
        const count = row.status_number;
        return (
          <span
            style={{
              color: "#0EA5E8",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {count ?? 0}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (row: ScheduledAssignmentData) => {
        return (
          <div className="flex gap-2">
            {" "}
            <Button
              variant="primary-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => {
                navigate(
                  `/guidance/work-schedule/Tab1/TabChild3/detail_index/${row.id}?student_id=${row.student?.id}`
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

  return homeworkNumbers;
}
