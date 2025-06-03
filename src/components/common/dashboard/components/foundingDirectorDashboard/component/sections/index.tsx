import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DashboardResponseType } from "../../../../type";
import { RootState } from "../../../../../../../store";
import {  generateFoundingDirectorCardData } from "../../../../../../../utils/cardDataGeneratorFoundingDirrector";
import { generateChartOptions } from "../../../../../../../helpers/generateChartOptions";
import { generateChartSeries } from "../../../../../../../utils/generateChartSeries";
import {
  convertToAttendanceStatus,
  generateAttendanceData,
} from "../../../../../../../helpers/generateAttendanceData";
import LeftSection from "./leftSection";
import RightSection from "./rightSection";
import teacher from "../../../../../../../assets/images/faces/teacher.png";
import person from "../../../../../../../assets/images/faces/person.png";
import girl from "../../../../../../../assets/images/faces/girl.png";
import boy from "../../../../../../../assets/images/faces/boy.png";
import bigGirl from "../../../../../../../assets/images/faces/bigGirl.png";
import bigGirl2 from "../../../../../../../assets/images/faces/bigGirl2.png";
import free from "../../../../../../../assets/images/faces/1.jpg";
import PersonnelTaskDistribution from "./PersonnelTaskDistribution";
import StaffLeaveTrackingTableRow from "./leftSection/StaffLeaveTrackingTable";
import Calendar from "./Calendar";

interface Row1Props {
  data: DashboardResponseType;
}

const Row1Component: React.FC<Row1Props> = (props) => {
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  const images = {
    teacher: teacher,
    staff: person,
    kindergarten: girl,
    primary: boy,
    middle: bigGirl,
    anatolian: bigGirl2,
    science: bigGirl2,
    total: free,
  };
  const Cardsdata = generateFoundingDirectorCardData(props.data);

  const Overoptions = generateChartOptions();
  const Overseries = generateChartSeries(props.data);

  // Günlük devam verisi
  const attendanceData = generateAttendanceData(
    convertToAttendanceStatus(props.data.data[0].daily_attendance_status),
    images
  );

  const weeklyFoodsMenu = props.data.data[0].weekly_foods_menu[0];

  // Ödemeler (supplier) verisi
  const supplierPayments = props.data.data[0].payments?.suppliers || [];
  // güğnlük yoklama verisi
  const dailyAttendanceData = props.data.data[0].daily_attendance_monitoring;
  // dönemsel Karsılastırma verisi
  const periodicalComparisionData = props.data.data[0].periodic_comparison;
  // İç ve dış kayıtların aylık dağılımı
  const Number_of_internal_and_external_records_by_month =
    props.data.data[0].Number_of_internal_and_external_records_by_month;
  // Günlük bülten verisi
  const daily_bulletins = props.data.data[0].daily_bulletins;
  // Personel izin takip tablosu verisi
  const staffLeaveTracking = props.data.data[0].staff_leave_tracking_table;
  // Personel görev dağılımı verisi
  const staffTaskDistribution = props.data.data[0].staff_task_distribution_table;
  return (
    <Row>
      {/* Sol Sütun - Col 9 */}
      <Col xl={9} xxl={9}>
        <LeftSection
          isDark={isDark}
          cardsData={Cardsdata}
          chartOptions={Overoptions}
          chartSeries={Overseries}
          weeklyFoodsMenu={weeklyFoodsMenu}
          supplierPayments={supplierPayments}
          dailyAttendanceData={dailyAttendanceData}
          periodicComprassion={periodicalComparisionData}
          Number_of_internal_and_external_records_by_month={
            Number_of_internal_and_external_records_by_month
          }
          staffLeaveTracking={staffLeaveTracking}
        />
      </Col>

      {/* Sağ Sütun - Col 3 */}
      <Col xl={3} xxl={3}>
        <RightSection isDark={isDark} 
        attendanceData={attendanceData}
        daily_bulletins={daily_bulletins}
        />
      </Col>
                 {/* Personel İzin Takip Tablosu ve Takvim - Yan Yana */}
          <Row >
            <Col xl={6} xxl={6}>
              <StaffLeaveTrackingTableRow
                staffLeaveTracking={staffLeaveTracking}
              />
            </Col>
            <Col xl={6} xxl={6}>
              <Calendar />
            </Col>
          </Row>
      <PersonnelTaskDistribution
        personnelTaskDistribution={staffTaskDistribution}
      />
    </Row>
  );
};

export default Row1Component;
