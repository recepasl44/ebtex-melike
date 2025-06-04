import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import { Col, Card, Dropdown } from "react-bootstrap";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { Supplier } from "../type.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface ChartAndPaymentsRowProps {
  chartOptions: ApexOptions;
  chartSeries: ApexAxisChartSeries;
  supplierPayments: Supplier[];
}

const ChartAndPaymentsRow: React.FC<ChartAndPaymentsRowProps> = ({
  chartOptions,
  chartSeries,
  supplierPayments,
}) => {
  // Period filter state
  const [selectedPeriod, setSelectedPeriod] = useState<
    "today" | "month" | "period"
  >("today");
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";
  // Period display text mapping
  const periodText = {
    today: "Bugün",
    month: "Bu Ay",
    period: "Bu Dönem",
  };

  // Tooltip'i özelleştirmek için chartOptions'ı güncelle
  const customChartOptions: ApexOptions = {
    ...chartOptions,
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      custom: ({ /*series, seriesIndex */ dataPointIndex, w }) => {
        // Gerçek değerleri verileri seriden al
        const paidValue = chartSeries[0].data[dataPointIndex];
        const unpaidValue = chartSeries[1].data[dataPointIndex];

        // Sayıları Türk formatına göre formatlama (binlik ayracı olarak nokta)
        const formatNumber = (num: number) => {
          return new Intl.NumberFormat("tr-TR").format(num);
        };

        // Ay adını al
        const month = w.globals.labels[dataPointIndex];

        return `
          <div class="chart-tooltip" style="padding: 8px 12px; background: white; border-radius: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); font-family: 'Poppins', sans-serif;">
            <div style="font-weight: 600; margin-bottom: 8px;">${month}</div>
            
            <div style="display: grid; grid-template-columns: max-content auto; column-gap: 20px; row-gap: 5px;">
              <div style="display: flex; align-items: center;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${
                  w.globals.colors[0]
                }; margin-right: 8px;"></span>
                <span style="font-weight: 500;">Ödenen:</span>
              </div>
              <div style="text-align: right; font-weight: 500;">${formatNumber(
                Number(paidValue)
              )}</div>
              
              <div style="display: flex; align-items: center;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${
                  w.globals.colors[1]
                }; margin-right: 8px;"></span>
                <span style="font-weight: 500;">Ödenmesi Gereken:</span>
              </div>
              <div style="text-align: right; font-weight: 500;">${formatNumber(
                Number(unpaidValue)
              )}</div>
            </div>
          </div>
        `;
      },
    },
  };

  return (
    <>
      <Col xxl={12} xl={12}>
        {/* Aylık Taksit Durumu (Bar Chart) */}
        <Card className="custom-card">
          <Card.Header className="justify-content-between">
            <Card.Title>Aylık Taksit Durumu</Card.Title>
          </Card.Header>
          <Card.Body>
            <div id="sales-overview">
              <Spkapexcharts
                chartOptions={customChartOptions}
                chartSeries={chartSeries}
                type="bar"
                width={"100%"}
                height={315}
              />
            </div>
          </Card.Body>
        </Card>

        {/* Ödemeler Tablosu */}
        <Card className="custom-card mt-4">
          <Card.Header
            className="d-flex justify-content-between align-items-center"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Card.Title>Ödemeler</Card.Title>

            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                id="dropdown-period"
                className="d-flex align-items-center"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#8E8CF5",
                  backgroundColor: isDark ? "#252530" : "#f5f5f5",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                {periodText[selectedPeriod]}
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  minWidth: "120px",
                  padding: "0.5rem 0",
                  margin: "0.125rem 0 0",
                  fontSize: "13px",
                  backgroundColor: isDark ? "#252530" : "#ffffff",
                  border: isDark ? "none" : "1px solid rgba(0,0,0,0.15)",
                  borderRadius: "8px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  color: isDark ? "#fff" : "#212529",
                }}
              >
                <Dropdown.Item
                  active={selectedPeriod === "today"}
                  onClick={() => setSelectedPeriod("today")}
                  style={{
                    color:
                      selectedPeriod === "today"
                        ? "#8E8CF5"
                        : isDark
                        ? "#fff"
                        : "#212529",
                    backgroundColor:
                      selectedPeriod === "today"
                        ? "rgba(142, 140, 245, 0.1)"
                        : "transparent",
                    padding: "8px 16px",
                  }}
                >
                  Bugün
                </Dropdown.Item>
                <Dropdown.Item
                  active={selectedPeriod === "month"}
                  onClick={() => setSelectedPeriod("month")}
                  style={{
                    color:
                      selectedPeriod === "month"
                        ? "#8E8CF5"
                        : isDark
                        ? "#fff"
                        : "#212529",
                    backgroundColor:
                      selectedPeriod === "month"
                        ? "rgba(142, 140, 245, 0.1)"
                        : "transparent",
                    padding: "8px 16px",
                  }}
                >
                  Bu Ay
                </Dropdown.Item>
                <Dropdown.Item
                  active={selectedPeriod === "period"}
                  onClick={() => setSelectedPeriod("period")}
                  style={{
                    color:
                      selectedPeriod === "period"
                        ? "#8E8CF5"
                        : isDark
                        ? "#fff"
                        : "#212529",
                    backgroundColor:
                      selectedPeriod === "period"
                        ? "rgba(142, 140, 245, 0.1)"
                        : "transparent",
                    padding: "8px 16px",
                  }}
                >
                  Bu Dönem
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body className="p-3">
            <div
              className="table-responsive"
              style={{
                height: "300px",
                maxHeight: "300px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  height: "100%",
                }}
              >
                <SpkTablescomponent
                  tableClass="text-wrap table-fixed"
                  tBodyClass="table-group-divider"
                  header={[
                    { title: "Kişi / Firma" },
                    { title: "Vade" },
                    { title: "Ödeme Şekli" },
                    { title: "Tutar" },
                    { title: "Durum" },
                  ]}
                >
                  {supplierPayments.length === 0
                    ? Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <tr
                            key={`empty-row-${index}`}
                            style={{ height: "48px" }}
                          >
                            <td colSpan={5}>&nbsp;</td>
                          </tr>
                        ))
                    : supplierPayments.map((supplier: any, index: any) => (
                        <tr key={`supplier-${index}`}>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "100px" }}
                          >
                            {supplier.name}
                          </td>
                          <td className="text-nowrap">{supplier.expiry}</td>
                          <td className="text-nowrap">
                            {supplier.payment_method === "bank"
                              ? "Banka"
                              : supplier.payment_method}
                          </td>
                          <td className="text-nowrap">₺{supplier.total}</td>
                          <td className="text-nowrap">
                            <span
                              className={`text-nowrap text-${
                                supplier.status === "ödendi"
                                  ? "success"
                                  : supplier.status === "ödenmedi"
                                  ? "danger"
                                  : "primary"
                              }`}
                            >
                              {supplier.status.charAt(0).toUpperCase() +
                                supplier.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                </SpkTablescomponent>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default ChartAndPaymentsRow;
