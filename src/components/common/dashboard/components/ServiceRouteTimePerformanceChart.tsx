import { Card, Col } from "react-bootstrap";
import { ServiceRouteTimePerformance } from "../type.ts";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";

interface ServiceRouteTimePerformanceChartProps {
  serviceRoute: ServiceRouteTimePerformance[];
}

const ServiceRouteTimePerformanceChart: React.FC<ServiceRouteTimePerformanceChartProps> = ({
  serviceRoute
}) => {
  // 1) Saat bilgisini Date objesine çeviren yardımcı fonksiyon
  const parseTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
  };

  // 2) X-ekseni etiketlerini "saat:dakika" formatına dönüştüren fonksiyon
  const formatTimeLabel = (val: string | number) => {
    if (typeof val === 'number') {
      const date = new Date(val);
      const hh = date.getHours().toString().padStart(2, '0');
      const mm = date.getMinutes().toString().padStart(2, '0');
      return `${hh}:${mm}`;
    }
    return val;
  };

  // Seriler için veri hazırlama
  const chartSeries = [
    {
      name: "Planlanan Süre",
      data: serviceRoute.map((route) => ({
        x: route.plate_no,
        y: [
          parseTime(route.start_time),
          parseTime(route.end_time)
        ],
        fillColor: "#6366F1"
      }))
    },
    {
      name: "Gecikme Süresi",
      data: serviceRoute.map((route) => {
        const endTime = parseTime(route.end_time);
        const delayMinutes = parseInt(route.delay, 10);

        const delayStartTime = endTime; // Gecikme, planlanan sürenin bitiminde başlar

        const delayEndTime = new Date(endTime);
        delayEndTime.setMinutes(delayEndTime.getMinutes() + delayMinutes);

        return {
          x: route.plate_no,
          y: [delayStartTime, delayEndTime.getTime()],
          fillColor: "#EC4899"
        };
      })
    }
  ];

  // 3) ApexCharts için gerekli opsiyonlar
  const chartOptions = {
    chart: {
      height: 320,
      type: "rangeBar",
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
        // Çubukların bitişik görünmesi için
        rangeBarGroupRows: true,
        rangeBarOverlap: false
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      x: {
        formatter: formatTimeLabel
      },
      y: {
        formatter: function(val: any) {
          return formatTimeLabel(val);
        }
      }
    },
    grid: {
      borderColor: "#f2f5f7",
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: formatTimeLabel,
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600
        }
      }
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      markers: {
        fillColors: ["#6366F1", "#EC4899"]
      },
      labels: {
        colors: "#8c9097"
      }
    },
    colors: ["#6366F1", "#EC4899"]
  };

  return (
    <Col xl={12}>
      <Card className="custom-card">
        <Card.Header>
          <div className="card-title">Servis Güzergahı Süre Performansı</div>
        </Card.Header>
        <Card.Body>
          <div id="service-route-time-performance">
            <Spkapexcharts
              chartOptions={chartOptions}
              chartSeries={chartSeries}
              type="rangeBar"
              width="100%"
              height={320}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ServiceRouteTimePerformanceChart;
