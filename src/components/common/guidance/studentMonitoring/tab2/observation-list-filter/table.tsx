import { Button } from "react-bootstrap";
import { GuidanceObservation } from "../../../../../../types/guidanceObservations/list";
import { ColumnDefinition } from "../../../../ReusableTable";
import { useNavigate } from "react-router-dom";

export default function columnsObservation(_params?: any) {
  const navigate = useNavigate();

  const columnsObservation: ColumnDefinition<GuidanceObservation>[] = [
    {
      key: "first_name",
      label: "Öğrenci Adı",
      render: (row: any) =>
        row.student
          ? String((row.student as { first_name: string }).first_name)
          : "-",
    },
    {
      key: "level",
      label: "Sınıfı",
      render: (row: any) =>
        row.level ? String((row.level as { name: string }).name) : "null",
    },
    {
      key: "observation_date",
      label: "Tarih Aralığı",
      render: (row: any) =>
        row.observation_date ? row.observation_date : "null",
    },
    {
      key: "status",
      label: "Durum",
      render: (row: any) => {
        const status =
          row.status === 1 ? "Tamamlandı" : row.status === 0 ? "Eksik" : null;
        return status;
      },
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (row: GuidanceObservation) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="info-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() =>
                navigate(
                  `/guidance/studentMonitoring/tab2/observation-list-filter/crud/${row.id}`
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
    columnsObservation,
  };
}
