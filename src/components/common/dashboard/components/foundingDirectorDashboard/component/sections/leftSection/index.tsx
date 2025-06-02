import React from "react";
import { Col, Row } from "react-bootstrap";

import { ApexOptions } from "apexcharts";
import CardsRow from "./CardsRow";
import ChartAndPaymentsRow from "./ChartAndPaymentsRow";
import WeeklyFoodAndAttendance from "./WeeklyFoodAndAttendance";
import {
  DailyAttendanceMonitoring,
  NumberOfInternalAndExternalRecordsByMonth,
  PeriodicComparison,
  StaffLeaveTrackingTable,
  Supplier,
  WeeklyFoodsMenu,
} from "../../../../../type";
import PeriodicComparisonTable from "./PeriodicComparison";
interface LeftSectionProps {
  isDark: boolean;
  cardsData: any[];
  chartOptions: ApexOptions;
  chartSeries: ApexAxisChartSeries;
  weeklyFoodsMenu: WeeklyFoodsMenu;
  supplierPayments: Supplier[];
  dailyAttendanceData: DailyAttendanceMonitoring;
  periodicComprassion: PeriodicComparison;
  Number_of_internal_and_external_records_by_month: NumberOfInternalAndExternalRecordsByMonth;
  staffLeaveTracking: StaffLeaveTrackingTable[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  cardsData,
  chartOptions,
  chartSeries,
  weeklyFoodsMenu,
  supplierPayments,
  dailyAttendanceData,
  periodicComprassion,
  Number_of_internal_and_external_records_by_month,
}) => {
  return (
    <Row>
      {/* Kartlar (4 adet) */}
      <CardsRow cardsData={cardsData} />
      <Col xxl={8}>
        {/* Chart ve Ödeme Tablosu yan yana */}
        <ChartAndPaymentsRow
          chartOptions={chartOptions}
          chartSeries={chartSeries}
          supplierPayments={supplierPayments}
        />
        <PeriodicComparisonTable periodicComprassion={periodicComprassion} />
      </Col>
      {/* Haftalık Menü ve Günlük Devam Verisi */}
      <WeeklyFoodAndAttendance
        weeklyFoodsMenu={weeklyFoodsMenu}
        dailyAttendanceData={dailyAttendanceData}
        Number_of_internal_and_external_records_by_month={
          Number_of_internal_and_external_records_by_month
        }
      />
   
    </Row>
  );
};

export default LeftSection;
