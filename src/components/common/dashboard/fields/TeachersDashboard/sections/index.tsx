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
import { generateTeachersData } from "../../../../../../utils/generateTeachersData.ts";
import MaleandfemaleStudentsCountChart from "../../../components/MaleandfemaleStudentsCountChart.tsx";

interface Row3Props {
  data: DashboardResponseType;
}

const Row4Component: React.FC<Row3Props> = ({ data }) => {
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  const firstItem = data?.data?.[0];

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
  const Cardsdata = generateTeachersData(data);

  const Overoptions = generateChartOptions();
  const Overseries = generateChartSeries(data);

  // Günlük devam verisi
  const attendanceData = generateAttendanceData(
    convertToAttendanceStatus(firstItem?.daily_attendance_status),
    images
  );

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
  // Personel görev dağılımı verisi
  const staffTaskDistribution = firstItem?.staff_task_distribution_table;
  // Kurs Basarı Analizi verisi
  const courseSuccessAnalysis = firstItem?.course_success_analysis;
  // Yaklaşan Görevler ve Hatırlatmalar
  const upcomingTasksAndReminders = firstItem?.upcoming_tasks_and_reminders;
  //kız ve erkek öğrenci sayıları
  const maleandfemaleStudentsCount =
    firstItem?.number_of_male_and_female_students;
  // Ödev durumu analizi
  const homeworkStatusAnalysis = firstItem?.homework_status_analysis;
  // Günlük ders programı
  const dailyCourseSchedule = firstItem?.daily_class_schedule;
  // Deneme sınavları puan dağılımı
  const trialExamScoreDistribution = firstItem?.trial_exam_score_distribution;
  // servis durumu
  const serviceStatus = firstItem?.service_status;
  // Sonuçlanan Ödev Sayıları
  const numberOfFinalizedAssignments =
    firstItem?.number_of_completed_assignments;
  // Danısmanlık Görüşmeleri Listesi
  const consultingMeetingList = firstItem?.pdr_meeting_list;
  // haftalık ders programı
  const weeklyLessonProgram = firstItem?.weekly_lesson_program;
  return (
    <Row>
      {/* Sol Sütun - Col 9 */}
      <Col xl={9} xxl={9}>
        <LeftSection
          isDark={isDark}
          staffTaskDistribution={staffTaskDistribution}
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
          trialExamScoreDistribution={trialExamScoreDistribution}
          dailyCourseSchedule={dailyCourseSchedule}
          serviceStatus={serviceStatus}
          examCountdown={firstItem?.exam_countdown}
          weeklyLessonProgram={weeklyLessonProgram}
        />
      </Col>

      {/* Sağ Sütun - Col 3 */}
      <Col xl={3} xxl={3}>
        <RightSection
          homeworkStatusAnalysis={homeworkStatusAnalysis}
          isDark={isDark}
          attendanceData={attendanceData}
          daily_bulletins={daily_bulletins}
          maleandfemaleStudentsCount={maleandfemaleStudentsCount}
          numberOfFinalizedAssignments={numberOfFinalizedAssignments}
        />
      </Col>

            {/* Ödev Durumu Analizi */}
                <MaleandfemaleStudentsCountChart maleandfemaleStudentsCount={maleandfemaleStudentsCount} />

    </Row>
  );
};

export default Row4Component;
