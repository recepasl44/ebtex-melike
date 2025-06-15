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
import { generateParentGuardianData } from "../../../../../../utils/generateParentGuardianData.ts";
import TrialExamScoreDistributionChart from "../../../components/TrialExamScoreDistributionChart.tsx";
import NumberofFinalizedAssignmentsChart from "../../../components/NumberofFinalizedAssignmentsChart.tsx";
import PaymentandFinancialInformationTable from "../../../components/PaymentandFinancialInformationTable.tsx";
import ServiceInformationTable from "../../../components/ServiceInformationTable.tsx";

interface Row11Props {
  data: DashboardResponseType;
}

const Row11Component: React.FC<Row11Props> = ({ data }) => {
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  const firstItem = Array.isArray(data?.data)
    ? data?.data[0]
    : data?.data;
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

  const Cardsdata = generateParentGuardianData(data);
  const Overoptions = generateChartOptions();
  const Overseries = generateChartSeries(data);

  // Günlük devam verisi
  const attendanceData = generateAttendanceData(
    convertToAttendanceStatus(firstItem?.daily_attendance_status),
    images
  );
  // Haftalık yemek menüsü verisi
  const weeklyFoodsMenu = firstItem?.weekly_foods_menu?.[0];

  // Ödemeler (supplier) verisi
  const supplierPayments = firstItem?.payments?.suppliers || [];
  // dönemsel Karsılastırma verisi
  const periodicalComparisionData = firstItem?.periodic_comparison;
  // İç ve dış kayıtların aylık dağılımı
  const Number_of_internal_and_external_records_by_month =
    firstItem?.Number_of_internal_and_external_records_by_month;
  // Günlük bülten verisi
  const daily_bulletins = firstItem?.daily_bulletins;
  // Personel izin takip tablosu verisi
  const staffLeaveTracking = firstItem?.staff_leave_tracking_table;
  // Kurs Basarı Analizi verisi
  const courseSuccessAnalysis = firstItem?.course_success_analysis;
  // Yaklaşan Görevler ve Hatırlatmalar
  const upcomingTasksAndReminders = firstItem?.upcoming_tasks_and_reminders;
  //kız ve erkek öğrenci sayıları
  const maleandfemaleStudentsCount =
    firstItem?.number_of_male_and_female_students;
  // Ödev durumu analizi
  const homeworkStatusAnalysis = firstItem?.homework_status_analysis;
  //Sınav Geri Sayımı
  const examCountdown = firstItem?.exam_countdown;
  // Günlük ders programı
  const dailyCourseSchedule = firstItem?.daily_class_schedule;
  // Haftalık nöbet çizelgesi
  const weeklyDutySchedule = firstItem?.weekly_duty_schedule;
  // Deneme sınavları puan dağılımı
  const trialExamScoreDistribution = firstItem?.trial_exam_score_distribution;
  // servis durumu
  const serviceStatus = firstItem?.service_status;
  // Ders saati yoklama özeti
  const classHourAttendanceSummary = firstItem?.class_hour_attendance_summary;
  // Sonuçlanan Ödev Sayıları
  const numberOfFinalizedAssignments =
    firstItem?.number_of_completed_assignments;
  // Danısmanlık Görüşmeleri Listesi
  const consultingMeetingList = firstItem?.pdr_meeting_list;
  // Yoklama türü dağılımı
  const attendanceTypeDistribution = firstItem?.poll_type_distribution;
  // Pdr Görüşmeleri Listesi
  const upcomingAppointments = firstItem?.upcoming_appointments;
  // servis rota olanı
  const serviceRoute = firstItem?.service_route_plan;
  // servis güzergahı süre performansı
  const serviceRouteTimePerformance =
    firstItem?.service_route_time_performance;
  //ders basarı analizi
  const courseSuccessAnalysisData = firstItem?.course_success_analysis;
  // ödeme ve finansal bilgiler
  const paymentAndFinancialInformation =
    firstItem?.payment_and_financial_information;
  // Yoklama Türü Dağılımı
  const PollTypeDistribution = firstItem?.poll_type_distribution;
  // Rehberlik ve Danışmanlık Görüşmeleri Listesi
  const guidanceAndCounselingInterviewList =
    firstItem?.guidance_counseling_interview_table;
  const weeklyLessonProgram = firstItem?.weekly_lesson_program || [];
  // servis bilgileri
  const serviceInformation = firstItem?.service_information || [];

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
          courseSuccessAnalysisData={courseSuccessAnalysisData}
          paymentAndFinancialInformation={paymentAndFinancialInformation}
          weeklyLessonScheduleData={weeklyLessonProgram}
          guidanceAndCounselingInterviewList={
            guidanceAndCounselingInterviewList
          }
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
          examCountdown={examCountdown}
          PollTypeDistribution={PollTypeDistribution}
        />
      </Col>

      <Row>
        <Col xl={6}>
          {/*Deneme Sınavları Puan Dağılımı */}
          <TrialExamScoreDistributionChart data={trialExamScoreDistribution} />
        </Col>
        <Col xl={6}>
          {/*Sonuçlanan Ödev Sayıları */}
          <NumberofFinalizedAssignmentsChart
            data={numberOfFinalizedAssignments}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          {/* ödeme ve Finansal Bilgiler */}
          <PaymentandFinancialInformationTable
            paymentInformation={paymentAndFinancialInformation}
          />
        </Col>
        <Col xl={6}>
          {/* Servis Bilgileri */}
          <ServiceInformationTable serviveInformation={serviceInformation} />
        </Col>
      </Row>
    </Row>
  );
};

export default Row11Component;
