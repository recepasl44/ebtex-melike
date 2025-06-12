import { Card } from "react-bootstrap";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";
import { HomeworkStatusAnalysis } from "../type.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface HomeworkStatusAnalysisChartProps {
  homeworkStatusAnalysis: HomeworkStatusAnalysis;
}

const HomeworkStatusAnalysisChart: React.FC<HomeworkStatusAnalysisChartProps> = ({
  homeworkStatusAnalysis,
}) => {
    const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  // Dinamik veriler
  const homeworkData = {
    verilenOdev: homeworkStatusAnalysis.homework_given || 0,
    kontrolEdilen: homeworkStatusAnalysis.controlled || 0,
    yapilan: homeworkStatusAnalysis.done || 0
  };

  // Toplam
  const total = homeworkData.verilenOdev + homeworkData.kontrolEdilen + homeworkData.yapilan;

  // Her bir kategorinin yüzdesini hesapla
  const verilenYuzde = total ? Math.round((homeworkData.verilenOdev / total) * 100) : 0;
  const kontrolYuzde = total ? Math.round((homeworkData.kontrolEdilen / total) * 100) : 0;
  const yapilanYuzde = total ? Math.round((homeworkData.yapilan / total) * 100) : 0;

  // ApexCharts serisi (yüzdelik değerler)
  const chartSeries = [verilenYuzde, kontrolYuzde, yapilanYuzde];

  const chartLabels = ["Verilen Ödev", "Kontrol Edilen", "Yapılan"];

  const chartColors = [
    "var(--primary-color)",
    "rgba(227, 84, 212, 0.5)",
    "rgba(255, 93, 159, 0.4)"
  ];

    const chartOptions: any = {
      chart: {
        height: 286,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
              offsetY: 0,
              color: isDark ? '#fff' : undefined
            },
            value: {
              fontSize: '14px',
              offsetY: 5,
              color: isDark ? '#fff' : undefined
            },
            total: {
              show: true,
              label: 'Total',
              color: isDark ? '#fff' : undefined,
              formatter: function () {
                return total;
              }
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      },
      grid: {
        padding: {
          bottom: -10,
          top: -10
        }
      },
      colors: chartColors,
      labels: chartLabels
    };
  // ...existing code...

  return (
    <Card
      className="custom-card"
      style={{borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}
    >
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        style={{border: 'none', background: 'transparent', paddingTop: '20px'}}
      >
        <div
          className="card-title"
          style={{fontSize: '20px', fontWeight: '600', color: isDark ? '#fff' : '#000'}}
        >
          Ödev Durumu Analizi
        </div>
      </Card.Header>

      <Card.Body>
        <div className="d-flex flex-column align-items-center">
          <div style={{ width: "100%" }}>
            <Spkapexcharts
              chartOptions={chartOptions}
              chartSeries={chartSeries}
              type="radialBar"
              height={280}
            />
          </div>

          {/* Custom Legend */}
          <div className="d-flex justify-content-around w-100 mt-2" style={{ paddingBottom: '10px' }}>
            {chartLabels.map((label, index) => (
              <div key={index} className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-center mb-1">
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: chartColors[index],
                      marginRight: '6px'
                    }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: '500' }}>{label}</span>
                </div>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>
                    {Object.values(homeworkData)[index]}
                  </div>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HomeworkStatusAnalysisChart;
