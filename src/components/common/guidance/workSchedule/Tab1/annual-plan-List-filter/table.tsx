import { Button } from "react-bootstrap";
import { ColumnDefinition } from "../../../../ReusableTable";
import { ScheduledAssignmentData } from "../../../../../../types/scheduledAssignments/list";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function annualPlan(_params?: any) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const annualPlan: ColumnDefinition<ScheduledAssignmentData>[] = [
    {
      key: "start_date",
      label: "Baslangıç Tarihi",
      render: (row: ScheduledAssignmentData) => {
        const date = new Date(row.start_date);
        return <span>{date.toLocaleDateString("tr-TR")}</span>;
      },
    },
    {
      key: "end_date",
      label: "Bitiş Tarihi",
      render: (row: ScheduledAssignmentData) => {
        const date = new Date(row.end_date);
        return <span>{date.toLocaleDateString("tr-TR")}</span>;
      },
    },
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
          case 0:
            statusText = "Planlanan";
            color = "#21CE9E";
            break;
          case 3:
            statusText = "Eksik";
            color = "#FFC658";
            break;
          case 1:
            statusText = "Aktif";
            color = "#0EA5E8";
            break;
          default:
            statusText = "İptal Edildi";
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
      label: "İşlemler",
      render: (row, openDeleteModal) => {
        return (
          <div className="flex gap-2">
            {" "}
            <Button
              variant="info-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => {
                navigate(`/guidance/work-schedule/annual-plan-crud/${row.id}`);
              }}
            >
              <i className="ti ti-pencil"></i>
            </Button>{" "}
            <Button
              variant="danger-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("delete_id", row.id.toString());
                setSearchParams(newParams);
                if (openDeleteModal) {
                  openDeleteModal(row);
                }
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
