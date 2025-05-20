import { Card, Col } from "react-bootstrap";
import Spkapexcharts from "../../../../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";
import { QuizTableProps } from "../../../../../../../types/exam/quiz_table.ts";

const PerformanceChart: React.FC<QuizTableProps> = (props) => {
  const Overseries = [
    {
      name: "Öğrenci",
      type: "column",
      data: props.graphic_data.map((item) => item.total_students),
    },
    {
      name: "Ortalama",
      type: "area",
      data: props.graphic_data.map((item) => item.average_score),
    },
    {
      name: "Zirve",
      type: "line",
      data: props.graphic_data.map((item) => item.top_score),
    },
  ];

  const Overoptions: any = {
    chart: {
      type: "bar",
      height: 315,
      toolbar: { show: false },
      dropShadow: {
        enabled: true,
        top: 7,
        left: 0,
        blur: 1,
        color: ["transparent", "transparent", "#E354D4"],
        opacity: 0.05,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "18%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [0, 2, 2],
      curve: "smooth",
    },
    colors: ["#747BF8", "#FF8E6F", "#E354D4"],
    fill: {
      type: ["solid", "solid", "solid"],
      opacity: [1, 0.25, 1],
      colors: ["#747BF8", "rgba(227, 84, 212, 0.10)", "#E354D4"],
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3,
    },
    xaxis: {
      type: "category",
      categories: props.graphic_data.map((item) => item.lesson_name),
      axisBorder: {
        show: true,
        color: "rgba(119, 119, 142, 0.05)",
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "rgba(119, 119, 142, 0.05)",
        width: 6,
      },
      labels: {
        show: false,
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: "Başarı Yüzdesi",
        style: {
          color: "#adb5be",
          padding: "10px",
          fontSize: "14px",
          fontFamily: "poppins, sans-serif",
          fontWeight: 600,
        },
      },
      labels: {
        formatter: (val: number) => val.toFixed(0),
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600,
        },
      },
    },
    legend: {
      show: true,
      fontSize: "12px",
      position: "bottom",
      horizontalAlign: "center",
      fontWeight: 500,
      labels: {
        colors: "#9ba5b7",
      },
      markers: {
        width: 10,
        height: 10,
        shape: "square",
        strokeWidth: 0,
        radius: 0,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number) =>
          typeof val !== "undefined" ? val.toFixed(0) + "%" : val,
      },
    },
  };

  return (
    <Col md={12} xxl={12}>
      <Card
        className="custom-card"
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Card.Header className="justify-content-between">
          <Card.Title style={{ fontSize: "16px", fontWeight: "600" }}>
            Ders Başarı Analizi
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <div id="lesson-success-chart px-3">
            <Spkapexcharts
              chartOptions={Overoptions}
              chartSeries={Overseries}
              type="bar"
              width={"100%"}
              height={315}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PerformanceChart;
