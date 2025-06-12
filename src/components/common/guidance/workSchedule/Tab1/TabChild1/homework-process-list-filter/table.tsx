import { ColumnDefinition } from "../../../../../ReusableTable";
import { ScheduledAssignmentData } from "../../../../../../../types/scheduledAssignments/list";
import { useNavigate } from "react-router-dom";

export default function periodHomework(_params?: any) {
  const navigate = useNavigate();
  const periodHomework: ColumnDefinition<ScheduledAssignmentData>[] = [
    {
      key: "lesson",
      label: "Ders",
      render: (row: ScheduledAssignmentData) => {
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
      key: "unit_id",
      label: "Ünite",
      render: (row: ScheduledAssignmentData) => {
        if (
          !row.lessons ||
          !Array.isArray(row.lessons) ||
          row.lessons.length === 0
        ) {
          return <span>-</span>;
        }
        const units = row.lessons[0]?.units;
        if (!units || !Array.isArray(units) || units.length === 0) {
          return <span>-</span>;
        }
        return <span>{units[0]?.unit?.name || "-"}</span>;
      },
    },
    {
      key: "topic_id",
      label: "Konu",
      render: (row: ScheduledAssignmentData) => {
        if (
          !row.lessons ||
          !Array.isArray(row.lessons) ||
          row.lessons.length === 0
        ) {
          return <span>-</span>;
        }
        const units = row.lessons[0]?.units;
        if (!units || !Array.isArray(units) || units.length === 0) {
          return <span>-</span>;
        }
        const topics = units[0]?.chapters?.[0]?.topics;
        if (!topics || !Array.isArray(topics) || topics.length === 0) {
          return <span>-</span>;
        }
        return <span>{topics[0]?.topic?.name || "-"}</span>;
      },
    },
    {
      key: "source_id",
      label: "Kaynaklar",
      render: (row: ScheduledAssignmentData) => {
        return <span>{row.source?.name || "-"}</span>;
      },
    },
    {
      key: "number_of_questions",
      label: "Soru Sayısı",
      render: (row: ScheduledAssignmentData) => {
        return <span>{row.number_of_questions || "-"}</span>;
      },
    },
    {
      key: "working_time",
      label: "Çalışma Süresi",
      render: (row: ScheduledAssignmentData) => {
        return <span>{row.working_time || "-"}</span>;
      },
    },
    {
      key: "status",
      label: "Durum",
      render: (row: ScheduledAssignmentData) => {
        let statusText = "";
        let color = "";

        switch (row.status) {
          case 2:
            statusText = "Planlanan";
            color = "#21CE9E";
            break;
          case 1:
            statusText = "Eksik";
            color = "#FFC658";
            break;
          case 0:
            statusText = "Aktif";
            color = "#0EA5E8";
            break;
          default:
            statusText = "İptal Edildi";
            color = "#000";
        }

        const style = {
          color,
          textAlign: "center" as const,
          fontFamily: "Inter",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
        };

        return <span style={style}>{statusText}</span>;
      },
    },
    {
      key: "",
      label: "İşlemler",
      render: (row) => {
        return (
          <button
            className="btn btn-icon btn-sm btn-secondary-light rounded-pill"
            onClick={() => {
              navigate(
                `/guidance/work-schedule/Tab1/TabChild1/homework-process-list-filter/crud/${row.id}`
              );
            }}
          >
            <i className="bi bi-check2-circle" />
          </button>
        );
      },
    },
  ];
  return {
    periodHomework,
  };
}
