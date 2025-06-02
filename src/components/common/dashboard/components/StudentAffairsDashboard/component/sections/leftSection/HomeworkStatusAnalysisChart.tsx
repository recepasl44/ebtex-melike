import { Card } from "react-bootstrap";
import Spkapexcharts from "../../../../../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts";
import { HomeworkStatusAnalysis } from "../../../../../type";

interface HomeworkStatusAnalysisChartProps {
  homeworkStatusAnalysis: HomeworkStatusAnalysis;
}

const HomeworkStatusAnalysisChart: React.FC<HomeworkStatusAnalysisChartProps> = ({
  homeworkStatusAnalysis,
}) => {
  // Chart values
  const values = [
    homeworkStatusAnalysis.homework_given,
    homeworkStatusAnalysis.controlled,
    homeworkStatusAnalysis.done,
  ];
  
  const percentage = Math.round((values[2] / values[0]) * 100);
  
  const series = values.map(value => Math.round((value / values[0]) * 100));
  
  const chartOptions = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: "36px",
            color: "#6259ca",
            offsetY: 10,
            formatter: function() {
              return percentage + "%";
            }
          }
        },
        track: {
          show: true,
          strokeWidth: '80%',
          margin: 5,
          dropShadow: {
            enabled: false
          }
        }
      }
    },
    colors: ["#5c67f7", "#e354d4", "#ff8e6f"],
    labels: ["Verilen Ödev", "Kontrol Edilen", "Yapılan"],
    legend: {
      show: false
    },
    stroke: {
      lineCap: "round",
      dashArray: [0, 4, 4] 
    },
  };

  return (
    <Card className="custom-card">
      <Card.Header>
        <div className="card-title">Ödev Durumu Analizi</div>
      </Card.Header>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div style={{ width: "40%" }}>
            <Spkapexcharts chartOptions={chartOptions} chartSeries={series} type="radialBar" height={280} />
          </div>
          <div className="d-flex flex-column ms-4" style={{ width: "60%" }}>
            <div className="d-flex align-items-center mb-3">
              <div
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: "#5c67f7",
                  marginRight: 10,
                }}
              ></div>
              <span style={{ fontWeight: 600, color: "#23272e" }}>Verilen Ödev:</span>
              <span style={{ marginLeft: 8, fontWeight: 500 }}>{values[0].toLocaleString("tr-TR")}</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: "#e354d4",
                  marginRight: 10,
                }}
              ></div>
              <span style={{ fontWeight: 600, color: "#23272e" }}>Kontrol Edilen:</span>
              <span style={{ marginLeft: 8, fontWeight: 500 }}>{values[1].toLocaleString("tr-TR")}</span>
            </div>
            <div className="d-flex align-items-center">
              <div
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: "#ff8e6f",
                  marginRight: 10,
                }}
              ></div>
              <span style={{ fontWeight: 600, color: "#23272e" }}>Yapılan:</span>
              <span style={{ marginLeft: 8, fontWeight: 500 }}>{values[2].toLocaleString("tr-TR")}</span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HomeworkStatusAnalysisChart;