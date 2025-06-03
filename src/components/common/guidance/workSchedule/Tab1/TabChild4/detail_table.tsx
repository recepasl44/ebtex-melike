import { ScheduledAssignmentData } from "../../../../../../types/scheduledAssignments/list";
import { ColumnDefinition } from "../../../../ReusableTable";

const statusNumbersTable = (): ColumnDefinition<ScheduledAssignmentData>[] => {
  return [
    {
      key: "period_no",
      label: "Periyot No",
      render: (row: ScheduledAssignmentData) => (
        <div
          style={{
            height: "28px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {row.period?.period_no || "-"}
        </div>
      ),
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
  ];
};

export default statusNumbersTable;
