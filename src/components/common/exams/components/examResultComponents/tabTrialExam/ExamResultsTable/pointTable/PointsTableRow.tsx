import {  Point } from "../../../../../../../../types/exam/quiz_table.ts";

interface PointTableRowProps {
  point: Point;
  quiz_type_id: number;
}
    const PointsTableRow = ({
      point,
      quiz_type_id,
    }: PointTableRowProps) => {
      const backgroundScore =
        quiz_type_id === 11 ? "#EFBE5F" : "#727BF8";
    
      const backgroundCellSucces =
        quiz_type_id === 1 || quiz_type_id === 2 || quiz_type_id === 3 || quiz_type_id === 4 || quiz_type_id === 5
          ? "#A76BF8"
          : quiz_type_id === 6
          ? "#FB4242"
          : quiz_type_id === 7
          ? "#FE7C58"
          : quiz_type_id === 8
          ? "#FE7C58"
          : quiz_type_id === 9 
          ? "#E354D4"
          : quiz_type_id === 10
          ? "#FF5D9F"
          : "#27AEEB";
    
      const backgroundCellParticipation =
        quiz_type_id === 1 || quiz_type_id === 2 || quiz_type_id === 3 || quiz_type_id === 4 || quiz_type_id === 5
          ? "#A76BF899"
          : quiz_type_id === 6
          ? "#FB424299"
          : quiz_type_id === 7
          ? "#FE7C5899"
          : quiz_type_id === 8
          ? "#FE7C5899"
          : quiz_type_id === 9
          ? "#E354D499"
          : quiz_type_id === 10
          ? "#FF5D9F99"
          : "#27AEEB99";
    
      const rowSpanValue = Array.isArray(point.point_type_name)
        ? point.point_type_name.length
        : 1;
    
  if (quiz_type_id === 6) {
    return (
      <>
        <tr>
          <td style={{ background: backgroundScore }}>{point.point_type_name}</td>
          <td style={{ background: backgroundScore }}>{point.point.toFixed(2)}</td>
          <td style={{ background: backgroundCellSucces }}>Başarı Sırası</td>
          <td style={{ background: backgroundCellSucces }}>
            {point.success_ordered?.class ?? "-"}
          </td>
          <td style={{ background: backgroundCellSucces }}>
            {point.success_ordered?.branch ?? "-"}
          </td>
          <td style={{ background: backgroundCellSucces }}>
            {point.success_ordered?.county ?? "-"}
          </td>
          <td style={{ background: backgroundCellSucces }}>
            {point.success_ordered?.city ?? "-"}
          </td>
          <td style={{ background: backgroundCellSucces }}>
            {point.success_ordered?.general ?? "-"}
          </td>
        </tr>
      </>
    );
  }
  return (
    <>
      <tr>
        <td rowSpan={2} style={{ background: backgroundScore }}>
          {quiz_type_id === 1 ? point.point_type_name : "Puan"}
        </td>
        <td rowSpan={2} style={{ background: backgroundScore }}>
          {point.point.toFixed(2)}
        </td>
        <td rowSpan={rowSpanValue} style={{ background: backgroundCellSucces }}>Başarı Sırası</td>
        <td style={{ background: backgroundCellSucces }}>{point.success_ordered?.class ?? "-"}</td>
        <td style={{ background: backgroundCellSucces }}>{point.success_ordered?.branch}</td>
        <td style={{ background: backgroundCellSucces }}>{point.success_ordered?.county}</td>
        <td style={{ background: backgroundCellSucces }}>{point.success_ordered?.city}</td>
        <td style={{ background: backgroundCellSucces }}>{point.success_ordered?.general}</td>
      </tr>
      <tr>
        <td style={{ background: backgroundCellParticipation }}>Katılım Sayısı</td>
        <td style={{ background: backgroundCellParticipation }}>{point.joined_number?.class}</td>
        <td style={{ background: backgroundCellParticipation }}>{point.joined_number?.branch}</td>
        <td style={{ background: backgroundCellParticipation }}>{point.joined_number?.county}</td>
        <td style={{ background: backgroundCellParticipation }}>{point.joined_number?.city}</td>
        <td style={{ background: backgroundCellParticipation }}>{point.joined_number?.general}</td>
      </tr>
    </>
  );
};

export default PointsTableRow
