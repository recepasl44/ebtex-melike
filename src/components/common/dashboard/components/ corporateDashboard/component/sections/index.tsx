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
import PersonnelTaskDistribution from "./PersonnelTaskDistribution";
import Calendar from "./Calendar";
import { generateCorporateLeaderCardData } from "../../../../../../../utils/cardDateGeneratorCorporateLeader";
import ParentFeedbackPanelTable from "./leftSection/ParentFeedbackPanelTable";
import ExamCountdown from "./leftSection/ExamCountdown";
import StaffLeaveTrackingTableRow from "../../../foundingDirectorDashboard/component/sections/leftSection/StaffLeaveTrackingTable";
import DailyCourseScheduleTable from "./leftSection/DailyCourseScheduleTable";
import WeeklyShiftScheduleTable from "./leftSection/WeeklyShiftScheduleTable";

interface Row1Props {
  data: DashboardResponseType;
}

const Row2Component: React.FC<Row1Props> = (props) => {
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
  const Cardsdata = generateCorporateLeaderCardData(props.data);

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
  const staffTaskDistribution =
    props.data.data[0].staff_task_distribution_table;
  // Kurs Basarı Analizi verisi
  const courseSuccessAnalysis = props.data.data[0].course_success_analysis;
  // Yaklaşan Görevler ve Hatırlatmalar
  const upcomingTasksAndReminders =
    props.data.data[0].upcoming_tasks_and_reminders;
  //kız ve erkek öğrenci sayıları
  const maleandfemaleStudentsCount =
    props.data.data[0].number_of_male_and_female_students;
  // Ödev durumu analizi
  const homeworkStatusAnalysis = props.data.data[0].homework_status_analysis;
  // Veli geri bildirim Paneli
  const parentFeedbackPanel = props.data.data[0].parent_feedback_panel;
  //Sınav Geri Sayımı
  const examCountdown = props.data.data[0].exam_countdown;
  // Günlük ders programı
  const dailyCourseSchedule = props.data.data[0].daily_class_schedule;
  // Haftalık nöbet çizelgesi
  const weeklyDutySchedule = props.data.data[0].weekly_duty_schedule;
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
          staffLeaveTracking={staffLeaveTracking}
          courseSuccessAnalysis={courseSuccessAnalysis}
          upcomingTasksAndReminders={upcomingTasksAndReminders}
          maleandfemaleStudentsCount={maleandfemaleStudentsCount}
          homeworkStatusAnalysis={homeworkStatusAnalysis}
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
        <ParentFeedbackPanelTable data={parentFeedbackPanel} />
        <ExamCountdown examCountdown={examCountdown} />
      </Row>
      {/* Personel İzin Takip Tablosu ve Günlük ders Programı - Yan Yana */}

      <Row>
        <Col xl={6} xxl={6}>
           <StaffLeaveTrackingTableRow
          staffLeaveTracking={staffLeaveTracking}
        />
        </Col>
        <Col xl={6} xxl={6}>
        <DailyCourseScheduleTable data={dailyCourseSchedule} />
        </Col>
      </Row>
      {/* Haftalık Nöbet Ç,zelgesi*/} 
      <Row>
           
        <WeeklyShiftScheduleTable data ={weeklyDutySchedule} />
        <Calendar />
      </Row>


      {/* Personel Görev Dağılımı*/}
      <PersonnelTaskDistribution
        personnelTaskDistribution={staffTaskDistribution}
      />
    </Row>
  );
};

export default Row2Component;
