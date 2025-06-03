import { Card } from "react-bootstrap";
import { PollTypeDistribution } from "../../../../../type";
import Spkapexcharts from "../../../../../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts";
import { useEffect, useState } from "react";

interface DistributionofPollingTypeProps {
    data: PollTypeDistribution;
}

const DistributionofPollingTypeChart: React.FC<DistributionofPollingTypeProps> = ({ data }) => {
    const [chartData, setChartData] = useState<number[]>([]);
    
    useEffect(() => {
        if (data) {
            setChartData([
                data.came,
                data.notcame,
                data.on_leave,
                data.reported,
                data.came_late
            ]);
        }
    }, [data]);

    const options = {
        chart: {
            height: 280,
            type: "donut",
            fontFamily: 'Poppins, sans-serif',
            events: {
                mounted: (chart: { windowResizeHandler: () => void; }) => {
                    chart.windowResizeHandler();
                }
            },
        },
        title: {
            text: "Yoklama Türü Dağılımı",
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: '500',
                fontFamily: 'Poppins, sans-serif'
            }
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#3498db", "#e74c3c", "#9b59b6", "#f1a06c", "#6559f2"],
        legend: {
            position: "bottom",
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            labels: {
                colors: undefined,
            },
            markers: {
                width: 12,
                height: 12,
                radius: 12,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0
            },
        },
        labels: ["Geldi", "Gelmedi", "İzinli", "Raporlu", "Geç Geldi"],
        stroke: {
            width: 0
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%'
                }
            }
        }
    }

    return (
        <Card className="custom-card" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="card-body">
                <div id="donut-chart">
                    <Spkapexcharts 
                        chartOptions={options} 
                        chartSeries={chartData} 
                        type="donut" 
                        width={"100%"} 
                        height={320} 
                    />
                </div>
            </div>
        </Card>
    )
}

export default DistributionofPollingTypeChart