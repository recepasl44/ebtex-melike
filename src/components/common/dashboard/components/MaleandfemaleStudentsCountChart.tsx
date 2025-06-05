import { Card } from "react-bootstrap";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";
import { NumberOfMaleAndFemaleStudent } from "../type.ts";

interface MaleandfemaleStudentsCountChartProps {
  maleandfemaleStudentsCount: NumberOfMaleAndFemaleStudent[];
}

const MaleandfemaleStudentsCountChart: React.FC<
  MaleandfemaleStudentsCountChartProps
> = ({ maleandfemaleStudentsCount }) => {

  // Extract categories (school names) and data values for the chart
  const categories = maleandfemaleStudentsCount.map(item => item.name);
  const maleData = maleandfemaleStudentsCount.map(item => item.man);
  const femaleData = maleandfemaleStudentsCount.map(item => item.girl);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 320,
      stacked: false,
      toolbar: {
        show: false
      },
      events: {
        mounted: (chart: { windowResizeHandler: () => void }) => {
          chart.windowResizeHandler();
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
        dataLabels: {
          position: "top",
        },
      },
    },
    grid: {
      borderColor: "#f2f5f7",
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: ["#6366F1", "#EC4899"],
    dataLabels: {
      enabled: false, // Changed from true to false to remove labels on bars
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetY: 0,
      labels: {
        colors: "#8c9097"
      },
      markers: {
        radius: 8,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#8c9097",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#8c9097",
          fontSize: "12px",
          fontWeight: 500,
          cssClass: "apexcharts-yaxis-label",
        },
      },
    },
  };

  const chartSeries = [
    {
      name: "Erkek Öğrenci",
      data: maleData
    },
    {
      name: "Kız Öğrenci",
      data: femaleData
    }
  ];

  return (
    <div>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Kız ve Erkek Öğrenci Sayıları</Card.Title>
        </Card.Header>
        <Card.Body>
          <div id="male-female-students-chart">
            <Spkapexcharts
              chartOptions={chartOptions}
              chartSeries={chartSeries}
              type="bar"
              width={"100%"}
              height={320}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MaleandfemaleStudentsCountChart;
