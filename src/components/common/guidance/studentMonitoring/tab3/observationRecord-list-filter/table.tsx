import { Button } from "react-bootstrap";
import { ColumnDefinition } from "../../../../ReusableTable";
import { useNavigate } from "react-router-dom";
import { GuidanceObservation } from "../../../../../../types/guidanceObservations/list";
export default function columnsObservationRecord(_params?: any) {
  const navigate = useNavigate();

  // Define the columns for the observation record table
  const columnsObservationRecord: ColumnDefinition<GuidanceObservation>[] = [
    {
      key: "lesson",
      label: "Ders",
      render: (row: any) => {
        return row.lesson?.name || "-";
      },
    },
    {
      key: "observation_date",
      label: "Tarih",
      render: (row: any) => {
        return row.observation_date || "-";
      },
    },
    {
      key: "student",
      label: "Öğrenci",
      render: (row: any) => {
        if (row.student) {
          return `${row.student.first_name || ""} ${
            row.student.last_name || ""
          }`;
        }
        return "-";
      },
    },
    {
      key: "title",
      label: "Gözlem Baslığı",
      render: (row: any) => {
        return row.title || "-";
      },
    },
    {
      key: "description",
      label: "Gözlem Detayı",
      render: (row: any) => row.description || "-",
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
              onClick={() =>
                navigate(
                  `/guidance/studentMonitoring/tab3/observationRecord-list-filter/crud/${row.id}`
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
    columnsObservationRecord,
  };
}
