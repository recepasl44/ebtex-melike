import { Card, Col } from "react-bootstrap";
import { ServiceUsageByDayOfTheWeek } from "../type.ts"
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";

interface ServiceUsagebyDayoftheWeekChartProps {
    serviceUsage: ServiceUsageByDayOfTheWeek[]
}

const ServiceUsagebyDayoftheWeekChart = ({ serviceUsage }: ServiceUsagebyDayoftheWeekChartProps) => {
  // Extract days for x-axis in Turkish
  const days = ["Pazartes", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

  // Map the days of week to the data properties
  const dayMapping = {
    0: "monday",
    1: "tuesday",
    2: "wednesday",
    3: "Thursday", // Note: inconsistent casing in the original data
    4: "Friday",   // Note: inconsistent casing in the original data
    5: "Saturday", // Note: inconsistent casing in the original data
    6: "sunday"
  };

  // Transform data for chart series
  const registeredStudentData = [];
  const gettingOnShuttleData = [];
  const absenteeStudentData = [];
  const earlyArrivalData = [];

  // Check if serviceUsage data exists and has at least one entry
  if (serviceUsage && serviceUsage.length > 0) {
    for (let i = 0; i < 7; i++) {
      const dayKey = dayMapping[i as keyof typeof dayMapping];
      const dayData = serviceUsage[0][dayKey as keyof typeof serviceUsage[0]];

      if (dayData) {
        registeredStudentData.push(dayData.registered_student);
        gettingOnShuttleData.push(dayData.getting_on_the_shuttle);
        absenteeStudentData.push(dayData.absentee_student);
        earlyArrivalData.push(dayData.early_arrival);
      } else {
        // Fallback if data is missing
        registeredStudentData.push(0);
        gettingOnShuttleData.push(0);
        absenteeStudentData.push(0);
        earlyArrivalData.push(0);
      }
    }
  }

  // Prepare chart series
  const chartSeries = [
    {
      name: "Kayıtlı Öğrenci",
      data: registeredStudentData
    },
    {
      name: "Servise Binen",
      data: gettingOnShuttleData
    },
    {
      name: "Devamsız Öğrenci",
      data: absenteeStudentData
    },
    {
      name: "Erken İnen",
      data: earlyArrivalData
    }
  ];

  // Chart options
  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      events: {
        mounted: (chart: { windowResizeHandler: () => void; }) => {
          chart.windowResizeHandler();
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [3, 3, 3, 3],
      curve: "straight",
      dashArray: [0, 5, 5, 0]
    },
    colors: ["#6366F1", "#10B981", "#F43F5E", "#8B5CF6"], // Blue, Green, Red, Purple to match the image
    title: {
      text: "Haftanın Günlerine Göre Servis Kullanımı",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "500",
        color: "#1f2937"
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      labels: {
        colors: "#8c9097"
      }
    },
    markers: {
      size: 4,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: days,
      labels: {
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 500,
        },
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 400,
        },
      }
    },
    tooltip: {
      shared: true
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3
    }
  };

  return (
    <Col xl={12}>
      <Card className="custom-card">
        <Card.Header>
        </Card.Header>
        <Card.Body>
          <div id="service-usage-by-day">
            <Spkapexcharts
              chartOptions={chartOptions}
              chartSeries={chartSeries}
              type="line"
              width={"100%"}
              height={350}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ServiceUsagebyDayoftheWeekChart;
