import { Card } from "react-bootstrap";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";
import { NumberOfCompletedAssignment } from "../type.ts";

interface NumberofFinalizedAssignmentsChartProps {
  data: NumberOfCompletedAssignment[];
}

const NumberofFinalizedAssignmentsChart: React.FC<
  NumberofFinalizedAssignmentsChartProps
> = ({ data }) => {
  
  // Fixed height container style - consistent with other components
  const containerStyle = {
    height: '300px',
    maxHeight: '300px',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  };

  // Chart content container style
  const chartContainerStyle = {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'relative' as const
  };

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
      stacked: true,
      // Remove fixed height to ensure it adapts to container
      toolbar: {
        show: false // Hide toolbar for more space
      }
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
    // Disable data labels on bars
    dataLabels: {
      enabled: false
    },
    colors: ["#4755e6", "#de52db", "#875ff8", "#fc6565", "#4bb7f8"],
    grid: {
      borderColor: "#f2f5f7",
    },
    title: {
      text: undefined,
    },
    xaxis: {
      categories: data.map((d) => d.course),
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
      horizontalAlign: "left",
      offsetX: 0,
      fontSize: "11px",
      labels: {
        colors: "#8c9097",
        useSeriesColors: true,
      },
      markers: {
        width: 10,
        height: 10,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0
      }
    },
    responsive: [{
      breakpoint: 600,
      options: {
        legend: {
          position: "bottom",
          offsetY: 0
        }
      }
    }]
  };

  return (
    <Card className="custom-card">
      <Card.Header>
        <div className="card-title">Sonuçlanan Ödev Sayıları</div>
      </Card.Header>
      <Card.Body className="p-3">
        {/* Fixed height container for chart */}
        <div style={containerStyle}>
          <div style={chartContainerStyle}>
            <Spkapexcharts
              chartOptions={Barstackoptions}
              chartSeries={Barstackseries}
              type="bar"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NumberofFinalizedAssignmentsChart;