import React from "react";
import { Lesson } from "../../../../../../../../types/exam/quiz_table.ts";

type TotalRowProps = {
    lessons: Lesson[];
    showQuizColumn: boolean;
};

const cellStyle: React.CSSProperties = {
    width: "118px",
    height: "26px",
    textAlign: "center",
    verticalAlign: "middle",
    fontWeight: "600",
};

const totalLabelCellStyle: React.CSSProperties = {
    ...cellStyle,
    textAlign: "left",
};

const TotalRow: React.FC<TotalRowProps> = ({ lessons, showQuizColumn }) => {
    const totalQuestions = lessons.reduce((sum, l) => sum + l.questions, 0);
    const totalCorrect = lessons.reduce((sum, l) => sum + l.correct, 0);
    const totalWrong = lessons.reduce((sum, l) => sum + l.wrong, 0);
    const totalEmpty = lessons.reduce((sum, l) => sum + l.empty, 0);
    const totalNet = lessons.reduce((sum, l) => sum + l.net, 0);
    const totalClassAverageNet = lessons.reduce((sum, l) => sum + l.class_average_net, 0);
    const totalBranchNet = lessons.reduce((sum, l) => sum + l.branch_net, 0);
    const totalGeneralNet = lessons.reduce((sum, l) => sum + l.general_net, 0);

    return (
        <tr className="fw-bold border-none">
            {showQuizColumn && <td style={cellStyle}></td>}
            <td style={totalLabelCellStyle}>Toplamlar</td>
            <td style={cellStyle}>{totalQuestions}</td>
            <td style={cellStyle}>{totalCorrect}</td>
            <td style={cellStyle}>{totalWrong}</td>
            <td style={cellStyle}>{totalEmpty}</td>
            <td style={cellStyle}>{totalNet.toFixed(2)}</td>
            <td style={cellStyle}>{totalClassAverageNet.toFixed(2)}</td>
            <td style={cellStyle}>{totalBranchNet.toFixed(2)}</td>
            <td style={cellStyle}>{totalGeneralNet.toFixed(2)}</td>
        </tr>
    );
};

export default TotalRow;