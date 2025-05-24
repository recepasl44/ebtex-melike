import { lazy } from "react";

const Branch = lazy(() => import("../components/common/branch/table"));
const BranchModal = lazy(() => import("../components/common/branch/crud"));
const Analytics = lazy(
  () => import("../container/dashboard/analytics/analytics")
);

const StudentImport = lazy(
  () => import("../components/common/student/import/index")
);
const StudentList = lazy(
  () => import("../components/common/student/pre-register/list")
);
const Calculate = lazy(
  () => import("../components/common/student/calculate/index")
);
// exams
const ExamsResult = lazy(() => import("../components/common/exams/examResult"));
const ExamAnalysis = lazy(
  () => import("../components/common/exams/examAnalysis")
);

// Guidance
const Guidance = lazy(
  () => import("../components/common/guidance/guide/index")
);

const CourseList = lazy(() => import("../components/common/course/list"));
const CourseModal = lazy(() => import("../components/common/course/crud"));
const CourseCrud = lazy(() => import("../components/common/course/crudtest"));

const School = lazy(() => import("../components/common/school/table"));
const SchoolModal = lazy(() => import("../components/common/school/crud"));
const ScholarshipTable = lazy(
  () => import("../components/common/scholarShips/table")
);
const ScholarshipModal = lazy(
  () => import("../components/common/scholarShips/crud")
);
const ScholarShipDayTable = lazy(
  () => import("../components/common/scholarShips/day/dayTable")
);
const ScholarShipDayModal = lazy(
  () => import("../components/common/scholarShips/day/dayCrud")
);
const ScholarShipSessionTable = lazy(
  () => import("../components/common/scholarShips/session/sessionTable")
);
const ScholarShipSessionModal = lazy(
  () => import("../components/common/scholarShips/session/sessionCrud")
);
const ScholarShipClassLevelTable = lazy(
  () => import("../components/common/scholarShips/classLevel/classLevelTable")
);
const ScholarShipClassLevelModal = lazy(
  () => import("../components/common/scholarShips/classLevel/classlevelCrud")
);
const ScholarShipClassroomTable = lazy(
  () => import("../components/common/scholarShips/classroom/classroomTable")
);
const ScholarShipClassroomModal = lazy(
  () => import("../components/common/scholarShips/classroom/classroomCrud")
);
const ScholarshipIndex = lazy(
  () => import("../components/common/scholarShips/index")
);
//schoolTypes
const SchoolTypes = lazy(
  () => import("../components/common/schoolTypes/table")
);

const SchoolTypeModal = lazy(
  () => import("../components/common/schoolTypes/crud")
);
const Incomes = lazy(() => import("../components/common/income/table"));
const Debts = lazy(() => import("../components/common/debts/table"));
const DiscountStudent = lazy(
  () => import("../components/common/discountStudent/table")
);
const EducationalStructure = lazy(
  () => import("../components/common/academic/educational_structure/index")
);
const PreRegisterList = lazy(
  () => import("../components/common/student/pre-register/list")
);
const AppointmentsList = lazy(
  () => import("../components/common/student/appointments/index")
);
const AppointmentModal = lazy(
  () => import("../components/common/student/appointments/crud")
);

const Appointmentsdetail = lazy(
  () => import("../components/common/student/appointments/student_table")
);

const InternalsTable = lazy(
  () => import("../components/common/internal/table")
);
const InternalModal = lazy(
  () => import("../components/common/internal/detail")
);
const PreRegisterCrud = lazy(
  () => import("../components/common/student/pre-register/crud")
);
const TransferTable = lazy(
  () => import("../components/common/transfers/table")
);
const TransferCrud = lazy(() => import("../components/common/transfers/crud"));
const SupplierList = lazy(() => import("../components/common/supplier/index"));
const SupplierCrud = lazy(() => import("../components/common/supplier/crud"));
const SupplierDetail = lazy(
  () => import("../components/common/supplier/supplierDetail/index")
);
const SupplierInvoiceCrud = lazy(
  () => import("../components/common/supplier/supplierDetail/tabs/invoice/crud")
);
const SupplierDebtCrud = lazy(
  () => import("../components/common/supplier/supplierDetail/tabs/debts/crud")
);
const SupplierRefundCrud = lazy(
  () => import("../components/common/supplier/supplierDetail/tabs/refunds/crud")
);
const SupplierPaymentCrud = lazy(
  () =>
    import("../components/common/supplier/supplierDetail/tabs/payments/crud")
);
const SupplierNoteCrud = lazy(
  () => import("../components/common/supplier/supplierDetail/tabs/notes/crud")
);
// Meetings
const Meeting = lazy(
  () => import("../components/common/student/meetings/table")
);

// Meeting Crud Modal
const MeetingCrud = lazy(
  () => import("../components/common/student/meetings/crud")
);

// Student Meeting Modal
const StudentMeetingTable = lazy(
  () => import("../components/common/student/meetings/student_table")
);

const PersonelCompensationCrud = lazy(
  () =>
    import("../components/common/personel/personelDetail/tabs/tazminat/crud")
);
// Student Payment Details
const StudentPaymentDetails = lazy(
  () => import("../components/common/payment_details/table")
);
const StudentPaymentCrud = lazy(
  () => import("../components/common/payment_details/crud")
);

// Student Payment Detail Modal
const StudentPaymentDetailModal = lazy(
  () => import("../components/common/payment_details/index")
);

const PersonelWeeklyLessonCrud = lazy(
  () =>
    import(
      "../components/common/personel/personelDetail/tabs/haftalik-calisma/crud"
    )
);
const PersonelSalaryDebtCrud = lazy(
  () =>
    import("../components/common/personel/personelDetail/tabs/maas-borc/crud")
);

const PersonelSalaryPaymentCrud = lazy(
  () =>
    import("../components/common/personel/personelDetail/tabs/maas-odeme/crud")
);
const PersonelPrimlerCrud = lazy(
  () => import("../components/common/personel/personelDetail/tabs/prim/crud")
);
// Service Management
const ServiceManagement = lazy(
  () => import("../components/common/student/service_management/index")
);
// ServiceType Management Table
const ServiceTypeManagementTable = lazy(
  () =>
    import(
      "../components/common/student/service_management/service/service_management/table"
    )
);
// ServiceType Management Crud
const ServiceTypeManagementCrud = lazy(
  () =>
    import(
      "../components/common/student/service_management/service/service_management/crud"
    )
);

// Discount Crud Modal
const DiscountCrud = lazy(
  () => import("../components/common/student/service_management/discount/crud")
);

// Service Management Crud
const ServiceManagementCrud = lazy(
  () => import("../components/common/student/service_management/service/crud")
);

const PersonelKesintiCrud = lazy(
  () => import("../components/common/personel/personelDetail/tabs/kesinti/crud")
);
const PersonelIadeCrud = lazy(
  () => import("../components/common/personel/personelDetail/tabs/iade/crud")
);

const ExpenseSummary = lazy(
  () => import("../components/common/expences/summary/table")
);

// ExpencesMain
const ExpenseMain = lazy(
  () => import("../components/common/expences/main/table")
);
const ExpenseCrud = lazy(
  () => import("../components/common/expences/main/crud")
);

// Payable Modal
const PayableModal = lazy(
  () => import("../components/common/expences/payable/form")
);

// Payment Modal
const PaymentForm = lazy(
  () => import("../components/common/expences/paid/PaymentForm")
);

// ExpencesCategories
const ExpenseCategoriesMain = lazy(
  () => import("../components/common/expences/categories/table")
);
const ExpenseCategoriesModal = lazy(
  () => import("../components/common/expences/categories/crud")
);
const PersonelMain = lazy(() => import("../components/common/personel/table"));

const PersonelModal = lazy(() => import("../components/common/personel/crud"));
const PersonelDetail = lazy(
  () => import("../components/common/personel/personelDetail/index")
);
const PersonelTuitionFeeCrud = lazy(
  () =>
    import("../components/common/personel/personelDetail/tabs/ders-ucreti/crud")
);
const PersonelCouponCrud = lazy(
  () => import("../components/common/personel/personelDetail/tabs/kupon/crud")
);
const PersonelSpecialCrud = lazy(
  () =>
    import("../components/common/personel/personelDetail/tabs/ozel-ders/crud")
);
const PersonelCoachingCrud = lazy(
  () => import("../components/common/personel/personelDetail/tabs/kocluk/crud")
);
const InvoiceTable = lazy(() => import("../components/common/invoice/table"));
const Invoicedetail = lazy(() => import("../components/common/invoice/detail"));
const Createinvoice = lazy(
  () => import("../components/common/invoice/auto_create_invoice")
);
const CombineFinalRegister = lazy(
  () => import("../components/common/student/final-register/combine")
);

const SchoolTypeCrud = lazy(
  () =>
    import(
      "../components/common/academic/educational_structure/school_types/crud"
    )
);

// Educational Structure School Level Crud
const LevelCrud = lazy(
  () =>
    import(
      "../components/common/academic/educational_structure/school_level/crud"
    )
);

// Educational Structure Class Level Crud
const ClassLevelCrud = lazy(
  () =>
    import(
      "../components/common/academic/educational_structure/class_level/crud"
    )
);

// Educational Structure Track Crud
const TrackCrud = lazy(
  () => import("../components/common/academic/educational_structure/track/crud")
);

const Questionlabeling = lazy(
  () => import("../components/common/questionlabeling/table")
);

import OverduePaymentsPage from "../components/common/overduePayments/Table";
import { IQuizTime } from "../types/quizTimes/list";
const SeasonsListPage = lazy(
  () => import("../components/common/seasons/table")
);
const SeasonModal = lazy(() => import("../components/common/seasons/crud"));

//assignmentStudents 

//ödev takip
//index
import HomeworkTrackingPage from "../components/common/homework/index";
//planlanan ödevler
import PlannedAssignmentsTable from "./../components/common/homework/pages/plannedAssignments/table";
import AssignmentCrudModal from "../components/common/homework/pages/plannedAssignments/crud";
//ödev tanımlama
import DefiningHomeworkPage from "../components/common/homework/pages/assignmentsDefinition/table";
import AssignmentStudentCrudModal from "../components/common/homework/pages/assignmentsDefinition/crud";
//ödev kontrolu
import AssignmentsCheckTable from "../components/common/homework/pages/assignmentsCheck/table";
import AssignmentsCheckCrudModal from "../components/common/homework/pages/assignmentsCheck/crud";
//ödev listesi
import AssignmentsListTable from "../components/common/homework/pages/assignmentsList/table";
import AssignmentsListCrudModal from "../components/common/homework/pages/assignmentsList/crud";
//ödev sayıları
import GivenHomeworkCount from "../components/common/homework/pages/assignmentsCount/assigned/table"
import PlannedHomeworkCount from "../components/common/homework/pages/assignmentsCount/planned/table";
import CompletedHomeworkCount from "../components/common/homework/pages/assignmentsCount/resolved/table";
import AssignmentsCountPage from "../components/common/homework/pages/assignmentsCount/index";

//yoklama sayfaları
import ExecutiveStatusTable from "../components/common/pollingManagement/class-course/pages/executiveStatus/table";
import ExecutiveStatusCrud from "../components/common/pollingManagement/class-course/pages/executiveStatus/crud";
import PollingListTable from "../components/common/pollingManagement/class-course/pages/pollingList/table";
import PollingCountsTable from "../components/common/pollingManagement/class-course/pages/pollingCounts/table";
import PollingManagementPage from "../components/common/pollingManagement/class-course/index";
import PollingListDetailTable from "../components/common/pollingManagement/class-course/pages/pollingList/crud";


import ClubGroupPlanTable from "../components/common/pollingManagement/clupPolling/pages/clupPlan/table"
import ClubPlanModal from "../components/common/pollingManagement/clupPolling/pages/clupPlan/crud"
import ClubProgramTable from "../components/common/pollingManagement/clupPolling/pages/clupProgram/table"
import ClubPollingTable from "../components/common/pollingManagement/clupPolling/pages/clupPolling/table"
import ClubCountTable from "../components/common/pollingManagement/clupPolling/pages/clupCount/table"
import ClupPollingManagementPage from "../components/common/pollingManagement/clupPolling/index";
import TeacherOneByOnePlanTable from "../components/common/pollingManagement/oneToOne/pages/teacher/table";
import OneToOnePlanTable from "../components/common/pollingManagement/oneToOne/pages/plan/table";
import OneToOnePollingTable from "../components/common/pollingManagement/oneToOne/pages/polling/table";
import OneToOneTeacherCountTable from "../components/common/pollingManagement/oneToOne/pages/countTeacher/table";
import OneToOneStudentCountTable from "../components/common/pollingManagement/oneToOne/pages/countStudent/table";
import OneToOneManagementPage from "../components/common/pollingManagement/oneToOne/index";
//yemek
import FoodGroupPlanTable from "../components/common/pollingManagement/foodPolling/pages/groupPlan/table";
import FoodPlanModal from "../components/common/pollingManagement/foodPolling/pages/groupPlan/crud";
import FoodPollingCountsTable from "../components/common/pollingManagement/foodPolling/pages/pollingCount/table";
import FoodAttendanceTable from "../components/common/pollingManagement/foodPolling/pages/foodPolling/table";
import FoodOfficerListTable from "../components/common/pollingManagement/foodPolling/pages/officerList/table";
import FoodOfficerModal from "../components/common/pollingManagement/foodPolling/pages/officerList/crud";
import FoodPollingIndex from "../components/common/pollingManagement/foodPolling/index";
//etüt
import StudyPlanTable from "../components/common/pollingManagement/studyPolling/pages/studyPlan/table";
import StudyPlanModal from "../components/common/pollingManagement/studyPolling/pages/studyPlan/crud";
import StudyProgramTable from "../components/common/pollingManagement/studyPolling/pages/studyProgram/table";
import StudyPollingTable from "../components/common/pollingManagement/studyPolling/pages/studyPolling/table";
import StudyCountTable from "../components/common/pollingManagement/studyPolling/pages/pollingCount/table";
import StudyPollingPage from "../components/common/pollingManagement/studyPolling/index";
import StudyProgramCrud from "../components/common/pollingManagement/studyPolling/pages/studyProgram/crud";
import StudyCountDetailModal from "../components/common/pollingManagement/studyPolling/pages/pollingCount/crud";
import DemandManagementTable from "../components/common/pollingManagement/personel-teachers/pages/demandManagement/table";
import DailyPollingTable from "../components/common/pollingManagement/personel-teachers/pages/daily/table";
import PollingCountTable from "../components/common/pollingManagement/personel-teachers/pages/count/table";
import StaffPollingManagementPage from "../components/common/pollingManagement/personel-teachers/index";
import TeacherPlanCrudModal from "../components/common/pollingManagement/oneToOne/pages/teacher/crud";




export const Routedata = [
  //**** Dashboards ****//

  {
    id: 1,
    path: `${import.meta.env.BASE_URL}dashboard/sales`,
    element: <Analytics />,
  },
  { id: 2, path: `${import.meta.env.BASE_URL}branch`, element: <Branch /> },
  {
    id: 3,
    path: `${import.meta.env.BASE_URL}branchcrud/:id?`,
    element: (
      <BranchModal
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 4,
    path: `${import.meta.env.BASE_URL}student/pre-register`,
    element: <StudentList />,
  },
  {
    id: 5,
    path: `${import.meta.env.BASE_URL}course/list`,
    element: <CourseList />,
  },
  {
    id: 7,
    path: `${import.meta.env.BASE_URL}coursecrud/:id?`,
    element: (
      <CourseModal
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },

  {
    id: 7,
    path: `${import.meta.env.BASE_URL}suppliercrud/:id?`,
    element: (
      <SupplierCrud
        show={true}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },

  {
    id: 8,
    path: `${import.meta.env.BASE_URL}course/crud/:id?`,
    element: <CourseCrud />,
  },
  { id: 9, path: `${import.meta.env.BASE_URL}school`, element: <School /> },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}schoolcrud/:id?`,
    element: (
      <SchoolModal
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  { id: 11, path: `${import.meta.env.BASE_URL}incomes`, element: <Incomes /> },
  { id: 12, path: `${import.meta.env.BASE_URL}debts`, element: <Debts /> },
  {
    id: 13,
    path: `${import.meta.env.BASE_URL}discountlist`,
    element: <DiscountStudent />,
  },
  {
    id: 14,
    path: `${import.meta.env.BASE_URL}transfer`,
    element: <TransferTable />,
  },
  {
    id: 15,
    path: `${import.meta.env.BASE_URL}transfers/crud/:id?`,
    element: (
      <TransferCrud
        show={true}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}OverduePayments`,
    element: <OverduePaymentsPage />,
  },
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}questionlabeling`,
    element: <Questionlabeling />,
  },
  {
    id: 2,
    path: `${import.meta.env.BASE_URL}supplier`,
    element: <SupplierList />,
  },

  {
    id: 10,
    path: `${import.meta.env.BASE_URL}supplierdetail/:id?`,
    element: (
      <SupplierDetail
        show={true}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        supplier={{
          id: 0,
          name: "",
        }}
      />
    ),
  },

  {
    id: 10,
    path: `${import.meta.env.BASE_URL}supplierDebtCrud/:id?`,
    element: <SupplierDebtCrud />,
  },

  {
    id: 10,
    path: `${import.meta.env.BASE_URL}supplierinvoicecrud/:id?`,
    element: <SupplierInvoiceCrud />,
  },

  {
    id: 10,
    path: `${import.meta.env.BASE_URL}supplierRefundCrud/:id?`,
    element: <SupplierRefundCrud />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}supplierPaymentCrud/:id?`,
    element: <SupplierPaymentCrud />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}supplierNoteCrud/:id?`,
    element: <SupplierNoteCrud />,
  },

  // Meetings
  {
    id: 70,
    path: `${import.meta.env.BASE_URL}meetings`,
    element: <Meeting />,
  },
  {
    id: 71,
    path: `${import.meta.env.BASE_URL}meetingscrud/:id?`,
    element: (
      <MeetingCrud
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  // Student Meeting Modal
  {
    id: 72,
    path: `${import.meta.env.BASE_URL}studentmeetings`,
    element: <StudentMeetingTable />,
  },

  //**** Dashboards ****//
  {
    id: 70,
    path: `${import.meta.env.BASE_URL}meetings`,
    element: <Meeting />,
  },
  {
    id: 71,
    path: `${import.meta.env.BASE_URL}meetingscrud/:id?`,
    element: (
      <MeetingCrud
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  // Student Meeting Modal
  {
    id: 72,
    path: `${import.meta.env.BASE_URL}studentmeetings`,
    element: <StudentMeetingTable />,
  },

  //Expenses
  {
    id: 17,
    path: `${import.meta.env.BASE_URL}summary`,
    element: <ExpenseSummary />,
  },
  {
    id: 18,
    path: `${import.meta.env.BASE_URL}expenses`,
    element: <ExpenseMain />,
  },
  {
    id: 19,
    path: `${import.meta.env.BASE_URL}expensecrud/:id?`,
    element: (
      <ExpenseCrud
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 20,
    path: `${import.meta.env.BASE_URL}expensecrud/categories`,
    element: <ExpenseCategoriesMain />,
  },
  {
    id: 21,
    path: `${import.meta.env.BASE_URL}expensecrud/categories/:id`,
    element: (
      <ExpenseCategoriesModal
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 22,
    path: `${import.meta.env.BASE_URL}expensecrud/categories/create`,
    element: (
      <ExpenseCategoriesModal
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  // Payable Modal Route
  {
    id: 23,
    path: `${import.meta.env.BASE_URL}expenses/payable`,
    element: <PayableModal />,
  },
  // Payment Modal Route
  {
    id: 24,
    path: `${import.meta.env.BASE_URL}expenses/payment`,
    element: (
      <PaymentForm
        show={true}
        onClose={() => {
          // Navigate back when the modal is closed
          window.history.back();
        }}
      />
    ),
  },

  {
    id: 20,
    path: `${import.meta.env.BASE_URL}personel`,
    element: <PersonelMain />,
  },
  {
    id: 21,
    path: `${import.meta.env.BASE_URL}personelcrud/:id?`,
    element: <PersonelModal />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personeldetail/:id?`,
    element: <PersonelDetail show={true} onClose={function (): void { }} />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelCompensationCrud/:id?`,
    element: <PersonelCompensationCrud />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelWeeklyLessonCrud/:id?`,
    element: <PersonelWeeklyLessonCrud />,
  },

  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelSalaryDebtCrud/:id?`,
    element: <PersonelSalaryDebtCrud />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelSalaryPaymentCrud/:id?`,
    element: <PersonelSalaryPaymentCrud />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelPrimlerCrud/:id?`,
    element: <PersonelPrimlerCrud />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelIadeCrud/:id?`,
    element: <PersonelIadeCrud />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelKesintiCrud/:id?`,
    element: <PersonelKesintiCrud />,
  },

  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelSpecialCrud/:id?`,
    element: <PersonelSpecialCrud />,
  },

  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelCouponCrud/:id?`,
    element: <PersonelCouponCrud />,
  },

  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelTuitionFeeCrud/:id?`,
    element: <PersonelTuitionFeeCrud />,
  },
  {
    id: 10,
    path: `${import.meta.env.BASE_URL}personelCoachingCrud/:id?`,

    element: <PersonelCoachingCrud />,
  },

  {
    id: 23,
    path: `${import.meta.env.BASE_URL}invoice`,
    element: <InvoiceTable />,
  },
  {
    id: 23,
    path: `${import.meta.env.BASE_URL}invoicedetail/:studentId`,
    element: (
      <Invoicedetail
        show={true}
        onHide={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 23,
    path: `${import.meta.env.BASE_URL}createinvoice/:studentId`,
    element: (
      <Createinvoice
        show={true}
        onHide={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 23,
    path: `${import.meta.env.BASE_URL}final-register/:studentId?`,
    element: <CombineFinalRegister />,
  },
  {
    id: 23,
    path: `${import.meta.env.BASE_URL}pre-register/list`,
    element: <PreRegisterList />,
  },
  {
    id: 23,
    path: `${import.meta.env.BASE_URL}pre-register/crud/:id?`,
    element: (
      <PreRegisterCrud
        show={true}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 23,
    path: `${import.meta.env.BASE_URL}calculate`,
    element: <Calculate />,
  },
  {
    id: 23,
    path: `${import.meta.env.BASE_URL}student/import`,
    element: <StudentImport />,
  },
  {
    id: 8,
    path: `${import.meta.env.BASE_URL}appointments`,
    element: <AppointmentsList />,
  },
  {
    id: 9,
    path: `${import.meta.env.BASE_URL}appointmentscrud/:student_id`,
    element: (
      <AppointmentModal
        show={true}
        detay=""
        token=""
        onClose={() => {
          window.history.back();
        }}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 71,
    path: `${import.meta.env.BASE_URL}appointmentsdetail/:id?`,
    element: <Appointmentsdetail />,
  },
  {
    id: 76,
    path: `${import.meta.env.BASE_URL}service-management/`,
    element: <ServiceManagement />,
  },
  {
    id: 77,
    path: `${import.meta.env.BASE_URL}servicetype-table/`,
    element: <ServiceTypeManagementTable />,
  },
  {
    id: 78,
    path: `${import.meta.env.BASE_URL}servicetype-crud/:id?`,
    element: (
      <ServiceTypeManagementCrud
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 79,
    path: `${import.meta.env.BASE_URL}discounts/crud/:id?`,
    element: (
      <DiscountCrud
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 80,
    path: `${import.meta.env.BASE_URL}service-crud/:id?`,
    element: (
      <ServiceManagementCrud
        show={true}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 39,
    path: `${import.meta.env.BASE_URL}internals`,
    element: <InternalsTable />,
  },
  {
    id: 40,
    path: `${import.meta.env.BASE_URL}internals/detail/:id`,
    element: (
      <InternalModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 35,
    path: `${import.meta.env.BASE_URL}school-type`,
    element: <SchoolTypes />,
  },
  {
    id: 36,
    path: `${import.meta.env.BASE_URL}school-type/crud/:id?`,
    element: (
      <SchoolTypeModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 37,
    path: `${import.meta.env.BASE_URL}seasons`,
    element: <SeasonsListPage />,
  },
  {
    id: 38,
    path: `${import.meta.env.BASE_URL}seasons/crud/:id?`,
    element: (
      <SeasonModal
        show={true}
        onClose={() => {
          window.history.back();
        }}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 81,
    path: `${import.meta.env.BASE_URL}educational-structure`,
    element: <EducationalStructure />,
  },
  {
    id: 82,
    path: `${import.meta.env.BASE_URL
      }educational-structure/schooltype-crud/:id?`,
    element: (
      <SchoolTypeCrud
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 83,
    path: `${import.meta.env.BASE_URL}educational-structure/level-crud/:id?`,
    element: (
      <LevelCrud
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 84,
    path: `${import.meta.env.BASE_URL
      }educational-structure/classlevel-crud/:id?`,
    element: (
      <ClassLevelCrud
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 85,
    path: `${import.meta.env.BASE_URL}educational-structure/track-crud/:id?`,
    element: (
      <TrackCrud
        show={true}
        token={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 73,
    path: `${import.meta.env.BASE_URL}studentpaymentdetails`,
    element: <StudentPaymentDetails />,
  },
  // Student Payment Detail Modal
  {
    id: 74,
    path: `${import.meta.env.BASE_URL}studentpaymentdetails/:id`,
    element: (
      <StudentPaymentDetailModal
        show={true}
        onClose={function (): void {
          window.history.back();
        }}
        student={{
          id: 0,
          name: "",
        }}
      />
    ),
  },
  {
    id: 75,
    path: `${import.meta.env.BASE_URL}studentinstallmentcrud/:id`,
    element: <StudentPaymentCrud />,
  },
  {
    id: 41,
    path: `${import.meta.env.BASE_URL}quiz/scholar/scholarmain`,
    element: <ScholarshipTable />,
  },
  {
    id: 42,
    path: `${import.meta.env.BASE_URL}scholarships/crud/:id?`,
    element: (
      <ScholarshipModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 43,
    path: `${import.meta.env.BASE_URL}scholarships/days`,
    element: <ScholarShipDayTable />,
  },

  {
    id: 44,
    path: `${import.meta.env.BASE_URL}scholarships/days/crud/:id?`,
    element: (
      <ScholarShipDayModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => { }}
      />
    ),
  },

  {
    id: 45,
    path: `${import.meta.env.BASE_URL}scholarships/sessions`,
    element: (
      <ScholarShipSessionTable
        enabled={false}
        onSelectTime={function (_time: IQuizTime | null): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    id: 46,
    path: `${import.meta.env.BASE_URL}scholarships/sessions/crud/:id?`,
    element: (
      <ScholarShipSessionModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 47,
    path: `${import.meta.env.BASE_URL}scholarships/classlevel`,
    element: <ScholarShipClassLevelTable />,
  },
  {
    id: 48,
    path: `${import.meta.env.BASE_URL}scholarships/classlevel/crud/:id?`,
    element: (
      <ScholarShipClassLevelModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 49,
    path: "/scholarships/classroom",

    element: <ScholarShipClassroomTable session={null} time={null} />,
  },
  {
    id: 50,
    path: "/scholarships/classroom/crud/:quizClassroomId?",
    element: (
      <ScholarShipClassroomModal
        show={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onRefresh={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },

  {
    id: 51,
    path: `${import.meta.env.BASE_URL}scholarships/index/:id`,
    element: <ScholarshipIndex />,
  },

  // exams
  {
    id: 52,
    path: `${import.meta.env.BASE_URL}exams/examResult`,
    element: <ExamsResult />,
  },
  {
    id: 53,
    path: `${import.meta.env.BASE_URL}exams/examAnalysis`,
    element: <ExamAnalysis />,
  },
  // Guidance
  {
    id: 54,
    path: `${import.meta.env.BASE_URL}guidance/guide`,
    element: <Guidance />,
  },

  //ödev takip
  {
    id: 55,
    path: `${import.meta.env.BASE_URL}homework/index`,
    element: <HomeworkTrackingPage />,
  },
  //planlanan ödevler
  {
    id: 56,
    path: `${import.meta.env.BASE_URL}homework/plannedAssignments`,
    element: <PlannedAssignmentsTable />,
  },
  {
    id: 57,
    path: `${import.meta.env.BASE_URL}plannedhomework/crud/:id?`,
    element: (
      <AssignmentCrudModal
        show
        onClose={() => { }}
        onRefresh={() => { }}
      />
    ),
  },



  //ödev tanımlama
  {
    id: 58,
    path: `${import.meta.env.BASE_URL}homework/definingHomework`,
    element: <DefiningHomeworkPage />,
  },
  {

    id: 59,
    path: `${import.meta.env.BASE_URL}homework/definingHomework/crud/:id?`,
    element: (
      <AssignmentStudentCrudModal
        show
        onClose={() => { }}
        onRefresh={() => { }}
      />
    ),
  },


  //ödev kontrolu
  {
    id: 60,
    path: `${import.meta.env.BASE_URL}homework/checkAssignments`,
    element: <AssignmentsCheckTable />,
  },

  {
    id: 61,
    path: `${import.meta.env.BASE_URL}checkAssignments/crud/:id`,
    element: <AssignmentsCheckCrudModal show={false} token={""} onClose={function (): void {
      throw new Error("Function not implemented.");
    }} onRefresh={function (): void {
      throw new Error("Function not implemented.");
    }} />,
  },
  //ödev listesi
  {
    id: 62,
    path: `${import.meta.env.BASE_URL}homework/assignmentsList`,
    element: <AssignmentsListTable />,
  },

  {
    id: 63,
    path: `${import.meta.env.BASE_URL}assignmentsList/crud/:id`,
    element: (
      <AssignmentsListCrudModal
        show={false}
        token=""
        onClose={() => { }}
        onRefresh={() => { }}
      />
    ),
  },
  //ödev sayıları
  {
    id: 64,
    path: `${import.meta.env.BASE_URL}homework/assignmentsCount/assigned`,
    element: <GivenHomeworkCount />,
  },
  {
    id: 65,
    path: `${import.meta.env.BASE_URL}homework/assignmentsCount/planned`,
    element: <PlannedHomeworkCount />,
  },
  {
    id: 66,
    path: `${import.meta.env.BASE_URL}homework/assignmentsCount/resolved`,
    element: <CompletedHomeworkCount />,
  },


  {
    id: 67,
    path: `${import.meta.env.BASE_URL}assignmentsCount/index`,
    element: <AssignmentsCountPage />,
  },

  //yoklama yönetimi
  //sınıf-ders yoklaması
  {
    id: 68,
    path: `${import.meta.env.BASE_URL}pollingManagement/executiveStatus`,
    element: <ExecutiveStatusTable />,
  },
  {
    id: 69,
    path: `${import.meta.env.BASE_URL}executiveStatus/crud`,
    element: <ExecutiveStatusCrud />,
  },
  {
    id: 68,
    path: `${import.meta.env.BASE_URL}pollingManagement/pollingList`,
    element: <PollingListTable />,
  },
  {
    id: 68,
    path: `${import.meta.env.BASE_URL}pollingManagement/pollingCounts`,
    element: <PollingCountsTable />,
  },
  {
    id: 67,
    path: `${import.meta.env.BASE_URL}pollingManagement/index`,
    element: <PollingManagementPage />,
  },
  {
    id: 68,
    path: `${import.meta.env.BASE_URL}pollingManagement/details/:id`,
    element: <PollingListDetailTable />,
  },
  {
    id: 68,
    path: `${import.meta.env.BASE_URL}pollingManagement/foodPolling`,
    element: <FoodGroupPlanTable />,
  },
  //yemek
  //1:yemek planlama
  {
    id: 68,
    path: `${import.meta.env.BASE_URL}pollingManagement/foodGroupPlan`,
    element: <FoodGroupPlanTable />,
  },
  {
    id: 68,
    path: `${import.meta.env.BASE_URL}pollingManagement/FoodPlanModal/:id?`,
    element: (
      <FoodPlanModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => { }}
      />
    ),
  },
  //görevli listesi
  // Görevli listesi
  {
    id: 600,
    path: `${import.meta.env.BASE_URL}pollingManagement/foodOfficerList`,
    element: <FoodOfficerListTable />,
  },
  {
    id: 601,                       // benzersiz id
    path: `${import.meta.env.BASE_URL}pollingManagement/foodOfficerList/:id?`,
    element: (
      <FoodOfficerModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => { /* tablo refresh’ini üst bileşende tetikleyin */ }}
      />
    ),
  },
  //3:yemek yoklama
  {
    id: 6339,
    path: `${import.meta.env.BASE_URL}pollingManagement/foodPollings`,
    element: <FoodAttendanceTable />,
  },
  //4:yoklama sayıları
  {
    id: 6338,
    path: `${import.meta.env.BASE_URL}pollingManagement/foodPollingCount`,
    element: <FoodPollingCountsTable />,
  },
  //yemek index
  {
    id: 67,
    path: `${import.meta.env.BASE_URL}pollingManagement/foodindex`,
    element: <FoodPollingIndex />,
  },

  //etüt yoklama
  {
    id: 6338,
    path: `${import.meta.env.BASE_URL}pollingManagement/studyPlan`,
    element: <StudyPlanTable />,
  },

  {
    id: 710,
    path: `${import.meta.env.BASE_URL}pollingManagement/studyPlan/crud/:id?`,
    element: (
      <StudyPlanModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 6338,
    path: `${import.meta.env.BASE_URL}pollingManagement/studyProgram`,
    element: <StudyProgramTable />,
  },
  //ekle ve crudunu unutma

  {
    id: 601,
    path: `${import.meta.env.BASE_URL}pollingManagement/studyProgram/:id?`,
    element: (
      <StudyProgramCrud
        // show={true}
        // onClose={() => window.history.back()}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 6366,
    path: `${import.meta.env.BASE_URL}pollingManagement/studyPolling`,
    element: <StudyPollingTable />,
  },
  {
    id: 6366,
    path: `${import.meta.env.BASE_URL}pollingManagement/studyCounts`,
    element: <StudyCountTable />,
  },
  {
    id: 601,
    path: `${import.meta.env.BASE_URL}pollingManagement/studyCounts/:id`,
    element: (
      <StudyCountDetailModal
        show={true}
        onClose={() => window.history.back()} attendanceId={0} />
    ),
  },
  {
    id: 67,
    path: `${import.meta.env.BASE_URL}pollingManagement/studyindex`,
    element: <StudyPollingPage />,
  },








  //kulüp yoklama
  {
    id: 71,
    path: `${import.meta.env.BASE_URL}pollingManagement/clupsPollings`,
    element: <ClubPollingTable />,
  },
  {
    id: 69,
    path: `${import.meta.env.BASE_URL}pollingManagement/clupsPolling`,
    element: <ClubGroupPlanTable />,
  },
  {
    id: 70,
    path: `${import.meta.env.BASE_URL}pollingManagement/clupsPolling/crud/:id?`,
    element: (
      <ClubPlanModal
        show
        onClose={() => { }}
        onRefresh={() => { }}
      />
    ),
  },
  {
    id: 71,
    path: `${import.meta.env.BASE_URL}pollingManagement/clupsProgram`,
    element: <ClubProgramTable />,
  },

  {
    id: 71,
    path: `${import.meta.env.BASE_URL}pollingManagement/clupsCounts`,
    element: <ClubCountTable />,
  },
  {
    id: 72,
    path: `${import.meta.env.BASE_URL}pollingManagement/clupindex`,   // örnek
    element: <ClupPollingManagementPage />,
  },
  //birebir
  {
    id: 73,
    path: `${import.meta.env.BASE_URL}onebyonePolling/teacherPlan`,
    element: <TeacherOneByOnePlanTable />,
  },
  {
    id: 773,
    path: `${import.meta.env.BASE_URL}onebyonePolling/teacherPlan/crud/:id?`,
    element: (
      <TeacherPlanCrudModal
        show={true}
        onClose={() => window.history.back()}
        onRefresh={() => {/* listeyi yenile */ }}
      />
    ),
  },







  {
    id: 74,
    path: `${import.meta.env.BASE_URL}pollingManagement/oneToOnePlan`,
    element: <OneToOnePlanTable />,
  },

  //EŞLEŞTİR



  {
    id: 75,
    path: `${import.meta.env.BASE_URL}pollingManagement/oneToOnePolling`,
    element: <OneToOnePollingTable />,
  },
  {
    id: 76,
    path: `${import.meta.env.BASE_URL}pollingManagement/oneToOneTeacherCount`,
    element: <OneToOneTeacherCountTable />,
  },
  {
    id: 77,
    path: `${import.meta.env.BASE_URL}pollingManagement/oneToOneStudentCount`,
    element: <OneToOneStudentCountTable />,
  },
  {
    id: 78,
    path: `${import.meta.env.BASE_URL}pollingManagement/OneToOneManagementPageİndex`,
    element: <OneToOneManagementPage />,
  },


  //personel-ögretmen yoklama
  {
    id: 2277,
    path: `${import.meta.env.BASE_URL}pollingManagement/DemandManagement`,
    element: <DemandManagementTable />,
  },
  {
    id: 2707,
    path: `${import.meta.env.BASE_URL}pollingManagement/daily`,
    element: <DailyPollingTable />,
  },
  {
    id: 2710,
    path: `${import.meta.env.BASE_URL}pollingManagement/dailyCounts`,
    element: <PollingCountsTable />,
  },
  {
    id: 2750,
    path: `${import.meta.env.BASE_URL}pollingManagement/staffindex`,
    element: <StaffPollingManagementPage />,
  }




];
