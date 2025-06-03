import { useNavigate } from "react-router-dom";
import { ScheduledAssignmentData } from "../../../../../../types/scheduledAssignments/list";
import { ColumnDefinition } from "../../../../ReusableTable";

const usePeriodDetailTable =
  (): ColumnDefinition<ScheduledAssignmentData>[] => {
    const navigate = useNavigate();

    return [
      {
        key: "name",
        label: "Periyot No",
        render: (row: ScheduledAssignmentData) => row.period?.name || "-",
      },
      {
        key: "start_date",
        label: "Periyot Tarihleri",
        render: (row: ScheduledAssignmentData) => {
          const start = row.start_date
            ? new Date(row.start_date).toLocaleDateString("tr-TR")
            : "-";
          const end = row.end_date
            ? new Date(row.end_date).toLocaleDateString("tr-TR")
            : "-";
          return start + "-" + end;
        },
      },
      {
        key: "status_number",
        label: "Planlama Durumu",
        render: (row: ScheduledAssignmentData) =>
          row.status_number === 0 ? "Planlanmadı" : "Planlandı",
      },
      {
        key: "status",
        label: "Durum",
        render: (row: ScheduledAssignmentData) => {
          switch (row.status) {
            case 0:
              return (
                <span
                  style={{
                    color: "#0EA5E8",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Aktif
                </span>
              );

            case 1:
              return (
                <span
                  style={{
                    color: "#339966",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Kontrol Edildi
                </span>
              );
            case 2:
              return (
                <span
                  style={{
                    color: "#FB4242",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Kontrol Edilmedi
                </span>
              );
            default:
              return "-";
          }
        },
      },
      {
        key: "remaining_time",
        label: "Kalan Süre",
        render: (row: ScheduledAssignmentData) => {
          return row.remaining_time || "-";
        },
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row: ScheduledAssignmentData) => {
          return (
            <div className="flex gap-2">
              <button
                className="btn btn-primary-light btn-sm rounded-pill"
                onClick={() => {
                  navigate(
                    `/guidance/work-schedule/Tab1/TabChild1/homework-process-list-filter?program_id=${
                      row.program_id
                    }&level_id=${row.level_id}&student_id=${
                      row.student.id || row.student_id
                    }`,
                    {
                      state: {
                        student_id: row.student.id,
                        program_id: row.program_id,
                        level_id: row.level_id,
                      },
                    }
                  );
                }}
              >
                <i className="ti ti-eye"></i>
              </button>
            </div>
          );
        },
      },
    ];
  };

export default usePeriodDetailTable;
