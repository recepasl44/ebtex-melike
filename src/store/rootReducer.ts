import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../slices/auth/login/reducer';
import reducer from '../components/common/ui/redux/reducer';
import addInstallmentReducer from '../slices/Installment/add/reducer';
import updateInstallmentReducer from '../slices/Installment/update/reducer';
import deleteInstallmentReducer from '../slices/Installment/delete/reducer';
import showInstallmentReducer from '../slices/Installment/show/reducer';
import listInstallmentsReducer from '../slices/Installment/list/reducer';
import studentListReducer from '../slices/student/list/reducer';
import studentShowReducer from '../slices/student/show/reducer';
import studentAddReducer from '../slices/student/add/reducer';
import studentUpdateReducer from '../slices/student/update/reducer';
import studentDeleteReducer from '../slices/student/delete/reducer';
import studentStep1Reducer from '../slices/student/step1/reducer';
import studentStep2Reducer from '../slices/student/step2/reducer';
import studentStep3Reducer from '../slices/student/step3/reducer';
import studentStep4Reducer from '../slices/student/step4/reducer';
import studentImportReducer from '../slices/student/import/reducer';
import studentRegisterNoReducer from '../slices/student/registerNo/reducer';
import studentInternalsReducer from '../slices/student/internals/reducer';
import countyListReducer from '../slices/counties/list/reducer';
import branchListReducer from '../slices/branch/list/reducer';
import branchShowReducer from '../slices/branch/show/reducer';
import branchAddReducer from '../slices/branch/add/reducer';
import branchUpdateReducer from '../slices/branch/update/reducer';
import branchDeleteReducer from '../slices/branch/delete/reducer';
import schoolTypeAddSlice from "../slices/schoolTypes/add/reducer";
import schoolTypeDeleteSlice from "../slices/schoolTypes/delete/reducer";
import schoolTypeListSlice from "../slices/schoolTypes/list/reducer";
import schoolTypeShowSlice from "../slices/schoolTypes/list/reducer";
import schoolTypeUpdateSlice from "../slices/schoolTypes/update/reducer";
//
import courseListSlice from '../slices/courses/list/reducer';
import courseShowSlice from '../slices/courses/detail/reducer';
import courseAddSlice from '../slices/courses/add/reducer'; // Assuming you have a courseListSlice for adding courses
import coursesUpdateSlice from '../slices/courses/update/reducer'; // Assuming you have a courseListSlice for updating courses
import courseDeleteSlice from '../slices/courses/delete/reducer'; // Assuming you have a courseListSlice for deleting courses
import incomeListSlice from '../slices/Income/list/reducer'; // Assuming you have a courseListSlice for listing courses
import otherIncomeListReducer from '../slices/otherIncome/list/reducer';
import otherIncomeAddReducer from '../slices/otherIncome/add/reducer';
import otherIncomeUpdateReducer from '../slices/otherIncome/update/reducer';
import otherIncomeDeleteReducer from '../slices/otherIncome/delete/reducer';
import otherIncomeShowReducer from '../slices/otherIncome/show/reducer';
import estimatedBudgetListReducer from '../slices/estimatedBudget/list/reducer';
import DebtListSlice from '../slices/suppliers/debt/list/reducer'; // Assuming you have a courseListSlice for listing courses
import discountStudentListSlice from '../slices/discountStudent/list/reducer'; // Assuming you have a courseListSlice for listing courses

import internalSummarySlice from "../slices/internal/list/reducer";

// Suppliers
import supplierUpdateSlice from '../slices/suppliers/supplier/update/reducer'
import supplierAddReducer from '../slices/suppliers/supplier/add/reducer';
import supplierDeleteReducer from '../slices/suppliers/supplier/delete/reducer';
import supplierListReducer from '../slices/suppliers/supplier/list/reducer';
import supplierShowReducer from '../slices/suppliers/supplier/show/reducer';
import overduePaymentsSlice from '../slices/overduePayments/list/reducer'; // Assuming you have a courseListSlice for listing courses
import bulletinListSlice from '../slices/bulletins/list/reducer';
import bulletinShowSlice from '../slices/bulletins/detail/reducer';
import bulletinAddSlice from '../slices/bulletins/add/reducer';
import bulletinUpdateSlice from '../slices/bulletins/update/reducer';
import bulletinDeleteSlice from '../slices/bulletins/delete/reducer';
// Transfers
import transferListSlice from '../slices/transfers/list/reducer'; // Assuming you have a courseListSlice for listing courses
import transferAddSlice from '../slices/transfers/add/reducer'; // Assuming you have a courseListSlice for adding courses
import transferUpdateSlice from '../slices/transfers/update/reducer'; // Assuming you have a courseListSlice for updating courses
import transferDeleteSlice from '../slices/transfers/delete/reducer'; // Assuming you have a courseListSlice for deleting courses
import transferShowSlice from '../slices/transfers/show/reducer'; // Assuming you have a courseListSlice for showing courses
// ExpencesSummary
import expencesSummaryReducer from '../slices/expences/summary/reducer';
// Expences
import expencesListReducer from '../slices/expences/main/list/reducer';
import expencesAddReducer from '../slices/expences/main/add/reducer';
import expencesUpdateReducer from '../slices/expences/main/update/reducer';
import expencesDeleteReducer from '../slices/expences/main/delete/reducer';
import expencesShowReducer from '../slices/expences/main/detail/reducer';
// Categories
import getExpenceCategoriesListReducer from '../slices/expences/expenseCategories/list/reducer';
import getExpenceCategoriesAddReducer from '../slices/expences/expenseCategories/add/reducer';
import getExpenceCategoriesUpdateReducer from '../slices/expences/expenseCategories/update/reducer';
import getExpenceCategoriesDeleteReducer from '../slices/expences/expenseCategories/delete/reducer';
import getExpenceCategoriesShowReducer from '../slices/expences/expenseCategories/detail/reducer';
// Bank
import bankListReducer from '../slices/bank/list/reducer';
import bankAddReducer from '../slices/bank/add/reducer';
import bankUpdateReducer from '../slices/bank/update/reducer';
import bankDeleteReducer from '../slices/bank/delete/reducer';
import bankShowReducer from '../slices/bank/detail/reducer';
// Credit Card
import creditCardListReducer from '../slices/creditCard/list/reducer';
import creditCardAddReducer from '../slices/creditCard/add/reducer';
import creditCardUpdateReducer from '../slices/creditCard/update/reducer';
import creditCardDeleteReducer from '../slices/creditCard/delete/reducer';
import creditCardShowReducer from '../slices/creditCard/detail/reducer';
// Open Account
import openAccountListReducer from '../slices/openAccount/list/reducer';
import openAccountAddReducer from '../slices/openAccount/add/reducer';
import openAccountUpdateReducer from '../slices/openAccount/update/reducer';
import openAccountDeleteReducer from '../slices/openAccount/delete/reducer';
import openAccountShowReducer from '../slices/openAccount/detail/reducer';


// Employee => Personel
import personelListSlice from '../slices/employee/personel/list/reducer';
import personelAddSlice from '../slices/employee/personel/add/reducer';
import personelUpdateSlice from '../slices/employee/personel/update/reducer';
import personelDeleteSlice from '../slices/employee/personel/delete/reducer';
import personelShowSlice from '../slices/employee/personel/detail/reducer';
import personelMaasIndexSlice from '../slices/employee/salary/debt/custom_personel/reducer';
import classroomListSlice from '../slices/classrooms/list/reducer';
import classroomDetailSlice from '../slices/classrooms/detail/reducer';
import classroomAddSlice from '../slices/classrooms/add/reducer';
import classroomUpdateSlice from '../slices/classrooms/update/reducer';
import classroomDeleteSlice from '../slices/classrooms/delete/reducer';


import coursesDeleteSlice from '../slices/courses/update/reducer'; // Assuming you have a courseListSlice for listing courses
import programUpdateSlice from '../slices/programs/update/reducer';  // Program güncelleme slice
import programListSlice from '../slices/programs/list/reducer';  // Program listeleme slice
import programAddSlice from '../slices/programs/add/reducer';  // Program ekleme slice
import programDetailSlice from '../slices/programs/detail/reducer';
import programDeleteSlice from '../slices/programs/delete/reducer';
import levelListSlice from '../slices/levels/list/reducer';
import levelDetailSlice from '../slices/levels/detail/reducer';
import levelUpdateSlice from '../slices/levels/update/reducer';
import levelAddSlice from '../slices/levels/add/reducer';
import levelDeleteSlice from '../slices/levels/delete/reducer';

import curriculmListSlice from '../slices/curriculum/list/reducer';
import curriculmUpdateSlice from '../slices/curriculum/update/reducer';
import curriculmAddSlice from '../slices/curriculum/add/reducer';
import curriculmDeleteSlice from '../slices/curriculum/delete/reducer';
import curriculmDetailSlice from '../slices/curriculum/detail/reducer';

import unitsListSlice from '../slices/units/list/reducer';
import unitsShowSlice from '../slices/units/detail/reducer';
import unitsAddSlice from '../slices/units/add/reducer';
import unitsUpdateSlice from '../slices/units/update/reducer';
import unitsDeleteSlice from '../slices/units/delete/reducer';

import chaptersListSlice from '../slices/chapters/list/reducer';
import chaptersShowSlice from '../slices/chapters/detail/reducer';
import chaptersAddSlice from '../slices/chapters/add/reducer';
import chaptersUpdateSlice from '../slices/chapters/update/reducer';
import chaptersDeleteSlice from '../slices/chapters/delete/reducer';
import topicsListSlice from '../slices/topics/list/reducer';
import topicsShowSlice from '../slices/topics/detail/reducer';
import topicsAddSlice from '../slices/topics/add/reducer';
import topicsUpdateSlice from '../slices/topics/update/reducer';
import topicsDeleteSlice from '../slices/topics/delete/reducer';
import questionDifficultListSlice from '../slices/questiondifficults/list/reducer';
import questionDifficultShowSlice from '../slices/questiondifficults/detail/reducer';
import questionDifficultAddSlice from '../slices/questiondifficults/add/reducer';
import questionDifficultUpdateSlice from '../slices/questiondifficults/update/reducer';
import questionDifficultDeleteSlice from '../slices/questiondifficults/delete/reducer';
import questionTypeListSlice from '../slices/questiontypes/list/reducer';
import questionTypeShowSlice from '../slices/questiontypes/detail/reducer';
import questionTypeAddSlice from '../slices/questiontypes/add/reducer';
import questionTypeUpdateSlice from '../slices/questiontypes/update/reducer';
import questionTypeDeleteSlice from '../slices/questiontypes/delete/reducer';
import examRelevanceListSlice from '../slices/examrelevances/list/reducer';
import examRelevanceShowSlice from '../slices/examrelevances/detail/reducer';
import examRelevanceAddSlice from '../slices/examrelevances/add/reducer';
import examRelevanceUpdateSlice from '../slices/examrelevances/update/reducer';
import examRelevanceDeleteSlice from '../slices/examrelevances/delete/reducer';
import lessonListSlice from '../slices/lessons/list/reducer';
import lessonShowSlice from '../slices/lessons/detail/reducer';
import lessonAddSlice from '../slices/lessons/add/reducer';
import lessonUpdateSlice from '../slices/lessons/update/reducer';
import lessonDeleteSlice from '../slices/lessons/delete/reducer';
import questionsListSlice from '../slices/questions/list/reducer';
import questionShowSlice from '../slices/questions/detail/reducer';
import questionsAddSlice from '../slices/questions/add/reducer';
import questionsUpdateSlice from '../slices/questions/update/reducer';
import questionsDeleteSlice from '../slices/questions/delete/reducer';
import serviceTypesListSlice from '../slices/serviceTypes/list/reducer';
import serviceTypesAddSlice from '../slices/serviceTypes/add/reducer';
import serviceTypesUpdateSlice from '../slices/serviceTypes/update/reducer';
import serviceTypesDeleteSlice from '../slices/serviceTypes/delete/reducer';
import serviceTypesShowSlice from '../slices/serviceTypes/detail/reducer';

// Discounts
import discountListSlice from '../slices/discounts/list/reducer';
import discountAddSlice from '../slices/discounts/add/reducer';
import discountUpdateSlice from '../slices/discounts/update/reducer';
import discountDeleteSlice from '../slices/discounts/delete/reducer';
import discountShowSlice from '../slices/discounts/show/reducer';

// Services
import serviceListSlice from '../slices/services/list/reducer';
import serviceAddSlice from '../slices/services/add/reducer';
import serviceUpdateSlice from '../slices/services/update/reducer';
import serviceDeleteSlice from '../slices/services/delete/reducer';
import serviceShowSlice from '../slices/services/show/reducer';


// Schools
import schoolListReducer from '../slices/schools/list/reducer';
import schoolAddReducer from '../slices/schools/add/reducer';
import schoolDeleteReducer from '../slices/schools/delete/reducer';
import schoolShowState from '../slices/schools/show/reducer';
import schoolUpdateState from '../slices/schools/update/reducer';
import Test from '../slices/appointments/list/reducer';

// Appointments
import appointmentDeleteSlice from '../slices/appointments/delete/reducer';
import appointmentShowSlice from '../slices/appointments/detail/reducer';
import appointmentListSlice from '../slices/appointments/list/reducer';
import appointmentsAddSlice from '../slices/appointments/add/reducer';
import appointmentUpdateSlice from '../slices/appointments/update/reducer';

//season
import seasonsListSlice from '../slices/seasons/list/reducer';
import seasonsShowSlice from '../slices/seasons/detail/reducer';
import seasonsAddSlice from '../slices/seasons/add/reducer';
import seasonsUpdateSlice from '../slices/seasons/update/reducer';
import seasonsDeleteSlice from '../slices/seasons/delete/reducer';

//meeting
import meetingListSlice from '../slices/meetings/list/reducer';
import meetingShowSlice from '../slices/meetings/detail/reducer';
import meetingAddSlice from '../slices/meetings/add/reducer';
import meetingUpdateSlice from '../slices/meetings/update/reducer';
import meetingDeleteSlice from '../slices/meetings/delete/reducer';


//instruments
import instrumentsListSlice from '../slices/instruments/list/reducer';
import instrumentShowSlice from '../slices/instruments/show/reducer';
import instrumentsAddSlice from '../slices/instruments/add/reducer';
import instrumentsUpdateSlice from '../slices/instruments/update/reducer';
import instrumentsDeleteSlice from '../slices/instruments/delete/reducer';

import supplierDebtsListReducer from '../slices/supplierDebts/list/reducer'
import supplierDebtsDetailReducer from '../slices/supplierDebts/detail/reducer'
import supplierDebtsAddReducer from '../slices/supplierDebts/add/reducer'
import supplierDebtsUpdateReducer from '../slices/supplierDebts/update/reducer'
import supplierDebtsDeleteReducer from '../slices/supplierDebts/delete/reducer'

import supplierRefundsListReducer from '../slices/supplierRefunds/list/reducer'
import supplierRefundsDetailReducer from '../slices/supplierRefunds/detail/reducer'
import supplierRefundsAddReducer from '../slices/supplierRefunds/add/reducer'
import supplierRefundsUpdateReducer from '../slices/supplierRefunds/update/reducer'
import supplierRefundsDeleteReducer from '../slices/supplierRefunds/delete/reducer'

import supplierInvoicesListReducer from '../slices/supplierInvoices/list/reducer'
import supplierInvoicesDetailReducer from '../slices/supplierInvoices/detail/reducer'
import supplierInvoicesAddReducer from '../slices/supplierInvoices/add/reducer'
import supplierInvoicesUpdateReducer from '../slices/supplierInvoices/update/reducer'
import supplierInvoicesDeleteReducer from '../slices/supplierInvoices/delete/reducer'


import supplierNotesListReducer from '../slices/supplierNotes/list/reducer'
import supplierNotesDetailReducer from '../slices/supplierNotes/detail/reducer'
import supplierNotesAddReducer from '../slices/supplierNotes/add/reducer'
import supplierNotesUpdateReducer from '../slices/supplierNotes/update/reducer'
import supplierNotesDeleteReducer from '../slices/supplierNotes/delete/reducer'

import supplierPaymentsListReducer from '../slices/supplierPayments/list/reducer'
import supplierPaymentsDetailReducer from '../slices/supplierPayments/detail/reducer'
import supplierPaymentsAddReducer from '../slices/supplierPayments/add/reducer'
import supplierPaymentsUpdateReducer from '../slices/supplierPayments/update/reducer'
import supplierPaymentsDeleteReducer from '../slices/supplierPayments/delete/reducer'

import invoiceSerialReducer from '../slices/supplierInvoices/nextSerial/reducer'
import coachingListReducer from "../slices/employee/coaching/list/reducer";
import coachingShowReducer from "../slices/employee/coaching/detail/reducer";
import coachingAddReducer from "../slices/employee/coaching/add/reducer";
import coachingUpdateReducer from "../slices/employee/coaching/update/reducer";
import coachingDeleteReducer from "../slices/employee/coaching/delete/reducer";

import compensationListReducer from "../slices/employee/compensation/list/reducer";
import compensationShowReducer from "../slices/employee/compensation/show/reducer";
import compensationAddReducer from "../slices/employee/compensation/add/reducer";
import compensationUpdateReducer from "../slices/employee/compensation/update/reducer";
import compensationDeleteReducer from "../slices/employee/compensation/delete/reducer";

import couponPriceListReducer from "../slices/employee/coupon_price/list/reducer";
import couponPriceShowReducer from "../slices/employee/coupon_price/show/reducer";
import couponPriceAddReducer from "../slices/employee/coupon_price/add/reducer";
import couponPriceUpdateReducer from "../slices/employee/coupon_price/update/reducer";
import couponPriceDeleteReducer from "../slices/employee/coupon_price/delete/reducer";

// *** interruption ***
import interruptionListReducer from "../slices/employee/interruption/list/reducer";
import interruptionShowReducer from "../slices/employee/interruption/show/reducer";
import interruptionAddReducer from "../slices/employee/interruption/add/reducer";
import interruptionUpdateReducer from "../slices/employee/interruption/update/reducer";
import interruptionDeleteReducer from "../slices/employee/interruption/delete/reducer";

import specialTutorLessonListReducer from "../slices/employee/special-tutor-lesson/list/reducer";
import specialTutorLessonShowReducer from "../slices/employee/special-tutor-lesson/show/reducer";
import specialTutorLessonAddReducer from "../slices/employee/special-tutor-lesson/add/reducer";
import specialTutorLessonUpdateReducer from "../slices/employee/special-tutor-lesson/update/reducer";
import specialTutorLessonDeleteReducer from "../slices/employee/special-tutor-lesson/delete/reducer";

import salaryListReducer from "../slices/employee/salary/list/reducer";

// salary/debt
import debitListReducer from "../slices/employee/salary/debt/list/reducer";
import debitShowReducer from "../slices/employee/salary/debt/detail/reducer";
import debitAddReducer from "../slices/employee/salary/debt/add/reducer";
import debitUpdateReducer from "../slices/employee/salary/debt/update/reducer";
import debitDeleteReducer from "../slices/employee/salary/debt/delete/reducer";

// salary/payment
import paymentListReducer from "../slices/employee/salary/payment/list/reducer";
import paymentShowReducer from "../slices/employee/salary/payment/detail/reducer";
import paymentAddReducer from "../slices/employee/salary/payment/add/reducer";
import paymentUpdateReducer from "../slices/employee/salary/payment/update/reducer";
import paymentDeleteReducer from "../slices/employee/salary/payment/delete/reducer";

import refundListReducer from "../slices/employee/refund/list/reducer";
import refundShowReducer from "../slices/employee/refund/show/reducer";
import refundAddReducer from "../slices/employee/refund/add/reducer";
import refundUpdateReducer from "../slices/employee/refund/update/reducer";
import refundDeleteReducer from "../slices/employee/refund/delete/reducer";
import primlerListReducer from "../slices/employee/primler/list/reducer";
import primlerShowReducer from "../slices/employee/primler/show/reducer";
import primlerAddReducer from "../slices/employee/primler/add/reducer";
import primlerUpdateReducer from "../slices/employee/primler/update/reducer";
import primlerDeleteReducer from "../slices/employee/primler/delete/reducer";

import weeklyLessonCountListReducer from "../slices/employee/weekly_lesson_count/list/reducer";
import weeklyLessonCountShowReducer from "../slices/employee/weekly_lesson_count/show/reducer";
import weeklyLessonCountAddReducer from "../slices/employee/weekly_lesson_count/add/reducer";
import weeklyLessonCountUpdateReducer from "../slices/employee/weekly_lesson_count/update/reducer";
import weeklyLessonCountDeleteReducer from "../slices/employee/weekly_lesson_count/delete/reducer";

import tuitionFeesListReducer from "../slices/employee/tuition_fees/list/reducer";
import tuitionFeesShowReducer from "../slices/employee/tuition_fees/detail/reducer";
import tuitionFeesAddReducer from "../slices/employee/tuition_fees/add/reducer";
import tuitionFeesUpdateReducer from "../slices/employee/tuition_fees/update/reducer";
import tuitionFeesDeleteReducer from "../slices/employee/tuition_fees/delete/reducer";

import dailyDataList from "../slices/employee/dailyData/list/reducer";
import dailyDataDetail from "../slices/employee/dailyData/detail/reducer";
import dailyDataAdd from "../slices/employee/dailyData/add/reducer";
import dailyDataUpdate from "../slices/employee/dailyData/update/reducer";
import dailyDataDelete from "../slices/employee/dailyData/delete/reducer";
import costPlanningListReducer from "../slices/employee/cost_planning/list/reducer";
import budgetEstimateReducer from "../slices/accounting/budget_estimate/list/reducer";
import financialSummaryReducer from "../slices/accounting/financial_summary/reducer";

import invoiceListReducer from "../slices/invoice/list/reducer";
import invoiceDetailReducer from "../slices/invoice/detail/reducer";
import invoiceAddReducer from "../slices/invoice/add/reducer";
import invoiceUpdateReducer from "../slices/invoice/update/reducer";
import invoiceDeleteReducer from "../slices/invoice/delete/reducer";
import invoiceSummary from "../slices/invoice/invoiceSummary/reducer";
import invoiceNextSerial from "../slices/invoice/nextSerial/reducer";
import countryAddSlice from "../slices/countries/add/reducer";
import countryDeleteSlice from "../slices/countries/delete/reducer";
import countryListSlice from "../slices/countries/list/reducer";
import countryShowSlice from "../slices/countries/show/reducer";
import countryUpdateSlice from "../slices/countries/update/reducer";

import districtAddSlice from "../slices/districts/add/reducer";
import districtsDeleteSlice from "../slices/districts/delete/reducer";
import districtsListSlice from "../slices/districts/list/reducer";
import districtsShowSlice from "../slices/districts/show/reducer";
import districtsUpdateSlice from "../slices/districts/update/reducer";

import cityAddSlice from "../slices/cities/add/reducer";
import cityDeleteSlice from "../slices/cities/delete/reducer";
import cityListSlice from "../slices/cities/list/reducer";
import cityShowSlice from "../slices/cities/show/reducer";
import cityUpdateSlice from "../slices/cities/update/reducer";

import paymentMethodsListSlice from '../slices/paymentMethods/list/reducer'
import paymentMethodsUpdateSlice from '../slices/paymentMethods/update/reducer'
import paymentMethodDetailSlice from '../slices/paymentMethods/detail/reducer'
import paymentMethodsDeleteSlice from '../slices/paymentMethods/delete/reducer'
import paymentMethodAddSlice from '../slices/paymentMethods/add/reducer'

import smsProvidersListSlice from '../slices/smsproviders/list/reducer'
import smsProviderAddSlice from '../slices/smsproviders/add/reducer'
import smsProviderDeleteSlice from '../slices/smsproviders/delete/reducer'
import smsProviderDetailSlice from '../slices/smsproviders/detail/reducer'
import smsProviderUpdateSlice from '../slices/smsproviders/update/reducer'
import smsLogsListSlice from '../slices/smslogs/list/reducer'
import smsLogAddSlice from '../slices/smslogs/add/reducer'
import smsLogDeleteSlice from '../slices/smslogs/delete/reducer'
import smsLogDetailSlice from '../slices/smslogs/detail/reducer'
import smsLogUpdateSlice from '../slices/smslogs/update/reducer'

import enrollmentUpdateSlice from '../slices/enrollments/update/reducer'
import enrollmentListSlice from '../slices/enrollments/list/reducer'
import enrollmentDetailSlice from '../slices/enrollments/detail/reducer'
import enrollmentDeleteSlice from '../slices/enrollments/delete/reducer'
import enrollmentAddSlice from '../slices/enrollments/add/reducer'

import agreementsListSlice from '../slices/agreements/list/reducer';
import agreementsDetailSlice from '../slices/agreements/detail/reducer';
import agreementsAddSlice from '../slices/agreements/add/reducer';
import agreementsUpdateSlice from '../slices/agreements/update/reducer';
import agreementsDeleteSlice from '../slices/agreements/delete/reducer';

// SchoolCategories
import schoolCategoriesListSlice from '../slices/schoolcategories/list/reducer';
import schoolCategoriesAddSlice from '../slices/schoolcategories/add/reducer';
import schoolCategoriesUpdateSlice from '../slices/schoolcategories/update/reducer';
import schoolCategoriesDeleteSlice from '../slices/schoolcategories/delete/reducer';
import schoolCategoriesShowSlice from '../slices/schoolcategories/show/reducer';


//scholarships
import scholarshipListSlice from "../slices/scholarShips/list/reducer";
import scholarshipDetailSlice from "../slices/scholarShips/detail/reducer";
import scholarshipAddSlice from "../slices/scholarShips/add/reducer";
import scholarshipUpdateSlice from "../slices/scholarShips/update/reducer";
import scholarshipDeleteSlice from "../slices/scholarShips/delete/reducer";

//quiztimes
import quizTimeListSlice from "../slices/quizTimes/list/reducer";
import quizTimeShowSlice from "../slices/quizTimes/detail/reducer";
import quizTimeAddSlice from "../slices/quizTimes/add/reducer";
import quizTimeUpdateSlice from "../slices/quizTimes/update/reducer";
import quizTimeDeleteSlice from "../slices/quizTimes/delete/reducer";

//quizlevels
import quizLevelListSlice from "../slices/quizLevels/list/reducer";
import quizLevelShowSlice from "../slices/quizLevels/detail/reducer";
import quizLevelAddSlice from "../slices/quizLevels/add/reducer";
import quizLevelUpdateSlice from "../slices/quizLevels/update/reducer";
import quizLevelDeleteSlice from "../slices/quizLevels/delete/reducer";


//clasrooms


//quizsessions
import quizSessionListSlice from '../slices/quizSessions/list/reducer';
import quizSessionShowSlice from '../slices/quizSessions/detail/reducer';
import quizSessionAddSlice from '../slices/quizSessions/add/reducer';
import quizSessionUpdateSlice from '../slices/quizSessions/update/reducer';
import quizSessionDeleteSlice from '../slices/quizSessions/delete/reducer';

//quizclassroom
import quizClassroomAddSlice from '../slices/questiontypes/add/reducer';
import quizClassroomDeleteSlice from '../slices/questiontypes/delete/reducer';
import quizClassroomListSlice from '../slices/questiontypes/list/reducer';
import quizClassroomDetailSlice from '../slices/questiontypes/detail/reducer';
import quizClassroomUpdateSlice from '../slices/questiontypes/update/reducer';

// Guidance Meetings
import guidanceMeetingListSlice from '../slices/guidanceMeeting/list/reducer';
import guidanceMeetingAddSlice from '../slices/guidanceMeeting/add/reducer';
import guidanceMeetingUpdateSlice from '../slices/guidanceMeeting/update/reducer';
import guidanceMeetingDeleteSlice from '../slices/guidanceMeeting/delete/reducer';
import guidanceMeetingDetailSlice from '../slices/guidanceMeeting/detail/reducer';

// Student Info
import studentInfoListSlice from '../slices/studentInfo/list/reducer';
import studentInfoAddSlice from '../slices/studentInfo/add/reducer';
import studentInfoUpdateSlice from '../slices/studentInfo/update/reducer';
import studentInfoDeleteSlice from '../slices/studentInfo/delete/reducer';
import studentInfoDetailSlice from '../slices/studentInfo/detail/reducer';

// Student Psychologicals
import studentPyschologicalListSlice from '../slices/studentPsychologicals/list/reducer';
import studentPyschologicalAddSlice from '../slices/studentPsychologicals/add/reducer';
import studentPyschologicalUpdateSlice from '../slices/studentPsychologicals/update/reducer';
import studentPyschologicalDeleteSlice from '../slices/studentPsychologicals/delete/reducer';
import studentPyschologicalDetailSlice from '../slices/studentPsychologicals/detail/reducer';

// Guardian
import guardianListSlice from '../slices/guardian/list/reducer';
import guardianAddSlice from '../slices/guardian/add/reducer';
import guardianUpdateSlice from '../slices/guardian/update/reducer';
import guardianDeleteSlice from '../slices/guardian/delete/reducer';
import guardianDetailSlice from '../slices/guardian/detail/reducer';

// Guidance Observations
import guidanceObservationsListSlice from '../slices/guidanceObservations/list/reducer';
import guidanceObservationsAddSlice from '../slices/guidanceObservations/add/reducer';
import guidanceObservationsUpdateSlice from '../slices/guidanceObservations/update/reducer';
import guidanceObservationsDeleteSlice from '../slices/guidanceObservations/delete/reducer';
import guidanceObservationsDetailSlice from '../slices/guidanceObservations/detail/reducer';

// Guardian Meeting
import guardianMeetingListSlice from '../slices/guardianMeeting/list/reducer';
import guardianMeetingAddSlice from '../slices/guardianMeeting/add/reducer';
import guardianMeetingUpdateSlice from '../slices/guardianMeeting/update/reducer';
import guardianMeetingDeleteSlice from '../slices/guardianMeeting/delete/reducer';
import guardianMeetingDetailSlice from '../slices/guardianMeeting/detail/reducer';

// Scheduled Assignments
import scheduledAssignmentListSlice from '../slices/scheduledAssignments/list/reducer';
import scheduledAssignmentAddSlice from '../slices/scheduledAssignments/add/reducer';
import scheduledAssignmentUpdateSlice from '../slices/scheduledAssignments/update/reducer';
import scheduledAssignmentDeleteSlice from '../slices/scheduledAssignments/delete/reducer';
import scheduledAssignmentDetailSlice from '../slices/scheduledAssignments/detail/reducer';

// sources
import sourcesListSlice from '../slices/sources/list/reducer';
import sourcesAddSlice from '../slices/sources/add/reducer';
import sourcesDetailSlice from '../slices/sources/detail/reducer';
import sourcesUpdateSlice from '../slices/sources/update/reducer';
import sourcesDeleteSlice from '../slices/sources/delete/reducer';

// periods
import periodsListSlice from '../slices/periods/list/reducer';
import periodsAddSlice from '../slices/periods/add/reducer';
import periodsDetailSlice from '../slices/periods/detail/reducer';
import periodsUpdateSlice from '../slices/periods/update/reducer';
import periodsDeleteSlice from '../slices/periods/delete/reducer';

import quizResultsListSlice from '../slices/quizResult/reducer';
//assignmentStudents
import assignmentStudentsListSlice from '../slices/assignmentStudents/list/reducer';
import assignmentStudentsAddSlice from '../slices/assignmentStudents/add/reducer';
import assignmentStudentsDeleteSlice from '../slices/assignmentStudents/delete/reducer';
import assignmentStudentsUpdateSlice from '../slices/assignmentStudents/update/reducer';
import assignmentStudentsDetailSlice from '../slices/assignmentStudents/detail/reducer';


//assignments
import assignmentsAddSlice from '../slices/assignments/add/reducer';
import assignmentsDeleteSlice from '../slices/assignments/delete/reducer';
import assignmentsListSlice from '../slices/assignments/list/reducer';
import assignmentsUpdateSlice from '../slices/assignments/update/reducer';
import assignmentsDetailSlice from '../slices/assignments/detail/reducer';
import conversationsListReducer from '../slices/conversations/list/reducer';
import conversationsShowReducer from '../slices/conversations/detail/reducer';
import conversationsAddReducer from '../slices/conversations/add/reducer';
import conversationsUpdateReducer from '../slices/conversations/update/reducer';
import conversationsDeleteReducer from '../slices/conversations/delete/reducer';
import messagesListReducer from '../slices/messages/list/reducer';
import messagesShowReducer from '../slices/messages/detail/reducer';
import messagesAddReducer from '../slices/messages/add/reducer';
import messagesUpdateReducer from '../slices/messages/update/reducer';
import messagesDeleteReducer from '../slices/messages/delete/reducer';
import conversationUsersListReducer from '../slices/conversationusers/list/reducer';
import conversationUsersShowReducer from '../slices/conversationusers/detail/reducer';
import conversationUsersAddReducer from '../slices/conversationusers/add/reducer';
import conversationUsersUpdateReducer from '../slices/conversationusers/update/reducer';
import conversationUsersDeleteReducer from '../slices/conversationusers/delete/reducer';
import notificationsListReducer from '../slices/notifications/list/reducer';
import notificationsShowReducer from '../slices/notifications/detail/reducer';
import notificationsAddReducer from '../slices/notifications/add/reducer';
import notificationsUpdateReducer from '../slices/notifications/update/reducer';
import notificationsDeleteReducer from '../slices/notifications/delete/reducer';
import notificationUsersListReducer from '../slices/notificationusers/list/reducer';
import notificationUsersShowReducer from '../slices/notificationusers/detail/reducer';
import notificationUsersAddReducer from '../slices/notificationusers/add/reducer';
import notificationUsersUpdateReducer from '../slices/notificationusers/update/reducer';
import notificationUsersDeleteReducer from '../slices/notificationusers/delete/reducer';

//sourceTypes
import sourceTypesAddSlice from '../slices/sourceTypes/add/reducer';
import sourceTypesDeleteSlice from '../slices/sourceTypes/delete/reducer';
import sourceTypesListSlice from '../slices/sourceTypes/list/reducer';
import sourceTypesUpdateSlice from '../slices/sourceTypes/update/reducer';
import sourceTypesDetailSlice from '../slices/sourceTypes/detail/reducer';


//teachers
import teacherListSlice from '../slices/teachers/list/reducer';
import teacherShowSlice from '../slices/teachers/detail/reducer';
import teacherAddSlice from '../slices/teachers/add/reducer';
import teacherUpdateSlice from '../slices/teachers/update/reducer';
import teacherDeleteSlice from '../slices/teachers/delete/reducer';
import rentShowSlice from '../slices/rent/detail/reducer';

//yoklama 
//usedareas
import usedAreasListReducer from '../slices/usedareas/list/reducer'
import usedAreasDetailReducer from '../slices/usedareas/detail/reducer'
import usedAreasAddReducer from '../slices/usedareas/add/reducer'
import usedAreasUpdateReducer from '../slices/usedareas/update/reducer'
import usedAreasDeleteReducer from '../slices/usedareas/delete/reducer'

//grouptype
import groupTypeListReducer from '../slices/grouptype/list/reducer'
import groupTypeDetailReducer from '../slices/grouptype/detail/reducer'
import groupTypeAddReducer from '../slices/grouptype/add/reducer'
import groupTypeUpdateReducer from '../slices/grouptype/update/reducer'
import groupTypeDeleteReducer from '../slices/grouptype/delete/reducer'

//group
import groupListReducer from '../slices/group/list/reducer'
import groupDetailReducer from '../slices/group/detail/reducer'
import groupAddReducer from '../slices/group/add/reducer'
import groupUpdateReducer from '../slices/group/update/reducer'
import groupDeleteReducer from '../slices/group/delete/reducer'

//attendance
import attendanceListReducer from '../slices/attendance/list/reducer'
import attendanceDetailReducer from '../slices/attendance/detail/reducer'
import attendanceAddReducer from '../slices/attendance/add/reducer'
import attendanceUpdateReducer from '../slices/attendance/update/reducer'
import attendanceDeleteReducer from '../slices/attendance/delete/reducer'
//attendanceStudent
import attendanceStudentListReducer from '../slices/attendanceStudent/list/reducer'
import attendanceStudentDetailReducer from '../slices/attendanceStudent/detail/reducer'
import attendanceStudentAddReducer from '../slices/attendanceStudent/add/reducer'
import attendanceStudentUpdateReducer from '../slices/attendanceStudent/update/reducer'
import attendanceStudentDeleteReducer from '../slices/attendanceStudent/delete/reducer'
//attendanceDay
import attendanceDayListReducer from '../slices/attendanceDay/list/reducer'
import attendanceDayDetailReducer from '../slices/attendanceDay/detail/reducer'
import attendanceDayAddReducer from '../slices/attendanceDay/add/reducer'
import attendanceDayUpdateReducer from '../slices/attendanceDay/update/reducer'
import attendanceDayDeleteReducer from '../slices/attendanceDay/delete/reducer'
//attendanceTeacher
import attendanceTeacherListReducer from '../slices/attendanceTeacher/list/reducer'
import attendanceTeacherDetailReducer from '../slices/attendanceTeacher/detail/reducer'
import attendanceTeacherAddReducer from '../slices/attendanceTeacher/add/reducer'
import attendanceTeacherUpdateReducer from '../slices/attendanceTeacher/update/reducer'
import attendanceTeacherDeleteReducer from '../slices/attendanceTeacher/delete/reducer'

//studentGroup
import studentGroupListReducer from '../slices/studentGroup/list/reducer'
import studentGroupDetailReducer from '../slices/studentGroup/detail/reducer'
import studentGroupAddReducer from '../slices/studentGroup/add/reducer'
import studentGroupUpdateReducer from '../slices/studentGroup/update/reducer'
import studentGroupDeleteReducer from '../slices/studentGroup/delete/reducer'
//user
import userListReducer from '../slices/user/list/reducer'
import userDetailReducer from '../slices/user/detail/reducer'
import userAddReducer from '../slices/user/add/reducer'
import userUpdateReducer from '../slices/user/update/reducer'
import userDeleteReducer from '../slices/user/delete/reducer'

import contractEmployeeListSlice from '../slices/contractEmployees/list/reducer'
import contractEmployeeShowSlice from '../slices/contractEmployees/detail/reducer'
import contractEmployeeAddSlice from '../slices/contractEmployees/add/reducer'
import contractEmployeeUpdateSlice from '../slices/contractEmployees/update/reducer'
import contractEmployeeDeleteSlice from '../slices/contractEmployees/delete/reducer'

import employeeEarningListSlice from '../slices/employeeEarnings/list/reducer'
import employeeEarningShowSlice from '../slices/employeeEarnings/detail/reducer'
import employeeEarningAddSlice from '../slices/employeeEarnings/add/reducer'
import employeeEarningUpdateSlice from '../slices/employeeEarnings/update/reducer'
import employeeEarningDeleteSlice from '../slices/employeeEarnings/delete/reducer'

import financeNotesSlice from '../slices/financeNotes/list/reducer';


const combinedReducer = combineReducers({
  login: loginReducer,
  addInstallment: addInstallmentReducer,
  updateInstallment: updateInstallmentReducer,
  deleteInstallment: deleteInstallmentReducer,
  showInstallment: showInstallmentReducer,
  listInstallments: listInstallmentsReducer,
  studentList: studentListReducer,
  studentShow: studentShowReducer,
  studentAdd: studentAddReducer,
  studentUpdate: studentUpdateReducer,
  studentDelete: studentDeleteReducer,
  studentStep1: studentStep1Reducer,
  studentStep2: studentStep2Reducer,
  studentStep3: studentStep3Reducer,
  studentStep4: studentStep4Reducer,
  studentImport: studentImportReducer,
  studentRegisterNo: studentRegisterNoReducer,
  studentInternals: studentInternalsReducer,
  countyList: countyListReducer,
  branchList: branchListReducer,
  branchShow: branchShowReducer,
  branchAdd: branchAddReducer,
  branchUpdate: branchUpdateReducer,
  branchDelete: branchDeleteReducer,
  // Schools
  schoolList: schoolListReducer,
  schoolAdd: schoolAddReducer,
  schoolDelete: schoolDeleteReducer,
  schoolShow: schoolShowState,
  schoolUpdate: schoolUpdateState,
  // Course
  courseList: courseListSlice,
  courseShow: courseShowSlice,
  courseAdd: courseAddSlice,
  courseUpdate: coursesUpdateSlice,
  courseDelete: courseDeleteSlice,
  // 
  incomeList: incomeListSlice,
  otherIncomeList: otherIncomeListReducer,
  otherIncomeAdd: otherIncomeAddReducer,
  otherIncomeUpdate: otherIncomeUpdateReducer,
  otherIncomeDelete: otherIncomeDeleteReducer,
  otherIncomeShow: otherIncomeShowReducer,
  estimatedBudgetList: estimatedBudgetListReducer,
  debtList: DebtListSlice,
  discountStudentList: discountStudentListSlice,
  overduePayments: overduePaymentsSlice,
  bulletinList: bulletinListSlice,
  bulletinShow: bulletinShowSlice,
  bulletinAdd: bulletinAddSlice,
  bulletinUpdate: bulletinUpdateSlice,
  bulletinDelete: bulletinDeleteSlice,
  // Transfers
  transferList: transferListSlice,
  transferAdd: transferAddSlice,
  transferUpdate: transferUpdateSlice,
  transferDelete: transferDeleteSlice,
  transferShow: transferShowSlice,
  // ExpencesSummary
  expencesSummary: expencesSummaryReducer,
  // Expences
  expencesList: expencesListReducer,
  expencesAdd: expencesAddReducer,
  expencesUpdate: expencesUpdateReducer,
  expencesDelete: expencesDeleteReducer,
  expencesShow: expencesShowReducer,
  //Categories
  getListCategories: getExpenceCategoriesListReducer,
  getAddCategories: getExpenceCategoriesAddReducer,
  getUpdateCategories: getExpenceCategoriesUpdateReducer,
  getDeleteCategories: getExpenceCategoriesDeleteReducer,
  getShowCategories: getExpenceCategoriesShowReducer,



  // Suppliers
  supplierAdd: supplierAddReducer,
  supplierDelete: supplierDeleteReducer,
  supplierList: supplierListReducer,
  supplierShow: supplierShowReducer,

  // Bank
  bankList: bankListReducer,
  bankAdd: bankAddReducer,
  bankUpdate: bankUpdateReducer,
  bankDelete: bankDeleteReducer,
  bankShow: bankShowReducer,

  // Credit Card
  creditCardList: creditCardListReducer,
  creditCardAdd: creditCardAddReducer,
  creditCardUpdate: creditCardUpdateReducer,
  creditCardDelete: creditCardDeleteReducer,
  creditCardShow: creditCardShowReducer,

  // Open Account
  openAccountList: openAccountListReducer,
  openAccountAdd: openAccountAddReducer,
  openAccountUpdate: openAccountUpdateReducer,
  openAccountDelete: openAccountDeleteReducer,
  openAccountShow: openAccountShowReducer,
  // Meetings
  meetingList: meetingListSlice,
  meetingAdd: meetingAddSlice,
  meetingUpdate: meetingUpdateSlice,
  meetingDelete: meetingDeleteSlice,
  meetingShow: meetingShowSlice,

  // Employee => Personel
  personelList: personelListSlice,
  personelAdd: personelAddSlice,
  personelUpdate: personelUpdateSlice,
  personelDelete: personelDeleteSlice,
  personelShow: personelShowSlice,
  contractEmployeeList: contractEmployeeListSlice,
  contractEmployeeShow: contractEmployeeShowSlice,
  contractEmployeeAdd: contractEmployeeAddSlice,
  contractEmployeeUpdate: contractEmployeeUpdateSlice,
  contractEmployeeDelete: contractEmployeeDeleteSlice,
  employeeEarningList: employeeEarningListSlice,
  employeeEarningShow: employeeEarningShowSlice,
  employeeEarningAdd: employeeEarningAddSlice,
  employeeEarningUpdate: employeeEarningUpdateSlice,
  employeeEarningDelete: employeeEarningDeleteSlice,


  deleteCourse: coursesDeleteSlice,
  programUpdate: programUpdateSlice,
  programList: programListSlice,
  programAdd: programAddSlice,
  programDetail: programDetailSlice,
  programDelete: programDeleteSlice,
  levelList: levelListSlice,
  levelDetail: levelDetailSlice,
  levelAdd: levelAddSlice,
  levelUpdate: levelUpdateSlice,
  levelDelete: levelDeleteSlice,
  curriculmList: curriculmListSlice,
  curriculmDetail: curriculmDetailSlice,
  curriculmAdd: curriculmAddSlice,
  curriculmUpdate: curriculmUpdateSlice,
  curriculmDelete: curriculmDeleteSlice,
  unitsList: unitsListSlice,
  unitsShow: unitsShowSlice,
  unitsAdd: unitsAddSlice,
  unitsUpdate: unitsUpdateSlice,
  unitsDelete: unitsDeleteSlice,
  chaptersList: chaptersListSlice,
  chaptersShow: chaptersShowSlice,
  chaptersAdd: chaptersAddSlice,
  chaptersUpdate: chaptersUpdateSlice,
  chaptersDelete: chaptersDeleteSlice,
  topicsList: topicsListSlice,
  topicsShow: topicsShowSlice,
  topicsAdd: topicsAddSlice,
  topicsUpdate: topicsUpdateSlice,
  topicsDelete: topicsDeleteSlice,
  questionDifficultsList: questionDifficultListSlice,
  questionDifficultShow: questionDifficultShowSlice,
  questionDifficultAdd: questionDifficultAddSlice,
  questionDifficultUpdate: questionDifficultUpdateSlice,
  questionDifficultDelete: questionDifficultDeleteSlice,
  questionTypesList: questionTypeListSlice,
  questionTypeShow: questionTypeShowSlice,
  questionTypeAdd: questionTypeAddSlice,
  questionTypeUpdate: questionTypeUpdateSlice,
  questionTypeDelete: questionTypeDeleteSlice,
  examRelevancesList: examRelevanceListSlice,
  examRelevanceShow: examRelevanceShowSlice,
  examRelevanceAdd: examRelevanceAddSlice,
  examRelevanceUpdate: examRelevanceUpdateSlice,
  examRelevanceDelete: examRelevanceDeleteSlice,
  lessonList: lessonListSlice,
  lessonShow: lessonShowSlice,
  lessonAdd: lessonAddSlice,
  lessonUpdate: lessonUpdateSlice,
  lessonDelete: lessonDeleteSlice,
  questionsList: questionsListSlice,
  questionShow: questionShowSlice,
  questionsAdd: questionsAddSlice,
  questionsUpdate: questionsUpdateSlice,
  questionsDelete: questionsDeleteSlice,
  test: Test,


  // Appointments
  appointmentList: appointmentListSlice,

  appointmentDetail: appointmentShowSlice,
  appointmentAdd: appointmentsAddSlice,
  appointmentUpdate: appointmentUpdateSlice,
  appointmentDelete: appointmentDeleteSlice,

  //seasons

  seasonsListSlice: seasonsListSlice,
  seasonsShowSlice: seasonsShowSlice,
  seasonsAddSlice: seasonsAddSlice,
  seasonsUpdateSlice: seasonsUpdateSlice,
  seasonsDeleteSlice: seasonsDeleteSlice,


  //instruments
  instrumentsList: instrumentsListSlice,
  instrumentShow: instrumentShowSlice,
  instrumentsAdd: instrumentsAddSlice,
  instrumentsUpdate: instrumentsUpdateSlice,
  instrumentsDelete: instrumentsDeleteSlice,
  supplierDebtsList: supplierDebtsListReducer,
  supplierDebtsDetail: supplierDebtsDetailReducer,
  supplierDebtsAdd: supplierDebtsAddReducer,
  supplierDebtsUpdate: supplierDebtsUpdateReducer,
  supplierDebtsDelete: supplierDebtsDeleteReducer,
  supplierRefundsList: supplierRefundsListReducer,
  supplierRefundsDetail: supplierRefundsDetailReducer,
  supplierRefundsAdd: supplierRefundsAddReducer,
  supplierRefundsUpdate: supplierRefundsUpdateReducer,
  supplierRefundsDelete: supplierRefundsDeleteReducer,
  supplierInvoicesList: supplierInvoicesListReducer,
  supplierInvoicesDetail: supplierInvoicesDetailReducer,
  supplierInvoicesAdd: supplierInvoicesAddReducer,
  supplierInvoicesUpdate: supplierInvoicesUpdateReducer,
  supplierInvoicesDelete: supplierInvoicesDeleteReducer,

  supplierNotesList: supplierNotesListReducer,
  supplierNotesDetail: supplierNotesDetailReducer,
  supplierNotesAdd: supplierNotesAddReducer,
  supplierNotesUpdate: supplierNotesUpdateReducer,
  supplierNotesDelete: supplierNotesDeleteReducer,

  supplierPaymentsList: supplierPaymentsListReducer,
  supplierPaymentsDetail: supplierPaymentsDetailReducer,
  supplierPaymentsAdd: supplierPaymentsAddReducer,
  supplierPaymentsUpdate: supplierPaymentsUpdateReducer,
  supplierPaymentsDelete: supplierPaymentsDeleteReducer,
  suppliersUpdate: supplierUpdateSlice,
  invoiceNextSerial: invoiceSerialReducer,

  coachingList: coachingListReducer,
  coachingShow: coachingShowReducer,
  coachingAdd: coachingAddReducer,
  coachingUpdate: coachingUpdateReducer,
  coachingDelete: coachingDeleteReducer,

  compensationList: compensationListReducer,
  compensationShow: compensationShowReducer,
  compensationAdd: compensationAddReducer,
  compensationUpdate: compensationUpdateReducer,
  compensationDelete: compensationDeleteReducer,
  couponPriceList: couponPriceListReducer,
  couponPriceShow: couponPriceShowReducer,
  couponPriceAdd: couponPriceAddReducer,
  couponPriceUpdate: couponPriceUpdateReducer,
  couponPriceDelete: couponPriceDeleteReducer,

  interruptionList: interruptionListReducer,
  interruptionShow: interruptionShowReducer,
  interruptionAdd: interruptionAddReducer,
  interruptionUpdate: interruptionUpdateReducer,
  interruptionDelete: interruptionDeleteReducer,

  specialTutorLessonList: specialTutorLessonListReducer,
  specialTutorLessonShow: specialTutorLessonShowReducer,
  specialTutorLessonAdd: specialTutorLessonAddReducer,
  specialTutorLessonUpdate: specialTutorLessonUpdateReducer,
  specialTutorLessonDelete: specialTutorLessonDeleteReducer,

  salaryList: salaryListReducer,

  // salary/debt
  debitList: debitListReducer,
  debitShow: debitShowReducer,
  debitAdd: debitAddReducer,
  debitUpdate: debitUpdateReducer,
  debitDelete: debitDeleteReducer,

  // salary/payment
  paymentList: paymentListReducer,
  paymentShow: paymentShowReducer,
  paymentAdd: paymentAddReducer,
  paymentUpdate: paymentUpdateReducer,
  paymentDelete: paymentDeleteReducer,

  refundList: refundListReducer,
  refundShow: refundShowReducer,
  refundAdd: refundAddReducer,
  refundUpdate: refundUpdateReducer,
  refundDelete: refundDeleteReducer,

  primlerList: primlerListReducer,
  primlerShow: primlerShowReducer,
  primlerAdd: primlerAddReducer,
  primlerUpdate: primlerUpdateReducer,
  primlerDelete: primlerDeleteReducer,

  weeklyLessonCountList: weeklyLessonCountListReducer,
  weeklyLessonCountShow: weeklyLessonCountShowReducer,
  weeklyLessonCountAdd: weeklyLessonCountAddReducer,
  weeklyLessonCountUpdate: weeklyLessonCountUpdateReducer,
  weeklyLessonCountDelete: weeklyLessonCountDeleteReducer,

  tuitionFeesList: tuitionFeesListReducer,
  tuitionFeesShow: tuitionFeesShowReducer,
  tuitionFeesAdd: tuitionFeesAddReducer,
  tuitionFeesUpdate: tuitionFeesUpdateReducer,
  tuitionFeesDelete: tuitionFeesDeleteReducer,
  personelMainList: personelListSlice,
  personelDebtIndex: personelMaasIndexSlice,
  dailyDataList: dailyDataList,
  dailyDataDetail: dailyDataDetail,
  dailyDataAdd: dailyDataAdd,
  dailyDataUpdate: dailyDataUpdate,
  dailyDataDelete: dailyDataDelete,
  costPlanningList: costPlanningListReducer,
  budgetEstimateList: budgetEstimateReducer,
  financialSummary: financialSummaryReducer,

  invoiceList: invoiceListReducer,
  invoiceDetail: invoiceDetailReducer,
  invoiceAdd: invoiceAddReducer,
  invoiceUpdate: invoiceUpdateReducer,
  invoiceDelete: invoiceDeleteReducer,
  invoiceSummaryList: invoiceSummary,
  nextSerial: invoiceNextSerial,
  schoolTypesAdd: schoolTypeAddSlice,
  schoolTypesDelete: schoolTypeDeleteSlice,
  schoolTypesList: schoolTypeListSlice,
  schoolTypeShow: schoolTypeShowSlice,
  schoolTypeUpdate: schoolTypeUpdateSlice,
  countriesAdd: countryAddSlice,
  countriesDelete: countryDeleteSlice,
  countriesList: countryListSlice,
  countriesShow: countryShowSlice,
  countriesUpdate: countryUpdateSlice,

  cityAddSlice: cityAddSlice,
  cityDeleteSlice: cityDeleteSlice,
  cityListSlice: cityListSlice,
  cityShowSlice: cityShowSlice,
  cityUpdateSlice: cityUpdateSlice,



  districtAdd: districtAddSlice,
  districtDelete: districtsDeleteSlice,
  districtList: districtsListSlice,
  districtShow: districtsShowSlice,
  districtUpdate: districtsUpdateSlice,

  serviceTypesList: serviceTypesListSlice,
  serviceTypesAdd: serviceTypesAddSlice,
  serviceTypesDelete: serviceTypesDeleteSlice,
  serviceTypesUpdate: serviceTypesUpdateSlice,
  serviceTypesDetail: serviceTypesShowSlice,

  // Discounts
  discountList: discountListSlice,
  discountAdd: discountAddSlice,
  discountUpdate: discountUpdateSlice,
  discountDelete: discountDeleteSlice,
  discountShow: discountShowSlice,

  // Services
  serviceList: serviceListSlice,
  serviceAdd: serviceAddSlice,
  serviceUpdate: serviceUpdateSlice,
  serviceDelete: serviceDeleteSlice,
  serviceShow: serviceShowSlice,

  // Guidance Meetings
  guidanceMeetingList: guidanceMeetingListSlice,
  guidanceMeetingAdd: guidanceMeetingAddSlice,
  guidanceMeetingUpdate: guidanceMeetingUpdateSlice,
  guidanceMeetingDelete: guidanceMeetingDeleteSlice,
  guidanceMeetingDetail: guidanceMeetingDetailSlice,

  // Student Info
  studentInfoList: studentInfoListSlice,
  studentInfoAdd: studentInfoAddSlice,
  studentInfoUpdate: studentInfoUpdateSlice,
  studentInfoDelete: studentInfoDeleteSlice,
  studentInfoDetail: studentInfoDetailSlice,

  // Student Psychologicals
  studentPyschologicalList: studentPyschologicalListSlice,
  studentPsychologicalAdd: studentPyschologicalAddSlice,
  studentPsychologicalUpdate: studentPyschologicalUpdateSlice,
  studentPsychologicalDelete: studentPyschologicalDeleteSlice,
  studentPsychologicalDetail: studentPyschologicalDetailSlice,

  // Guardian
  guardianList: guardianListSlice,
  guardianAdd: guardianAddSlice,
  guardianUpdate: guardianUpdateSlice,
  guardianDelete: guardianDeleteSlice,
  guardianDetail: guardianDetailSlice,

  // Guidance Observations
  guidanceObservationsList: guidanceObservationsListSlice,
  guidanceObservationsAdd: guidanceObservationsAddSlice,
  guidanceObservationUpdate: guidanceObservationsUpdateSlice,
  guidanceObservationDelete: guidanceObservationsDeleteSlice,
  guidanceObservationDetail: guidanceObservationsDetailSlice,

  // Guardian Meeting
  guardianMeetingList: guardianMeetingListSlice,
  guardianMeetingAdd: guardianMeetingAddSlice,
  guardianMeetingUpdate: guardianMeetingUpdateSlice,
  guardianMeetingDelete: guardianMeetingDeleteSlice,
  guardianMeetingDetail: guardianMeetingDetailSlice,

  // Scheduled Assignments
  scheduledAssignmentList: scheduledAssignmentListSlice,
  scheduledAssignmentAdd: scheduledAssignmentAddSlice,
  scheduledAssignmentUpdate: scheduledAssignmentUpdateSlice,
  scheduledAssignmentDelete: scheduledAssignmentDeleteSlice,
  scheduledAssignmentDetail: scheduledAssignmentDetailSlice,

  // Periods
  periodsList: periodsListSlice,
  periodsAdd: periodsAddSlice,
  periodsDetail: periodsDetailSlice,
  periodsUpdate: periodsUpdateSlice,
  periodsDelete: periodsDeleteSlice,

  paymentMethodsList: paymentMethodsListSlice,
  paymentMethodsUpdate: paymentMethodsUpdateSlice,
  paymentMethodDetail: paymentMethodDetailSlice,
  paymentMethodsDelete: paymentMethodsDeleteSlice,
  paymentMethodAdd: paymentMethodAddSlice,
  smsProvidersList: smsProvidersListSlice,
  smsProviderAdd: smsProviderAddSlice,
  smsProviderDelete: smsProviderDeleteSlice,
  smsProviderDetail: smsProviderDetailSlice,
  smsProviderUpdate: smsProviderUpdateSlice,
  smsLogsList: smsLogsListSlice,
  smsLogAdd: smsLogAddSlice,
  smsLogDelete: smsLogDeleteSlice,
  smsLogDetail: smsLogDetailSlice,
  smsLogUpdate: smsLogUpdateSlice,

  enrollmentUpdate: enrollmentUpdateSlice,
  enrollmentList: enrollmentListSlice,
  enrollmentDetail: enrollmentDetailSlice,
  enrollmentDelete: enrollmentDeleteSlice,
  enrollmentAdd: enrollmentAddSlice,

  agreementsList: agreementsListSlice,
  agreementsDetail: agreementsDetailSlice,
  agreementsAdd: agreementsAddSlice,
  agreementsUpdate: agreementsUpdateSlice,
  agreementsDelete: agreementsDeleteSlice,

  schoolCategoriesList: schoolCategoriesListSlice,
  schoolCategoriesAdd: schoolCategoriesAddSlice,
  schoolCategoriesDelete: schoolCategoriesDeleteSlice,
  schoolCategoriesUpdate: schoolCategoriesUpdateSlice,
  schoolCategoriesShow: schoolCategoriesShowSlice,

  internalAdd: internalSummarySlice,
  scholarshipList: scholarshipListSlice,
  scholarshipDetail: scholarshipDetailSlice,
  scholarshipAdd: scholarshipAddSlice,
  scholarshipUpdate: scholarshipUpdateSlice,
  scholarshipDelete: scholarshipDeleteSlice,

  //quiztimes
  quizTimeList: quizTimeListSlice,
  quizTimeShow: quizTimeShowSlice,
  quizTimeAdd: quizTimeAddSlice,
  quizTimeUpdate: quizTimeUpdateSlice,
  quizTimeDelete: quizTimeDeleteSlice,

  //quizlevels
  quizLevelsList: quizLevelListSlice,
  quizLevelShow: quizLevelShowSlice,
  quizLevelAdd: quizLevelAddSlice,
  quizLevelUpdate: quizLevelUpdateSlice,
  quizLevelDelete: quizLevelDeleteSlice,

  classroomList: classroomListSlice,
  classroomDetail: classroomDetailSlice,
  classroomAdd: classroomAddSlice,
  classroomUpdate: classroomUpdateSlice,
  classroomDelete: classroomDeleteSlice,

  //quizsessions
  quizSessionList: quizSessionListSlice,
  quizSessionShow: quizSessionShowSlice,
  quizSessionAdd: quizSessionAddSlice,
  quizSessionUpdate: quizSessionUpdateSlice,
  quizSessionDelete: quizSessionDeleteSlice,

  // quizResults
  quizResultsList: quizResultsListSlice,

  // sources
  sourcesList: sourcesListSlice,
  sourcesDetail: sourcesDetailSlice,
  sourcesAdd: sourcesAddSlice,
  sourcesUpdate: sourcesUpdateSlice,
  sourcesDelete: sourcesDeleteSlice,

  //quizclassroom
  quizClassroomAdd: quizClassroomAddSlice,
  quizClassroomDelete: quizClassroomDeleteSlice,
  quizClassroomList: quizClassroomListSlice,
  quizClassroomDetail: quizClassroomDetailSlice,
  quizClassroomUpdate: quizClassroomUpdateSlice,
  ui: reducer,

  //assignmentStudent;
  assignmentStudentsAdd: assignmentStudentsAddSlice,
  assignmentStudentsDelete: assignmentStudentsDeleteSlice,
  assignmentStudentsList: assignmentStudentsListSlice,
  assignmentStudentsUpdate: assignmentStudentsUpdateSlice,
  assignmentStudentsDetail: assignmentStudentsDetailSlice,

  //assignments
  assignmentsAdd: assignmentsAddSlice,
  assignmentsDelete: assignmentsDeleteSlice,
  assignmentsList: assignmentsListSlice,
  assignmentsUpdate: assignmentsUpdateSlice,
  assignmentsDetail: assignmentsDetailSlice,
  conversationList: conversationsListReducer,
  conversationShow: conversationsShowReducer,
  conversationAdd: conversationsAddReducer,
  conversationUpdate: conversationsUpdateReducer,
  conversationDelete: conversationsDeleteReducer,
  conversationUserList: conversationUsersListReducer,
  conversationUserShow: conversationUsersShowReducer,
  conversationUserAdd: conversationUsersAddReducer,
  conversationUserUpdate: conversationUsersUpdateReducer,
  conversationUserDelete: conversationUsersDeleteReducer,
  messageList: messagesListReducer,
  messageShow: messagesShowReducer,
  messageAdd: messagesAddReducer,
  messageUpdate: messagesUpdateReducer,
  messageDelete: messagesDeleteReducer,
  notificationList: notificationsListReducer,
  notificationShow: notificationsShowReducer,
  notificationAdd: notificationsAddReducer,
  notificationUpdate: notificationsUpdateReducer,
  notificationDelete: notificationsDeleteReducer,
  notificationUserList: notificationUsersListReducer,
  notificationUserShow: notificationUsersShowReducer,
  notificationUserAdd: notificationUsersAddReducer,
  notificationUserUpdate: notificationUsersUpdateReducer,
  notificationUserDelete: notificationUsersDeleteReducer,

  //sourcetypes
  sourceTypesAdd: sourceTypesAddSlice,
  sourceTypesDelete: sourceTypesDeleteSlice,
  sourceTypesList: sourceTypesListSlice,
  sourceTypesUpdate: sourceTypesUpdateSlice,
  sourceTypesDetail: sourceTypesDetailSlice,

  //teachers
  teacherList: teacherListSlice,
  teacherShow: teacherShowSlice,
  teacherAdd: teacherAddSlice,
  teacherUpdate: teacherUpdateSlice,
  teacherDelete: teacherDeleteSlice,
  rentShow: rentShowSlice,

  //yoklama 
  //usedareas
  usedAreasList: usedAreasListReducer,
  usedAreasDetail: usedAreasDetailReducer,
  usedAreasAdd: usedAreasAddReducer,
  usedAreasUpdate: usedAreasUpdateReducer,
  usedAreasDelete: usedAreasDeleteReducer,
  //grouptypes
  groupTypeList: groupTypeListReducer,
  groupTypeDetail: groupTypeDetailReducer,
  groupTypeAdd: groupTypeAddReducer,
  groupTypeUpdate: groupTypeUpdateReducer,
  groupTypeDelete: groupTypeDeleteReducer,
  //group
  groupList: groupListReducer,
  groupDetail: groupDetailReducer,
  groupAdd: groupAddReducer,
  groupUpdate: groupUpdateReducer,
  groupDelete: groupDeleteReducer,
  //attendance
  attendanceList: attendanceListReducer,
  attendanceDetail: attendanceDetailReducer,
  attendanceAdd: attendanceAddReducer,
  attendanceUpdate: attendanceUpdateReducer,
  attendanceDelete: attendanceDeleteReducer,


  // attendanceStudent
  attendanceStudentList: attendanceStudentListReducer,
  attendanceStudentDetail: attendanceStudentDetailReducer,
  attendanceStudentAdd: attendanceStudentAddReducer,
  attendanceStudentUpdate: attendanceStudentUpdateReducer,
  attendanceStudentDelete: attendanceStudentDeleteReducer,

  //attendanceDay
  attendanceDayList: attendanceDayListReducer,
  attendanceDayDetail: attendanceDayDetailReducer,
  attendanceDayAdd: attendanceDayAddReducer,
  attendanceDayUpdate: attendanceDayUpdateReducer,
  attendanceDayDelete: attendanceDayDeleteReducer,

  //attendanceTeacher
  attendanceTeacherList: attendanceTeacherListReducer,
  attendanceTeacherDetail: attendanceTeacherDetailReducer,
  attendanceTeacherAdd: attendanceTeacherAddReducer,
  attendanceTeacherUpdate: attendanceTeacherUpdateReducer,
  attendanceTeacherDelete: attendanceTeacherDeleteReducer,

  //studentGroup
  studentGroupList: studentGroupListReducer,
  studentGroupDetail: studentGroupDetailReducer,
  studentGroupAdd: studentGroupAddReducer,
  studentGroupUpdate: studentGroupUpdateReducer,
  studentGroupDelete: studentGroupDeleteReducer,
  //user
  userList: userListReducer,
  userDetail: userDetailReducer,
  userAdd: userAddReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,


  financeNotes: financeNotesSlice,
});

export default combinedReducer;

// RootState tipini de combineReducers’tan elde ediyoruz
export type RootState = ReturnType<typeof combinedReducer>; 
