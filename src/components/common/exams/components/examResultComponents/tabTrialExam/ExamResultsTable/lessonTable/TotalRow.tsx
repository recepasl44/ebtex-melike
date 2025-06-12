import React from "react";
            import { useSelector } from "react-redux";
            import { Lesson } from "../../../../../../../../types/exam/quiz_table.ts";
            import { RootState } from "../../../../../../../../store";

            type TotalRowProps = {
                lessons: Lesson[];
                showQuizColumn: boolean;
                cellStyle?: React.CSSProperties;
            };

            const TotalRow: React.FC<TotalRowProps> = ({ lessons, showQuizColumn, cellStyle = {} }) => {
                // Redux Store'dan dark/light bilgisi
                const localVariable = useSelector((state: RootState) => state.ui);
                const isDark = localVariable.dataThemeMode === "dark";

                // Base cell style with theme-dependent properties
                const baseCellStyle: React.CSSProperties = {
                    width: "118px",
                    height: "26px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    padding: "8px",
                    border: `1px solid ${isDark ? "#374151" : "#E6EFF3"}`,
                    color: isDark ? "#E2E8F0" : "#000",
                    ...cellStyle,
                    fontWeight: 600,
                };

                // Lesson name cell maintains left alignment
                const totalLabelCellStyle: React.CSSProperties = {
                    ...baseCellStyle,
                    textAlign: "left",
                    width: "146px",
                };

                // Quiz name cell style
                const quizNameCellStyle: React.CSSProperties = {
                    ...baseCellStyle,
                    width: "80px",
                };

                const totalQuestions = lessons.reduce((sum, l) => sum + l.questions, 0);
                const totalCorrect = lessons.reduce((sum, l) => sum + l.correct, 0);
                const totalWrong = lessons.reduce((sum, l) => sum + l.wrong, 0);
                const totalEmpty = lessons.reduce((sum, l) => sum + l.empty, 0);
                const totalNet = lessons.reduce((sum, l) => sum + l.net, 0);
                const totalClassAverageNet = lessons.reduce((sum, l) => sum + l.class_average_net, 0);
                const totalBranchNet = lessons.reduce((sum, l) => sum + l.branch_net, 0);
                const totalGeneralNet = lessons.reduce((sum, l) => sum + l.general_net, 0);

                return (
                    <tr className="fw-bold">
                        {showQuizColumn && <td style={quizNameCellStyle}></td>}
                        <td style={totalLabelCellStyle}>Toplamlar</td>
                        <td style={{...baseCellStyle, width: "91px"}}>{totalQuestions}</td>
                        <td style={{...baseCellStyle, width: "90px"}}>{totalCorrect}</td>
                        <td style={{...baseCellStyle, width: "90px"}}>{totalWrong}</td>
                        <td style={{...baseCellStyle, width: "89px"}}>{totalEmpty}</td>
                        <td style={baseCellStyle}>{totalNet.toFixed(2)}</td>
                        <td style={baseCellStyle}>{totalClassAverageNet.toFixed(2)}</td>
                        <td style={baseCellStyle}>{totalBranchNet.toFixed(2)}</td>
                        <td style={baseCellStyle}>{totalGeneralNet.toFixed(2)}</td>
                    </tr>
                );
            };

            export default TotalRow;
