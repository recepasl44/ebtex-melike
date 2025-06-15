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
import PersonnelTaskDistribution from "../../../components/PersonnelTaskDistribution.tsx";
import Calendar from "../../../components/Calendar.tsx";
import { generateCorporateLeaderCardData } from "../../../../../../utils/cardDateGeneratorCorporateLeader.ts";
import ParentFeedbackPanelTable from "../../../components/ParentFeedbackPanelTable.tsx";
import ExamCountdown from "../../../components/ExamCountdown.tsx";
import StaffLeaveTrackingTableRow from "../../../components/StaffLeaveTrackingTable.tsx";
import WeeklyShiftScheduleTable from "../../../components/WeeklyShiftScheduleTable.tsx";
import WeeklyFoodMenuRow from "../../../components/WeeklyFoodMenuRow.tsx";

interface Row1Props {
  data: DashboardResponseType;
}

const Row2Component: React.FC<Row1Props> = (props) => {
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  const firstItem = props.data?.data?.[0];

  const firstItem = props.data?.data?.[0];

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
  const Cardsdata = generateCorporateLeaderCardData(props.data);

  const Overoptions = generateChartOptions();
  const Overseries = generateChartSeries(props.data);

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
  const upcomingTasksAndReminders =
    firstItem?.upcoming_tasks_and_reminders;
  //kız ve erkek öğrenci sayıları
  const maleandfemaleStudentsCount =
    firstItem?.number_of_male_and_female_students;
  // Ödev durumu analizi
  const homeworkStatusAnalysis = firstItem?.homework_status_analysis;
  // Veli geri bildirim Paneli
  const parentFeedbackPanel = firstItem?.parent_feedback_panel;
  //Sınav Geri Sayımı
  const examCountdown = firstItem?.exam_countdown;
  // Günlük ders programı
  const dailyCourseSchedule = firstItem?.daily_class_schedule;
  // Haftalık nöbet çizelgesi
  const weeklyDutySchedule = firstItem?.weekly_duty_schedule;
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
          courseSuccessAnalysis={courseSuccessAnalysis}
          upcomingTasksAndReminders={upcomingTasksAndReminders}
          maleandfemaleStudentsCount={maleandfemaleStudentsCount}
          homeworkStatusAnalysis={homeworkStatusAnalysis}
          dailyCourseSchedule={dailyCourseSchedule}
        />
      </Col>

      {/* Sağ Sütun - Col 3 */}
      <Col xl={3} xxl={3}>
        <RightSection
          isDark={isDark}
          attendanceData={attendanceData}
          daily_bulletins={daily_bulletins}
        />
      </Col>

      {/* Veli Geri Bildirim Paneli ve Sınav Geri Sayımı */}
      <Row>
        <Col xl={6} xxl={6}>
          <ParentFeedbackPanelTable data={parentFeedbackPanel} />
        </Col>
        <Col xl={6} xxl={6}>
          <ExamCountdown examCountdown={examCountdown} />
        </Col>
      </Row>
      {/* Personel İzin Takip Tablosu ve Günlük ders Programı - Yan Yana */}

      <Row>
        <Col xl={6} xxl={6}>
          <StaffLeaveTrackingTableRow staffLeaveTracking={staffLeaveTracking} />
        </Col>
        <Col xl={6} xxl={6}>
          <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu} />
        </Col>
      </Row>
      {/* Haftalık Nöbet Ç,zelgesi*/}
      <Row>
        <Col xl={7} xxl={7}>
          <WeeklyShiftScheduleTable data={weeklyDutySchedule} />
        </Col>
        <Col xl={5} xxl={5}>
          <Calendar />
        </Col>
      </Row>

      {/* Personel Görev Dağılımı*/}
      <PersonnelTaskDistribution
        personnelTaskDistribution={staffTaskDistribution}
      />
    </Row>
  );
};

export default Row2Component;
