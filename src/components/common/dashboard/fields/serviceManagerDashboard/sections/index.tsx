import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DashboardResponseType } from "../../../type.ts";
import { RootState } from "../../../../../../store";
import { generateChartOptions } from "../../../../../../helpers/generateChartOptions.ts";
import { generateChartSeries } from "../../../../../../utils/generateChartSeries.ts";
import {
  convertToAttendanceStatus,
  generateAttendanceData,
} from "../../../../../../helpers/generateAttendanceData.ts";
import LeftSection from "./leftSection";
import RightSection from "./rightSection";
import teacher from "../../../../../../assets/images/faces/teacher.png";
import person from "../../../../../../assets/images/faces/person.png";
import girl from "../../../../../../assets/images/faces/girl.png";
import boy from "../../../../../../assets/images/faces/boy.png";
import bigGirl from "../../../../../../assets/images/faces/bigGirl.png";
import bigGirl2 from "../../../../../../assets/images/faces/bigGirl2.png";
import free from "../../../../../../assets/images/faces/1.jpg";
import { generateServiceManagerData } from "../../../../../../utils/generateServiceManagerData.ts";
import ServiceUsagebyDayoftheWeekChart from "../../../components/ServiceUsagebyDayoftheWeekChart.tsx";

import ServiceRoutePlanTable from "../../../components/ServiceRoutePlanTable.tsx";
import ServicePaymentStatusTable from "../../../components/ServicePaymentStatusTable.tsx";
import ParentFeedbackPanelTable from "../../../components/ParentFeedbackPanelTable.tsx";

interface Row10Props {
  data: DashboardResponseType;
}

const Row10Component: React.FC<Row10Props> = ({ data }) => {
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

  const Cardsdata = generateServiceManagerData(data);
  const Overoptions = generateChartOptions();
  const Overseries = generateChartSeries(data);

  // Günlük devam verisi
  const attendanceData = generateAttendanceData(
    convertToAttendanceStatus(data.data[0].daily_attendance_status),
    images
  );
  // Haftalık yemek menüsü verisi
  const weeklyFoodsMenu = data.data[0].weekly_foods_menu[0];

  // Ödemeler (supplier) verisi
  const supplierPayments = data.data[0].payments?.suppliers || [];
  // dönemsel Karsılastırma verisi
  const periodicalComparisionData = data.data[0].periodic_comparison;
  // İç ve dış kayıtların aylık dağılımı
  const Number_of_internal_and_external_records_by_month =
    data.data[0].Number_of_internal_and_external_records_by_month;
  // Günlük bülten verisi
  const daily_bulletins = data.data[0].daily_bulletins;
  // Personel izin takip tablosu verisi
  const staffLeaveTracking = data.data[0].staff_leave_tracking_table;
  // Kurs Basarı Analizi verisi
  const courseSuccessAnalysis = data.data[0].course_success_analysis;
  // Yaklaşan Görevler ve Hatırlatmalar
  const upcomingTasksAndReminders = data.data[0].upcoming_tasks_and_reminders;
  //kız ve erkek öğrenci sayıları
  const maleandfemaleStudentsCount =
    data.data[0].number_of_male_and_female_students;
  // Ödev durumu analizi
  const homeworkStatusAnalysis = data.data[0].homework_status_analysis;
  //Sınav Geri Sayımı
  const examCountdown = data.data[0].exam_countdown;
  // Günlük ders programı
  const dailyCourseSchedule = data.data[0].daily_class_schedule;
  // Haftalık nöbet çizelgesi
  const weeklyDutySchedule = data.data[0].weekly_duty_schedule;
  // Deneme sınavları puan dağılımı
  const trialExamScoreDistribution = data.data[0].trial_exam_score_distribution;
  // servis durumu
  const serviceStatus = data.data[0].service_status;
  // Ders saati yoklama özeti
  const classHourAttendanceSummary = data.data[0].class_hour_attendance_summary;
  // Sonuçlanan Ödev Sayıları
  const numberOfFinalizedAssignments =
    data.data[0].number_of_completed_assignments;
  // Danısmanlık Görüşmeleri Listesi
  const consultingMeetingList = data.data[0].pdr_meeting_list;
  // Yoklama türü dağılımı
  const attendanceTypeDistribution = data.data[0].poll_type_distribution;
  // Pdr Görüşmeleri Listesi
  const upcomingAppointments = data.data[0].upcoming_appointments;
    // Servis Ödeme Durumu
  const servicePaymentStatus = data.data[0].service_payment_status;
    // servis rota olanı
  const serviceRoute = data.data[0].service_route_plan;
  // servis güzergahı süre performansı
  const serviceRouteTimePerformance =
    data.data[0].service_route_time_performance;
  // Haftanın Günlerine Göre Servis Kullanımı
  const serviceUsageByDayOfTheWeek =
    data.data[0].service_usage_by_day_of_the_week;
  // Servis Araç Bilgileri
  const serviceVehicleInformation =
    data.data[0].service_vehicle_information;
  // Veli Bildirim Yönetim Paneli
  const parentFeedbackPanel = data.data[0].parent_feedback_panel;
  // Servis Ödeme Bilgileri
  const servicePaymentInformation =
    data.data[0].service_payment_information;
    // Ücret Durumu
  const wageStatus = data.data[0].wage_status;
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
          periodicComprassion={periodicalComparisionData}
          Number_of_internal_and_external_records_by_month={
            Number_of_internal_and_external_records_by_month
          }
          consultingMeetingList={consultingMeetingList}
          staffLeaveTracking={staffLeaveTracking}
          courseSuccessAnalysis={courseSuccessAnalysis}
          upcomingTasksAndReminders={upcomingTasksAndReminders}
          maleandfemaleStudentsCount={maleandfemaleStudentsCount}
          homeworkStatusAnalysis={homeworkStatusAnalysis}
          trialExamScoreDistribution={trialExamScoreDistribution}
          dailyCourseSchedule={dailyCourseSchedule}
          serviceStatus={serviceStatus}
          attendanceTypeDistribution={attendanceTypeDistribution}
          examCountdown={examCountdown}
          weeklyDutySchedule={weeklyDutySchedule}
          classHourAttendanceSummary={classHourAttendanceSummary}
          upcomingAppointments={upcomingAppointments}
          serviceRoute={serviceRoute}
          serviceRouteTimePerformance={serviceRouteTimePerformance}
          wage_status={wageStatus}
          serviceVehicleInformation={serviceVehicleInformation}
          servicePaymentInformation={servicePaymentInformation}
       />
      </Col>

      {/* Sağ Sütun - Col 3 */}
      <Col xl={3} xxl={3}>
        <RightSection
          homeworkStatusAnalysis={homeworkStatusAnalysis}
          isDark={isDark}
          attendanceData={attendanceData}
          daily_bulletins={daily_bulletins}
          numberOfFinalizedAssignments={numberOfFinalizedAssignments}
        />
      </Col>
      {/*Servis Rota ve plan bilgileri ve haftanın günlerine göre servis kullanımı */}

      <Row>
           <Col xl={7}>
          <ServiceRoutePlanTable serviceRoute={serviceRoute} />

        </Col>
          <Col xl={5}>
         <ServiceUsagebyDayoftheWeekChart serviceUsage={serviceUsageByDayOfTheWeek} />
        </Col>
      </Row>
      {/* Servis Ödeme Durumu  ve Veli Bildirim Yönetim Paneli*/}
      <Row>
        <Col xl={7}>
          <ServicePaymentStatusTable servicePaymentStatus={servicePaymentStatus} />
        </Col>
        <Col xl={5}>
          <ParentFeedbackPanelTable data={parentFeedbackPanel} />
        </Col>
        </Row>

    </Row>
  );
};

export default Row10Component;
