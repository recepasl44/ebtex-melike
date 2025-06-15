import React from "react";
import { Card } from "react-bootstrap";
import { TrialExamScoreDistribution } from "../type.ts";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";

interface TrialExamScoreDistributionProps {
  data: TrialExamScoreDistribution[] | any;
}

const TrialExamScoreDistributionChart: React.FC<TrialExamScoreDistributionProps> = ({ data = [] }) => {
  const categories = (data || []).map((exam: any, idx: number) => exam.name || `Quiz ${exam.quiz_id ?? idx+1}`);
  
  const hasDetailedFields = data.length && data[0].branch !== undefined;
  const examSeries = hasDetailedFields
    ? [
        {
          name: "Kurum",
          type: "column",
          data: data.map((exam: any) => exam.branch),
        },
        {
          name: "Genel",
          type: "line",
          data: data.map((exam: any) => exam.gneral),
        },
        {
          name: "Zirve",
          type: "line",
          data: data.map((exam: any) => exam.peak),
        },
      ]
    : [
        {
          name: "Ortalama",
          type: "line",
          data: data.map((exam: any) => Number(exam.avg) || 0),
        },
      ];

  const discreteMarkers = [];
  for (let seriesIndex = 1; seriesIndex <= 2; seriesIndex++) {
    for (let i = 0; i < data.length; i++) {
      discreteMarkers.push({
        seriesIndex: seriesIndex,
        dataPointIndex: i,
        fillColor: "#fff",
        strokeColor: seriesIndex === 1 ? "rgb(227, 84, 212)" : "rgb(255, 139, 75)",
        size: 4,
        shape: "circle",
      });
    }
  }

  const examOptions: any = {
    chart: {
    type: "area",
    height: 398,
    animations: {
      speed: 500,
    },
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 8,
      left: 0,
      blur: 3,
      color: "#000",
      opacity: 0.1,
    },
  },
    colors: [
    "var(--primary-color)",
    "rgb(227, 84, 212)",
    "rgb(255, 142, 111)",
      ],

    title: {
      text: "Deneme Sınavları Puan Dağılımı",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "500",
        color: "#6C86AC",
      },
    },

   grid: {
    borderColor: "#f1f1f1",
    strokeDashArray: 3,
  },

    dataLabels: {
      enabled: false,
    },

    markers: {
      size: 6,
      discrete: discreteMarkers,
      hover: { size: 6 },
    },

    stroke: {
      width: [2, 2, 2],
    curve: ["smooth", "smooth", "stepline"],
        dashArray: [0, 0, 0, 0],
    },

    fill: {
      type: ["solid", "gradient", "solid"],
      opacity: [1, 0.2, 0.2],
     gradient: {
      opacityFrom: 0.05,
      opacityTo: 0.05,
      shadeIntensity: 0.1,
    },
    },

    xaxis: {
      categories: categories,
      axisTicks: { show: false },
    },

    yaxis: {
      min: 0,
      max: 500,
      tickAmount: 5,
      title: {
        text: "Yüzde Başarı",
        style: { fontSize: "12px", color: "#8e8da4" },
      },
      labels: {
        style: { color: "#8e8da4" },
      },
    },

    tooltip: {
      y: [
        {
          formatter: (val: number) => (val !== undefined ? val.toFixed(0) : val),
        },
        {
          formatter: (val: number) => (val !== undefined ? val.toFixed(0) : val),
        },
        {
          formatter: (val: number) => (val !== undefined ? val.toFixed(0) : val),
        },
      ],
    },

    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 10,
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial',
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },

   plotOptions: {
    bar: {
      columnWidth: "20%",
      borderRadius: "2",
    },
  },
  };

  return (
    <Card className="custom-card">
      <Card.Body>
        <Spkapexcharts
          chartSeries={examSeries}
          chartOptions={examOptions}
          height={398}
          type="area"
        />
      </Card.Body>
    </Card>
  );
};

export default TrialExamScoreDistributionChart;