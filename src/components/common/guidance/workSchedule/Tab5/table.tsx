import { Button } from "react-bootstrap";
import { ScheduledAssignmentData } from "../../../../../types/scheduledAssignments/list";
import { ColumnDefinition } from "../../../ReusableTable";
import { useNavigate } from "react-router-dom";

export default function planCalendarTable(_params?: any) {
  const navigate = useNavigate();

  const PlanCalendar: ColumnDefinition<ScheduledAssignmentData>[] = [
    {
      key: "start_date",
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
        if (!row.lessons || !Array.isArray(row.lessons)) {
          return <span>-</span>;
        }

        const lesson = row.lessons[0]?.lesson;
        return <span>{lesson?.name || "-"}</span>;
      },
    },
    {
      key: "unit_topic",
      label: "Ünite / Konu",
      render: (row: ScheduledAssignmentData) => {
        if (!row.lessons || !Array.isArray(row.lessons)) {
          return <span className="d-block text-center">-</span>;
        }

        const firstLesson = row.lessons[0];
        const firstUnit = firstLesson?.units?.[0];
        const firstChapter = firstUnit?.chapters?.[0];
        const firstTopic = firstChapter?.topics?.[0];

        // Display priority: Unit > Topic > Achievement
        if (firstUnit?.unit?.name) {
          return (
            <span className="d-block text-center">{firstUnit.unit.name}</span>
          );
        }

        if (firstTopic?.topic?.name) {
          return (
            <span className="d-block text-center">{firstTopic.topic.name}</span>
          );
        }

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
      render: (row) => {
        return (
          <div className="d-flex justify-content-center gap-2">
            {" "}
            <Button
              variant="info-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => {
                navigate(`/guidance/work-schedule/Tab5/crud/${row.id}`);
              }}
            >
              <i className="ti ti-pencil"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return PlanCalendar;
}
