import { Button } from "react-bootstrap";
import { ColumnDefinition } from "../../../../ReusableTable";
import { ScheduledAssignmentData } from "../../../../../../types/scheduledAssignments/list";
import { useNavigate } from "react-router-dom";
import { useScheduledAssignmentDelete } from "../../../../../hooks/scheduledAssignments/useDelete";
export default function annualPlan(_params?: any) {
  const navigate = useNavigate();
  const { deleteExistingScheduledAssignment } = useScheduledAssignmentDelete();

  const annualPlan: ColumnDefinition<ScheduledAssignmentData>[] = [
    {
      key: "start_date",
      label: "Baslangıç Tarihi",
      render: (row: ScheduledAssignmentData) => {
        return <span>{row.start_date}</span>;
      },
    },
    {
      key: "end_date",
      label: "Bitiş Tarihi",
      render: (row: ScheduledAssignmentData) => {
        return <span>{row.end_date}</span>;
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
      label: "Ünite Konu",
      render: (row: ScheduledAssignmentData) => {
        return (
          <span>
            {row.unit?.name || "-"} / {row.topic?.name || "-"}
          </span>
        );
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
      key: "actions",
      label: "İşlem",
      render: (row) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="info-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => {
                navigate(`/guidance/work-schedule/annual-plan-crud/${row.id}`);
              }}
            >
              <i className="ti ti-pencil"></i>
            </Button>
            <Button
              variant="danger-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => {
                deleteExistingScheduledAssignment(row.id);
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
    annualPlan,
  };
}
