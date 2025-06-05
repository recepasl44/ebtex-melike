import { Card, Col } from "react-bootstrap";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";
import { useState } from "react";

interface CourseSuccessAnalysisChartProps {
    courseSuccessAnalysis: ProgramData[];
}

interface ProgramData {
    program: string;
    lessons: {
        name: string;
        branch_avarage: number;
        top_avarage: number;
    }[];
}

const CourseSuccessAnalysisChart: React.FC<CourseSuccessAnalysisChartProps> = ({ courseSuccessAnalysis }) => {
    const [activeProgram, setActiveProgram] = useState<string>("ilkokul");

    const activeProgramData = courseSuccessAnalysis.find(program =>
        program.program.toLowerCase() === activeProgram.toLowerCase()) || courseSuccessAnalysis[0];

    const lessonNames = activeProgramData?.lessons.map(lesson => {
        const name = lesson.name.charAt(0).toUpperCase() + lesson.name.slice(1);
        return name.length > 3 ? name.substring(0, 3) : name;
    }) || [];

    const branchAverages = activeProgramData?.lessons.map(lesson => lesson.branch_avarage) || [];
    const topAverages = activeProgramData?.lessons.map(lesson => lesson.top_avarage) || [];

    const chartOptions = {
        chart: {
            height: 320,
            type: "line",
            toolbar: {
                show: false
            },
            events: {
                mounted: (chart: { windowResizeHandler: () => void; }) => {
                    chart.windowResizeHandler();
                }
            },
        },
        stroke: {
            width: [0, 4]
        },
        grid: {
            borderColor: "#f2f5f7",
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
            formatter: function(val: number) {
                return val
            }
        },
        colors: ["#6366F1", "#EC4899"],
        xaxis: {
            categories: lessonNames,
            labels: {
                style: {
                    colors: "#8c9097",
                    fontSize: "11px",
                    fontWeight: 600,
                },
            }
        },
        yaxis: {
            title: {
                text: "Yüzde Başarı",
                style: {
                    color: "#8c9097",
                }
            },
            labels: {
                style: {
                    colors: "#8c9097",
                    fontSize: "11px",
                    fontWeight: 600,
                },
            },
            max: 100
        },
        legend: {
            position: 'bottom',
            labels: {
                colors: "#8c9097"
            }
        }
    };

    const chartSeries = [
        {
            name: "Kurum Ortalaması",
            type: "column",
            data: branchAverages
        },
        {
            name: "Sınav Ortalaması",
            type: "line",
            data: topAverages
        }
    ];

    return (
        <Col xxl={12} >
            <Card className="custom-card">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title>Ders Başarı Analizi</Card.Title>
                    <div className="btn-group">
                        {courseSuccessAnalysis.map(program => (
                            <button
                                key={program.program}
                                className={`btn ${activeProgram === program.program.toLowerCase() ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setActiveProgram(program.program.toLowerCase())}
                            >
                                {program.program}
                            </button>
                        ))}
                    </div>
                </Card.Header>
                <Card.Body>
                    <div id="course-success-chart">
                        <Spkapexcharts
                            chartOptions={chartOptions}
                            chartSeries={chartSeries}
                            type="line"
                            width={"100%"}
                            height={390}
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CourseSuccessAnalysisChart;
