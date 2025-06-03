import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DashboardResponseType } from "../../../../type";
import { RootState } from "../../../../../../../store";
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
import { generateParentGuardianData } from "../../../../../../../utils/generateParentGuardianData";
import TrialExamScoreDistributionChart from "./leftSection/TrialExamScoreDistributionChart";
import NumberofFinalizedAssignmentsChart from "./rightSection/NumberofFinalizedAssignmentsChart";
import DistributionofPollingTypeChart from "./leftSection/DistributionofPollingTypeChart";
import WeeklyCourseScheduleTable from "./leftSection/WeeklyCourseScheduleTable";
import GuidanceandCounselingInterviewTable from "./leftSection/GuidanceandCounselingInterviewTable";

interface Row11Props {
  data: DashboardResponseType;
}

const Row11Component: React.FC<Row11Props> = ({ data }) => {
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

  const Cardsdata = generateParentGuardianData(data);
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
    // servis rota olanı
  const serviceRoute = data.data[0].service_route_plan;
  // servis güzergahı süre performansı
  const serviceRouteTimePerformance =
    data.data[0].service_route_time_performance;
    //ders basarı analizi
  const courseSuccessAnalysisData =
    data.data[0].course_success_analysis;
    // ödeme ve finansal bilgiler
  const paymentAndFinancialInformation =
    data.data[0].payment_and_financial_information ;
  // Yoklama Türü Dağılımı
  const PollTypeDistribution = data.data[0].poll_type_distribution;
    // haftalık ders çalışma programı
  const weeklyLessonScheduleData = data.data[0].weekly_lesson_program;
  // Rehberlik ve Danışmanlık Görüşmeleri Listesi
  const guidanceAndCounselingInterviewList =
    data.data[0].guidance_counseling_interview_table;
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
        />
      </Col>

      <Row>
           <Col xl={5}>
      {/*Deneme Sınavları Puan Dağılımı */}
          <TrialExamScoreDistributionChart
            data={trialExamScoreDistribution}
          />
        </Col>
          <Col xl={4}>
      {/*Sonuçlanan Ödev Sayıları */}
          <NumberofFinalizedAssignmentsChart data={numberOfFinalizedAssignments} />
        </Col>
        <Col xl={3}>
      {/* Yoklama Türü Dağılımı */}
          <DistributionofPollingTypeChart data={PollTypeDistribution} />
        </Col>
         
      </Row>
      
      <Row>
        <Col xl={7}>
      {/* haftalık ders calısma programı */}

          <WeeklyCourseScheduleTable data={weeklyLessonScheduleData} />
        </Col>
        <Col xl={5}>
      {/* Rehberlik ve Danışmanlık Görüşmeleri Listesi */}
      <GuidanceandCounselingInterviewTable data={guidanceAndCounselingInterviewList} />
        </Col>
        </Row>
    </Row>
  );
};

export default Row11Component;
