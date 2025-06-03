import { ScheduledAssignmentData } from "../../../../../types/scheduledAssignments/list";
import { ColumnDefinition } from "../../../ReusableTable";

const QuestionTime: ColumnDefinition<ScheduledAssignmentData>[] = [
  {
    key: "start_date",
    label: "Tarih",
    render: (row: ScheduledAssignmentData) => {
      return <span>{row.start_date}</span>;
    },
  },
  {
    key: "number_of_questions",
    label: "Soru Sayısı",
    render: (row: ScheduledAssignmentData) => {
      return <span>{row.number_of_questions}</span>;
    },
  },
  {
    key: "working_time",
    label: "Çalışma Süresi",
    render: (row: ScheduledAssignmentData) => {
      return (
        <div
          style={{
            height: "28px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>{row.working_time} saat</span>
        </div>
      );
    },
  },
];
export default QuestionTime;
