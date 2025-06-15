import React from "react";
import { Card, Col } from "react-bootstrap";
import { NumberOfInternalAndExternalRecordsByMonth } from "../type.ts";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";

interface InternalExternalRecordByMonthProps {
  Number_of_internal_and_external_records_by_monthData: NumberOfInternalAndExternalRecordsByMonth | any;
}

const InternalExternalRecordByMonth: React.FC<
  InternalExternalRecordByMonthProps
> = ({ Number_of_internal_and_external_records_by_monthData }) => {
  const months = {
    january: "Oca",
    february: "Şub",
    march: "Mar",
    april: "Nis",
    may: "May",
    june: "Haz",
    july: "Tem",
    august: "Ağu",
    september: "Eyl",
    octaber: "Eki",
    novamber: "Kas",
    december: "Ara",
  };

  const labels = Object.keys(months).map(
    (month) => months[month as keyof typeof months]
  );

  let monthlyData: any = {};
  if (Array.isArray(Number_of_internal_and_external_records_by_monthData)) {
    Number_of_internal_and_external_records_by_monthData.forEach((item: any) => {
      if (item.month) {
        const date = new Date(item.month + '-01');
        const name = date.toLocaleString('en', { month: 'long' }).toLowerCase();
        monthlyData[name] = { internal: item.internal, external: item.external };
      }
    });
  } else {
    monthlyData = Number_of_internal_and_external_records_by_monthData || {};
  }

  const internalData = Object.keys(months).map((month) =>
    monthlyData[month]?.internal ? parseInt(monthlyData[month].internal) : 0
  );

  const externalData = Object.keys(months).map((month) =>
    monthlyData[month]?.external ? parseInt(monthlyData[month].external) : 0
  );

  const chartOptions = {
    chart: {
      height: 265,
      type: "line",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      markers: {
        size: 4,
        shape: "circle",
        strokeWidth: 0,
      },
    },
    stroke: {
      curve: "smooth",
      width: [0],
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        borderRadius: 3,
        borderRadiusWhenStacked: "all",
      },
    },
    colors: ["var(--primary-color)", 'rgb(227, 84, 212)'],
    labels: labels,
  };

  const chartSeries = [
    {
      name: "İç Kayıt",
      type: "bar",
      data: internalData,
    },
    {
      name: "Dış Kayıt",
      type: "bar",
      data: externalData,
    },
  ];

  return (
    <Col
    xxl={12} xl={12}>
      <Card
     style={{ paddingTop: "20px" }}

      className="custom-card">
        <Card.Header>
          <Card.Title>Aylara Göre İç & Dış Kayıt Sayıları</Card.Title>
        </Card.Header>
        <Card.Body>
          <Spkapexcharts
            chartOptions={chartOptions}
            chartSeries={chartSeries}
            type="bar"
            width={"100%"}
            height={350}
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default InternalExternalRecordByMonth;
