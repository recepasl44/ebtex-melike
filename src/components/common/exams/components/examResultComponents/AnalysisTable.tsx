import React from "react";
        import { Table } from "react-bootstrap";
        import { useSelector } from "react-redux";
        import { playBtn, editBtn } from "../../../../../assets/images/exam/index";
        import { RootState } from "../../../../../store";

        interface Props {
            activeTestIndex: number | null;
            data: {
                results: {
                    question_no: number;
                    achievement: string;
                    correct_answer: number;
                    example_answer: number;
                    solution: string;
                }[];
            }[];
            width?: string;
            height?: string;
        }

        const AnalysisTable: React.FC<Props> = ({
            activeTestIndex,
            data,
            width = "100%",
            height = "auto",
        }) => {
            const test = activeTestIndex !== null ? data[activeTestIndex] : null;

            // Redux Store'dan dark/light bilgisi
            const localVariable = useSelector((state: RootState) => state.ui);
            const isDark = localVariable.dataThemeMode === "dark";

            const baseCellStyle: React.CSSProperties = {
                height: "26px",
                padding: "0 10px",
                textAlign: "center",
                border: "0.5px solid #E6EFF3",
                fontSize: "12px",
                fontFamily: "Inter",
                fontWeight: 400,
                verticalAlign: "middle",
                color: isDark ? "#E2E8F0" : "#4B5563",
            };

            const leftAlignedCellStyle: React.CSSProperties = {
                ...baseCellStyle,
                textAlign: "left",
            };

            const headerCellStyle: React.CSSProperties = {
                ...baseCellStyle,
                color: "#9e5cf7",
                backgroundColor: "#9e5cf71a",
                fontSize: "11px",
                fontWeight: 600,
                border : `0.5px solid ${isDark ? "#4B5563" : "#fff"}`,
            };

            const headers = [
                { label: "Soru No", width: "60px" },
                { label: "Kazanım" },
                { label: "DC", width: "60px" },
                { label: "ÖC", width: "60px" },
                { label: "Çözüm", width: "60px" },
                { label: "Detay", width: "60px" },
            ];

            return (
                <div style={{ width, height, overflow: "auto" }}>
                    <Table
                        className="mb-0 table-sm"
                        style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            border: "0.5px solid #E6EFF3",
                        }}
                    >
                        <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    style={{
                                        ...headerCellStyle,
                                        width: header.width || "auto",
                                    }}
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        {test && (
                            <tbody>
                            {test.results.map((result, i) => {
                                // Dark mode için koyu tonlar, light mode için açık tonlar
                                const rowBg = isDark
                                    ? (i % 2 === 0 ? "#1E293B" : "#334155")
                                    : (i % 2 === 0 ? "#FFFFFF" : "#F9FAFC");

                                return (
                                    <tr key={i}>
                                        <td style={{ ...baseCellStyle, backgroundColor: rowBg }}>
                                            {result.question_no}.
                                        </td>
                                        <td style={{ ...leftAlignedCellStyle, backgroundColor: rowBg }}>
                                            {result.achievement}
                                        </td>
                                        <td style={{ ...baseCellStyle, backgroundColor: rowBg }}>
                                            {result.correct_answer}
                                        </td>
                                        <td
                                            style={{
                                                ...baseCellStyle,
                                                backgroundColor: rowBg,
                                                color: result.example_answer ? "#21CE9E" : "#FB4242",
                                            }}
                                        >
                                            {result.example_answer}
                                        </td>
                                        <td style={{ ...baseCellStyle, backgroundColor: rowBg }}>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img
                                                    src={playBtn}
                                                    alt="play"
                                                    style={{
                                                        cursor: "pointer",
                                                        width: "24px",
                                                        height: "24px",
                                                        padding: "8px",
                                                        backgroundColor: "#0EA5E833",
                                                        borderRadius: "50%",
                                                        transition: "transform 0.2s ease-in-out",
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                                    onClick={() => {
                                                        console.log(`Solution for question ${result.question_no}`);
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td style={{ ...baseCellStyle, backgroundColor: rowBg }}>
                                            <img
                                                src={editBtn}
                                                alt="edit"
                                                style={{
                                                    cursor: "pointer",
                                                    width: "28px",
                                                    height: "28px",
                                                    transition: "transform 0.2s ease-in-out",
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                                onClick={() => {
                                                    console.log(`Detail for question ${result.question_no}`);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        )}
                    </Table>
                </div>
            );
        };

        export default AnalysisTable;
