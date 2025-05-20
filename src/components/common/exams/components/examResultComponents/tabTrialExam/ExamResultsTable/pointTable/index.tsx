import PointsTableRow from "./PointsTableRow.tsx";
import { GlobalJoinedNumber, Point } from "../../../../../../../../types/exam/quiz_table.ts";
import PointsTableHeader from "./PointTableHeader.tsx";

interface PointsTableProps {
  points: Point[];
  quiz_type_id: number;
  global_joined_number: GlobalJoinedNumber;
}

const PointsTable = ({ points, quiz_type_id, global_joined_number }: PointsTableProps) => {
  return (
      <div className="table-responsive">
    <table className="table table-bordered table-responsive text-center">
       <PointsTableHeader quiz_type_id={quiz_type_id} />
      <tbody>
        {points.map((point, index) => (
          <PointsTableRow
            key={index}
            point={point}
            quiz_type_id={quiz_type_id}
          />
        ))}

        {quiz_type_id === 6 && (
          <tr>
            <td colSpan={2}  style={{ background: "#FD8E8E" }}></td>
            <td  style={{ background: "#FD8E8E" }}>Katılım Sayısı</td>
            <td style={{ background: "#FD8E8E" }}>{global_joined_number.class}</td>
            <td style={{ background: "#FD8E8E" }}>{global_joined_number.branch}</td>
            <td style={{ background: "#FD8E8E" }}>{global_joined_number.county}</td>
            <td style={{ background: "#FD8E8E" }}>{global_joined_number.city}</td>
            <td style={{ background: "#FD8E8E" }}>{global_joined_number.general}</td>
          </tr>
        )}
      </tbody>
    </table>
      </div>
  );
};

export default PointsTable;
