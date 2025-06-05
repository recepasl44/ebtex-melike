import { Card, Col } from "react-bootstrap";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";
import { WageStatus } from "../type.ts";

interface WageStatusChartProps {
  wageStatus?: WageStatus; // Make the prop optional with ?
}

const WageStatusChart: React.FC<WageStatusChartProps> = ({ wageStatus }) => {
  // Add fallback values when wageStatus is undefined
  const paidAmount = parseInt(wageStatus?.paid || "0");
  const delayedAmount = parseInt(wageStatus?.delayed || "0");
  const remainingAmount = parseInt(wageStatus?.remaining || "0");

  const wageChartOptions = {
    chart: {
      height: 350,
      type: "pie",
      events: {
        mounted: (chart: { windowResizeHandler: () => void }) => {
          chart.windowResizeHandler();
        },
      },
    },
    colors: ["#5555FF", "#FF6699", "#FF8E6F"],
    labels: ["Ödenen", "Gecikmeli", "Kalan"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: function (/* val: number */ opts: any) {
        // Return the actual value instead of "Infinity"
        return wageChartSeries[opts.seriesIndex];
      },
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return value.toString();
        },
      },
    },
  };

  const wageChartSeries = [paidAmount, delayedAmount, remainingAmount];

  return (
    <Col xl={12}>
      <Card className="custom-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>Ücret Durumu</Card.Title>
          <div>
            <button className="btn btn-sm btn-primary me-2">Aylık</button>
            <button className="btn btn-sm btn-outline-primary">Yıllık</button>
          </div>
        </Card.Header>
        <Card.Body>
          <div id="pie-wage-status">
            <Spkapexcharts
              chartOptions={wageChartOptions}
              chartSeries={wageChartSeries}
              type="pie"
              width={"100%"}
              height={350}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default WageStatusChart;
