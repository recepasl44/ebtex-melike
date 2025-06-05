import React from "react";
import {Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../store";

interface LessonResult {
    lesson: string;
    lesson_results: {
        question: string;
        correct: number;
        wrong: number;
        empty: number;
        net: number;
        success_point: number;
        class_success_rate: number;
        branch_success_rate: number;
    };
}

interface Props {
    results: LessonResult[];
}

const CourseExamTable: React.FC<Props> = ({results}) => {
    const localVariable = useSelector((state: RootState) => state.ui);
    const isDark = localVariable.dataThemeMode === "dark";

    const baseTableCellStyle: React.CSSProperties = {
        color: isDark ? "#E2E8F0" : "#000",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "normal",
        padding: "8px",
        border: `1px solid ${isDark ? "#4B5563" : "#FFF"}`,
        boxSizing: "border-box",
    };

    const evenRowStyle: React.CSSProperties = {
        ...baseTableCellStyle,
        background: isDark ? "#1E293B" : "#FFF",
    };

    const oddRowStyle: React.CSSProperties = {
        ...baseTableCellStyle,
        background: isDark ? "#334155" : "#F9FAFC",
    };

    // Header style with fixed colors (no dark mode)
    const headerStyle: React.CSSProperties = {
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "normal",
        padding: "4px",
        height: "24px",
        border: `1px solid ${isDark ? "#4B5563" : "#FFF"}`,
        boxSizing: "border-box",
        backgroundColor: "#9e5cf71a",
        color: "#9e5cf7",
    };

    // Specific column widths as requested
    const columnWidths = [
        {width: "146px", height: "26px"}, // Dersler
        {width: "91px", height: "26px"},  // Soru
        {width: "89px", height: "24px"},  // Doğru
        {width: "89px", height: "24px"},  // Yanlış
        {width: "90px", height: "24px"},  // Boş
        {width: "89px", height: "24px"},  // Net
        {width: "118px", height: "24px"}, // Başarı Puanı
        {width: "118px", height: "24px"}, // Sınıf Başarı Puanı
        {width: "118px", height: "24px"}  // Kurum Başarı Puanı
    ];

    const headers = [
        "Dersler",
        "Soru",
        "Doğru",
        "Yanlış",
        "Boş",
        "Net",
        "Başarı Puanı",
        "Sınıf Başarı Puanı",
        "Kurum Başarı Puanı",
    ];

    return (
        <div className="table-responsive">
            <Table
                bordered
                className="text-center align-middle"
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    borderSpacing: 0,
                }}
            >
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            style={{
                                ...headerStyle,
                                width: columnWidths[index].width,
                                height: columnWidths[index].height,
                                flexShrink: 0
                            }}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {results.map((item, index) => (
                    <tr key={index}>
                        <td style={{
                            ...index % 2 === 0 ? evenRowStyle : oddRowStyle,
                            width: columnWidths[0].width,
                            height: columnWidths[0].height,
                            flexShrink: 0
                        }}>
                            {item.lesson}
                        </td>
                        <td style={{
                            ...index % 2 === 0 ? evenRowStyle : oddRowStyle,
                            width: columnWidths[1].width,
                            height: columnWidths[1].height,
                            flexShrink: 0
                        }}>
                            {item.lesson_results.question}
                        </td>
                        <td style={{
                            ...index % 2 === 0 ? evenRowStyle : oddRowStyle,
                            width: columnWidths[2].width,
                            height: columnWidths[2].height,
                            flexShrink: 0
                        }}>
                            {item.lesson_results.correct}
                        </td>
                        <td style={{
                            ...index % 2 === 0 ? evenRowStyle : oddRowStyle,
                            width: columnWidths[3].width,
                            height: columnWidths[3].height,
                            flexShrink: 0
                        }}>
                            {item.lesson_results.wrong}
                        </td>
                        <td style={{
                            ...index % 2 === 0 ? evenRowStyle : oddRowStyle,
                            width: columnWidths[4].width,
                            height: columnWidths[4].height,
                            flexShrink: 0
                        }}>
                            {item.lesson_results.empty}
                        </td>
                        <td style={{
                            ...index % 2 === 0 ? evenRowStyle : oddRowStyle,
                            width: columnWidths[5].width,
                            height: columnWidths[5].height,
                            flexShrink: 0
                        }}>
                            {item.lesson_results.net.toFixed(2)}
                        </td>
                        <td style={{
                            ...index % 2 === 0 ? evenRowStyle : oddRowStyle,
                            width: columnWidths[6].width,
                            height: columnWidths[6].height,
                            flexShrink: 0
                        }}>
                            {item.lesson_results.success_point}
                        </td>
                        <td style={{
                            ...index % 2 === 0 ? evenRowStyle : oddRowStyle,
                            width: columnWidths[7].width,
                            height: columnWidths[7].height,
                            flexShrink: 0
                        }}>
                            {item.lesson_results.class_success_rate}
                        </td>
                        <td style={{
                            ...index % 2 === 0 ? evenRowStyle : oddRowStyle,
                            width: columnWidths[8].width,
                            height: columnWidths[8].height,
                            flexShrink: 0
                        }}>
                            {item.lesson_results.branch_success_rate}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CourseExamTable;
