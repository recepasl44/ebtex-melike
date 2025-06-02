import { Card } from "react-bootstrap";
import Spkapexcharts from "../../../../../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts";
import { NumberOfCompletedAssignment } from "../../../../../type";

interface NumberofFinalizedAssignmentsChartProps {
  data: NumberOfCompletedAssignment[];
}

const NumberofFinalizedAssignmentsChart: React.FC<
  NumberofFinalizedAssignmentsChartProps
> = ({ data }) => {
  const Barstackseries = [
    {
      name: "Yapıldı",
      data: data.map((d) => d.done),
    },
    {
      name: "Yapılmadı",
      data: data.map((d) => d.not_done),
    },
    {
      name: "Eksik",
      data: data.map((d) => d.missing),
    },
    {
      name: "Gelmedi",
      data: data.map((d) => d.did_not_come),
    },
    {
      name: "Edilmedi",
      data: data.map((d) => d.was_not),
    },
  ];

  const Barstackoptions = {
    chart: {
      type: "bar",
      height: 320,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    colors: ["#4755e6", "#de52db", "#875ff8", "#fc6565", "#4bb7f8"],
    grid: {
      borderColor: "#f2f5f7",
    },
    title: {
      text: undefined,
    },
    xaxis: {
      categories: data.map((_) => ""),
      max: 100,
      labels: {
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600,
          cssClass: "apexcharts-yaxis-label",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val.toString();
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      offsetX: -50,
      labels: {
        colors: "#8c9097",
        useSeriesColors: true,
      },
      markers: {
        width: 12,
        height: 12,
      },
    },
  };

  return (
    <Card className="custom-card">
      <Card.Header>
        <div className="card-title">Sonuçlanan Ödev Sayıları</div>
      </Card.Header>
      <Card.Body>
        <div id="bar-stacked">
          <Spkapexcharts
            chartOptions={Barstackoptions}
            chartSeries={Barstackseries}
            type="bar"
            width={"100%"}
            height={320}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default NumberofFinalizedAssignmentsChart;
