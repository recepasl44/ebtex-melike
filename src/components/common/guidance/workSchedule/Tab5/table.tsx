import { Button } from "react-bootstrap";
import { ScheduledAssignmentData } from "../../../../../types/scheduledAssignments/list";
import { ColumnDefinition } from "../../../ReusableTable";

const PlanCalendar: ColumnDefinition<ScheduledAssignmentData>[] = [
  {
    key: "time_range",
    label: "Saat Aralığı",
    render: (row: ScheduledAssignmentData) => {
      const startDate = row.start_date
        ? new Date(row.start_date).toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      const endDate = row.end_date
        ? new Date(row.end_date).toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";

      return (
        <span className="d-block text-center">
          {startDate} {endDate ? `- ${endDate}` : ""}
        </span>
      );
    },
  },
  {
    key: "lesson",
    label: "Ders",
    render: (row: ScheduledAssignmentData) => {
      // Bir dizi olup olmadığını kontrol et
      if (
        !row.lessons ||
        !Array.isArray(row.lessons) ||
        row.lessons.length === 0
      ) {
        return <span>-</span>;
      }
      return <span>{row.lessons[0]?.lesson?.name || "-"}</span>;
    },
  },
  {
    key: "unit_topic",
    label: "Ünit / Konu",
    render: (row: ScheduledAssignmentData) => {
      if (row.unit?.name)
        return <span className="d-block text-center">{row.unit.name}</span>;
      if (row.topic?.name)
        return <span className="d-block text-center">{row.topic.name}</span>;
      return <span className="d-block text-center">-</span>;
    },
  },
  {
    key: "source",
    label: "Kaynaklar",
    render: (row: ScheduledAssignmentData) => {
      return (
        <span className="d-block text-center">{row.source?.name || "-"}</span>
      );
    },
  },
  {
    key: "status",
    label: "Durum",
    render: (row: ScheduledAssignmentData) => {
      // Status mapping
      const statusMap: { [key: number]: string } = {
        0: "Yapılmadı",
        1: "Yapıldı",
        2: "Eksik",
        // Add more status mappings as needed
      };
      return (
        <span className="d-block text-center">
          {statusMap[row.status] || `Durum ${row.status}`}
        </span>
      );
    },
  },
  {
    key: "actions",
    label: "İşlemler",
    render: () => {
      return (
        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="info-light"
            size="sm"
            className="btn-icon rounded-pill"
            onClick={() => {}}
          >
            <i className="ti ti-pencil"></i>
          </Button>
        </div>
      );
    },
  },
];

export default PlanCalendar;
