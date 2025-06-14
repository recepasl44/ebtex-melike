<?php

use App\Http\Controllers\Api\V1\EnrollmentReportController;

use App\Http\Controllers\Api\V1\CustomerOtherController;
use App\Http\Controllers\Api\V1\OverduePaymentController;
use App\Http\Controllers\Api\V1\RentController;
use App\Http\Controllers\Api\V1\RentPaymentController;
use App\Http\Controllers\Api\V1\SupplierController;
use App\Http\Controllers\Api\V1\SupplierNoteController;
use App\Http\Controllers\Api\V1\FinanceNoteController;
use App\Http\Controllers\Api\V1\SupplierPaymentController;
use App\Http\Controllers\Api\V1\InvoiceSupplierController;
use App\Http\Controllers\Api\V1\RefundController;
use App\Http\Controllers\Api\V1\DebtController;
use App\Http\Controllers\Api\V1\InvoiceController;
use App\Http\Controllers\Api\V1\AgreementSettingController;
use App\Http\Controllers\Api\V1\BankController;
use App\Http\Controllers\Api\V1\CreditCardController;
use App\Http\Controllers\Api\V1\OpenAccountController;
use App\Http\Controllers\Api\V1\AccountingController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api\V1', 'prefix' => 'v1', 'as' => 'v1.'], function () {
    Route::group(['prefix' => 'auth', 'middleware' => ['guest']], function () {
        Route::post('register', 'RegisterController@register');
        Route::post('login', 'AuthController@login');
        // Password Reset
        Route::post('password/email', 'ForgotPasswordController@sendResetLinkEmail');
    });

    Route::group(['middleware' => ['auth:api']], function () {
        Route::group(['prefix' => 'auth'], function () {
            Route::post('logout', 'AuthController@logout');
            // Route::post('password/reset', 'ResetPasswordController@reset')->name('password.reset');
        });
        // Users
        Route::resource('users', 'UsersController', ['except' => ['create', 'edit']]);
        Route::post('users/delete-all', 'UsersController@deleteAll');
        //@todo need to change the route name and related changes
        Route::get('deactivated-users', 'DeactivatedUsersController@index');
        Route::get('deleted-users', 'DeletedUsersController@index');

        // Roles
        Route::resource('roles', 'RolesController', ['except' => ['create', 'edit']]);

        // Permission
        Route::resource('permissions', 'PermissionController', ['except' => ['create', 'edit']]);

        // Page
        Route::resource('pages', 'PagesController', ['except' => ['create', 'edit']]);

        // Faqs
        Route::resource('faqs', 'FaqsController', ['except' => ['create', 'edit']]);

        // Blog Categories
        Route::resource('blog_categories', 'BlogCategoriesController', ['except' => ['create', 'edit']]);

        // Blog Tags
        Route::resource('blog_tags', 'BlogTagsController', ['except' => ['create', 'edit']]);

        // Blogs
        Route::resource('blogs', 'BlogsController', ['except' => ['create', 'edit']]);


        Route::get('invoices/next-serial', [\App\Services\InvoiceSerialService ::class, 'getNextSerial']);
        Route::get('students/register-no', 'StudentsController@registerNo')->name('students.register_no');
        Route::get('students/internals', 'StudentsController@internals')->name('students.internals');
        Route::post('students/imports', 'StudentsController@postImport')->name('students.import');
        Route::post('students/scholarship', 'StudentsController@scholarship')->name('students.scholarship');

        Route::resource('branches', 'BranchesController', ['except' => ['create', 'edit']]);
        Route::resource('seasons', 'SeasonsController', ['except' => ['create', 'edit']]);
        Route::resource('schools', 'SchoolsController', ['except' => ['create', 'edit']]);
        Route::resource('programs', 'ProgramsController', ['except' => ['create', 'edit']]);
        Route::resource('levels', 'LevelsController', ['except' => ['create', 'edit']]);
        Route::resource('courses', 'CoursesController', ['except' => ['create', 'edit']]);
        Route::resource('countries', 'CountriesController', ['except' => ['create', 'edit']]);
        Route::resource('cities', 'CitiesController', ['except' => ['create', 'edit']]);
        Route::resource('counties', 'CountiesController', ['except' => ['create', 'edit']]);
        Route::resource('districts', 'DistrictsController', ['except' => ['create', 'edit']]);
        Route::resource('neighborhoods', 'NeighborhoodsController', ['except' => ['create', 'edit']]);
        Route::resource('addresses', 'AddressesController', ['except' => ['create', 'edit']]);
        Route::resource('guardians', 'GuardiansController', ['except' => ['create', 'edit']]);
        Route::resource('achievements', 'AchievementsController', ['except' => ['create', 'edit']]);
        Route::resource('appointments', 'AppointmentsController', ['except' => ['create', 'edit']]);
        Route::resource('chapters', 'ChaptersController', ['except' => ['create', 'edit']]);
        Route::resource('classrooms', 'ClassRoomsController', ['except' => ['create', 'edit']]);
        Route::resource('courses', 'CoursesController', ['except' => ['create', 'edit']]);
        Route::resource('discounts', 'DiscountsController', ['except' => ['create', 'edit']]);
//    Route::resource('drivings', 'DrivingsController', ['except' => ['create', 'edit']]);
        Route::resource('enrollments', 'EnrollmentsController', ['except' => ['create', 'edit']]);
        Route::resource('installments', 'InstallmentsController', ['except' => ['create', 'edit']]);
        Route::resource('lessons', 'LessonsController', ['except' => ['create', 'edit']]);
        Route::resource('meetings', 'MeetingsController', ['except' => ['create', 'edit']]);
        Route::resource('menus', 'MenusController', ['except' => ['create', 'edit']]);
//    Route::resource('opticalforms', 'OpticalFormsController', ['except' => ['create', 'edit']]);
        Route::resource('pointtypes', 'PointTypesController', ['except' => ['create', 'edit']]);
        Route::resource('payments', 'PaymentsController', ['except' => ['create', 'edit']]);
        Route::resource('questionpdfs', 'QuestionPdfsController', ['except' => ['create', 'edit']]);
        Route::resource('questions', 'QuestionsController', ['except' => ['create', 'edit']]);
//    Route::resource('questioncategories', 'QuestionCategoriesController', ['except' => ['create', 'edit']]);
        Route::resource('quiztypes', 'QuizTypesController', ['except' => ['create', 'edit']]);
        Route::resource('quizzes', 'QuizzesController', ['except' => ['create', 'edit']]);
//    Route::resource('schoolbuses', 'SchoolBusesController', ['except' => ['create', 'edit']]);
        Route::resource('schools', 'SchoolsController', ['except' => ['create', 'edit']]);
        Route::resource('schooltypes', 'SchoolTypesController', ['except' => ['create', 'edit']]);
        Route::resource('schoolcategories', 'SchoolCategoriesController', ['except' => ['create', 'edit']]);
        Route::resource('services', 'ServicesController', ['except' => ['create', 'edit']]);
        Route::resource('servicetypes', 'ServiceTypesController', ['except' => ['create', 'edit']]);
        Route::resource('platforms', 'PlatformsController', ['except' => ['create', 'edit']]);
//    Route::resource('stations', 'StationsController', ['except' => ['create', 'edit']]);
        Route::resource('students', 'StudentsController', ['except' => ['create', 'edit']]);
        Route::resource('topics', 'TopicsController', ['except' => ['create', 'edit']]);
        Route::resource('units', 'UnitsController', ['except' => ['create', 'edit']]);
        Route::resource('userdiscounts', 'UserDiscountsController', ['except' => ['create', 'edit']]);
        Route::resource('weightindices', 'WeightIndicesController', ['except' => ['create', 'edit']]);
//    Route::resource('booktypes', 'BookTypesController', ['except' => ['create', 'edit']]);
        Route::resource('books', 'BooksController', ['except' => ['create', 'edit']]);
        Route::resource('bookquestions', 'BookQuestionsController', ['except' => ['create', 'edit']]);
        Route::resource('quizquestions', 'QuizQuestionsController', ['except' => ['create', 'edit']]);
        Route::resource('booklettypes', 'BookletTypesController', ['except' => ['create', 'edit']]);
        Route::resource('bookletses', 'BookletsController', ['except' => ['create', 'edit']]);
        Route::resource('correctanswers', 'CorrectAnswersController', ['except' => ['create', 'edit']]);
        Route::resource('answers', 'AnswersController', ['except' => ['create', 'edit']]);
        Route::resource('testtypes', 'TestTypesController', ['except' => ['create', 'edit']]);
        Route::resource('tests', 'TestsController', ['except' => ['create', 'edit']]);
        Route::resource('testquestions', 'TestQuestionsController', ['except' => ['create', 'edit']]);
        Route::resource('quizapplications', 'QuizApplicationsController', ['except' => ['create', 'edit']]);
        Route::resource('quizattendances', 'QuizAttendancesController', ['except' => ['create', 'edit']]);
        Route::resource('tasktypes', 'TaskTypesController', ['except' => ['create', 'edit']]);
        Route::resource('tasks', 'TasksController', ['except' => ['create', 'edit']]);
        Route::resource('testattendances', 'TestAttendancesController', ['except' => ['create', 'edit']]);

        Route::resource('paymentmethods', 'PaymentMethodsController', ['except' => ['create', 'edit']]);

        Route::resource('currencies', 'CurrenciesController', ['except' => ['create', 'edit']]);

        Route::resource('scholarships', 'ScholarshipsController', ['except' => ['create', 'edit']]);
//    Route::resource('scholarshipapplications', 'ScholarshipApplicationsController', ['except' => ['create', 'edit']]);
        Route::resource('quizbranches', 'QuizBranchesController', ['except' => ['create', 'edit']]);
        Route::resource('quizsessions', 'QuizSessionsController', ['except' => ['create', 'edit']]);
        Route::resource('quiztimes', 'QuizTimesController', ['except' => ['create', 'edit']]);
        Route::resource('scholarshipsettings', 'ScholarshipSettingsController', ['except' => ['create', 'edit']]);
        Route::resource('scholarshipdocuments', 'ScholarshipDocumentsController', ['except' => ['create', 'edit']]);
        Route::resource('quizclassrooms', 'QuizClassroomsController', ['except' => ['create', 'edit']]);
        Route::resource('quizlevels', 'QuizLevelsController', ['except' => ['create', 'edit']]);
        Route::resource('quiznotes', 'QuizNotesController', ['except' => ['create', 'edit']]);
        Route::resource('quizcurriculums', 'QuizCurriculumsController', ['except' => ['create', 'edit']]);
//    Route::resource('scolarshipassigns', 'ScolarshipAssignsController', ['except' => ['create', 'edit']]);
        Route::resource('questiondifficults', 'QuestionDifficultsController', ['except' => ['create', 'edit']]);
        Route::resource('examrelevances', 'ExamRelevancesController', ['except' => ['create', 'edit']]);
        Route::resource('pagetypes', 'PageTypesController', ['except' => ['create', 'edit']]);
        Route::resource('pagepositions', 'PagePositionsController', ['except' => ['create', 'edit']]);
        Route::resource('quizmatches', 'QuizMatchesController', ['except' => ['create', 'edit']]);
        Route::resource('opticalforms', 'OpticalFormsController', ['except' => ['create', 'edit']]);
        Route::resource('opticalattributes', 'OpticalAttributesController', ['except' => ['create', 'edit']]);

        Route::resource('institutiontypes', 'InstitutionTypesController', ['except' => ['create', 'edit']]);
        Route::resource('institutions', 'InstitutionsController', ['except' => ['create', 'edit']]);
        Route::resource('bookpackages', 'BookPackagesController', ['except' => ['create', 'edit']]);
        Route::resource('periods', 'PeriodsController', ['except' => ['create', 'edit']]);
        Route::resource('paymentstatuses', 'PaymentStatusesController', ['except' => ['create', 'edit']]);
        Route::resource('groups', 'GroupsController', ['except' => ['create', 'edit']]);
        Route::resource('studentgroups', 'StudentGroupsController', ['except' => ['create', 'edit']]);

        Route::resource('assignments', 'AssignmentsController', ['except' => ['create', 'edit']]);
        Route::resource('assignmentstudents', 'AssignmentStudentsController', ['except' => ['create', 'edit']]);
        Route::resource('bookpayments', 'BookPaymentsController', ['except' => ['create', 'edit']]);
        Route::resource('bookproductions', 'BookProductionsController', ['except' => ['create', 'edit']]);
        Route::resource('sourcetypes', 'SourceTypesController', ['except' => ['create', 'edit']]);
        Route::resource('sources', 'SourcesController', ['except' => ['create', 'edit']]);

        Route::resource('quizcategories', 'QuizCategoriesController', ['except' => ['create', 'edit']]);
        Route::resource('quizcurriculums', 'QuizCurriculumsController', ['except' => ['create', 'edit']]);
        Route::resource('usedareas', 'UsedAreasController', ['except' => ['create', 'edit']]);
        Route::resource('grouptypes', 'GroupTypesController', ['except' => ['create', 'edit']]);
        Route::resource('attendances', 'AttendancesController', ['except' => ['create', 'edit']]);
        Route::resource('attendancedays', 'AttendanceDaysController', ['except' => ['create', 'edit']]);
        Route::resource('attendancestudents', 'AttendanceStudentsController', ['except' => ['create', 'edit']]);
        Route::resource('attendanceteachers', 'AttendanceTeachersController', ['except' => ['create', 'edit']]);

        Route::resource('questiontypes', 'QuestionTypesController', ['except' => ['create', 'edit']]);
        Route::resource('questioncurriculums', 'QuestionCurriculumsController', ['except' => ['create', 'edit']]);
        Route::resource('writers', 'WritersController', ['except' => ['create', 'edit']]);


        Route::resource('studentinfos', 'StudentInfosController', ['except' => ['create', 'edit']]);
        Route::resource('studentpsychologicals', 'StudentPsychologicalsController', ['except' => ['create', 'edit']]);
        Route::resource('guidancemeetings', 'GuidanceMeetingsController', ['except' => ['create', 'edit']]);
        Route::resource('guidanceobservations', 'GuidanceObservationsController', ['except' => ['create', 'edit']]);
        Route::resource('guardianmeetings', 'GuardianMeetingsController', ['except' => ['create', 'edit']]);

        Route::get('scheduledassignments/status-count', 'ScheduledAssignmentsController@statusCount')->name('scheduledassignments.status-count');
        Route::resource('scheduledassignments', 'ScheduledAssignmentsController', ['except' => ['create', 'edit']]);

        Route::resource('quizresults', 'QuizResultsController', ['except' => ['create', 'edit']]);
        Route::get('quizresults/ordered-list', 'QuizResultsController@orderedList')->name('quizresults.ordered-list');
        Route::resource('quizstudents', 'QuizStudentsController', ['except' => ['create', 'edit']]);
        Route::resource('classes', 'ClassesController', ['except' => ['create', 'edit']]);

        Route::resource('models', 'ModelsController', ['except' => ['create', 'edit']]);
        Route::resource('routes', 'RoutesController', ['except' => ['create', 'edit']]);
        Route::resource('vehicles', 'VehiclesController', ['except' => ['create', 'edit']]);
        Route::resource('serviceplans', 'ServicePlansController', ['except' => ['create', 'edit']]);
        Route::resource('servicestops', 'ServiceStopsController', ['except' => ['create', 'edit']]);
        Route::resource('smsproviders', 'SmsProvidersController', ['except' => ['create', 'edit']]);
        Route::resource('smslogs', 'SmsLogsController', ['except' => ['create', 'edit']]);

        Route::resource('bulletins', 'BulletinsController', ['except' => ['create', 'edit']]);
        Route::resource('conversations', 'ConversationsController', ['except' => ['create', 'edit']]);
        Route::resource('messages', 'MessagesController', ['except' => ['create', 'edit']]);
        Route::resource('conversationusers', 'ConversationUsersController', ['except' => ['create', 'edit']]);
        Route::resource('notifications', 'NotificationsController', ['except' => ['create', 'edit']]);
        Route::resource('notificationusers', 'NotificationUsersController', ['except' => ['create', 'edit']]);

        Route::resource('fieldmanagers', 'FieldManagersController', ['except' => ['create', 'edit']]);


        Route::resource('eventtypes', 'EventTypesController', ['except' => ['create', 'edit']]);
        Route::resource('events', 'EventsController', ['except' => ['create', 'edit']]);
        Route::resource('eventstudents', 'EventStudentsController', ['except' => ['create', 'edit']]);
        Route::resource('employees', 'EmployeesController', ['except' => ['create', 'edit']]);
        Route::resource('educationstatuses', 'EducationStatusesController', ['except' => ['create', 'edit']]);
        Route::resource('jobs', 'JobsController', ['except' => ['create', 'edit']]);
        Route::resource('professions', 'ProfessionsController', ['except' => ['create', 'edit']]);
        Route::resource('academictitles', 'AcademicTitlesController', ['except' => ['create', 'edit']]);
        Route::resource('employeeacademics', 'EmployeeAcademicsController', ['except' => ['create', 'edit']]);
        Route::resource('contracttypes', 'ContractTypesController', ['except' => ['create', 'edit']]);
        Route::resource('contractemployees', 'ContractEmployeesController', ['except' => ['create', 'edit']]);
    });



    // Sözleşme ayarlarının listelenmesi, oluşturulması, gösterilmesi, güncellenmesi ve silinmesi
    Route::get('agreements', [AgreementSettingController::class, 'index']);
    Route::post('agreements', [AgreementSettingController::class, 'store']);
    Route::get('agreements/{id}', [AgreementSettingController::class, 'show']);
    Route::put('agreements/{id}', [AgreementSettingController::class, 'update']);
    Route::delete('agreements/{id}', [AgreementSettingController::class, 'destroy']);

   Route::get('enrollment-report', [EnrollmentReportController::class, 'index']);

    Route::post('agreements/generateContractPdf/{id}', [AgreementSettingController::class, 'generateContractPdf']);

    // Tedarikçi alt resource
    Route::group(['prefix' => 'rents'], function () {
        // Rent işlemleri
        Route::get('/', [RentController::class, 'index']);
        Route::post('', [RentController::class, 'store']);
        Route::get('/{id}', [RentController::class, 'show']);
        Route::put('/{id}', [RentController::class, 'update']);
        Route::delete('/{id}', [RentController::class, 'destroy']);

        Route::get('rent-payments/{id}', [RentPaymentController::class, 'show']);
        Route::get('rent-payments', [RentPaymentController::class, 'index']);
        Route::post('/rent-payments', [RentPaymentController::class, 'store']);
        Route::put('/rent-payments/{id}', [RentPaymentController::class, 'update']);
        Route::delete('/rent-payments/{id}', [RentPaymentController::class, 'destroy']);
    });
//Accounts
    Route::apiResource('suppliers', SupplierController::class);
    Route::get('overdue-payments', [OverduePaymentController::class, 'index']);


    Route::get('finance-notes', [FinanceNoteController::class, 'index']);
    Route::get('finance-notes/export', [FinanceNoteController::class, 'export']);


    Route::get('debts', [DebtController::class, 'indexlist']);

    Route::group(['prefix' => 'suppliers/{supplier}'], function () {

        Route::get('season-summary', [SupplierPaymentController::class, 'seasonSummary']);

        Route::get('invoices/{invoice}/pdf', [InvoiceSupplierController::class, 'pdf']);

        Route::get('invoices/next-serial', [\App\Http\Controllers\Api\V1\InvoiceController::class, 'getNextSerial']);

        Route::get('invoices', [InvoiceSupplierController::class, 'index']);
        Route::post('invoices', [InvoiceSupplierController::class, 'store']);
        Route::get('invoices/{invoice}', [InvoiceSupplierController::class, 'show']);
        Route::put('invoices/{invoice}', [InvoiceSupplierController::class, 'update']);
        Route::delete('invoices/{invoice}', [InvoiceSupplierController::class, 'destroy']);
        // PDF Upload
        Route::post('invoices/{invoice}/upload-pdf', [InvoiceSupplierController::class, 'uploadPdf']);
        // Uyumsoft vb. gönder
        Route::post('invoices/{invoice}/send', [InvoiceSupplierController::class, 'sendEInvoice']);

        // Borçlar
        Route::get('debts', [DebtController::class, 'index']);
        Route::post('debts', [DebtController::class, 'store']);
        Route::get('debts/{debt}', [DebtController::class, 'show']);
        Route::put('debts/{debt}', [DebtController::class, 'update']);
        Route::delete('debts/{debt}', [DebtController::class, 'destroy']);

        // Ödemeler
        Route::get('payments', [SupplierPaymentController::class, 'index']);


        Route::post('payments', [SupplierPaymentController::class, 'store']);
        Route::get('payments/{supplierPayment}', [SupplierPaymentController::class, 'show']);
        Route::put('payments/{supplierPayment}', [SupplierPaymentController::class, 'update']);
        Route::delete('payments/{supplierPayment}', [SupplierPaymentController::class, 'destroy']);

        // İadeler
        Route::get('refunds', [RefundController::class, 'index']);
        Route::post('refunds', [RefundController::class, 'store']);
        Route::get('refunds/{refund}', [RefundController::class, 'show']);
        Route::put('refunds/{refund}', [RefundController::class, 'update']);
        Route::delete('refunds/{refund}', [RefundController::class, 'destroy']);
        Route::get('/notes', [SupplierNoteController::class, 'index']);
        Route::post('/notes', [SupplierNoteController::class, 'store']);
        Route::get('/notes/{supplierNote}', [SupplierNoteController::class, 'show']);
        Route::put('/notes/{supplierNote}', [SupplierNoteController::class, 'update']);
        Route::delete('/notes/{supplierNote}', [SupplierNoteController::class, 'destroy']);
    });
    Route::group(['prefix' => 'transfers', 'as' => 'transfers.'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\TransferController::class, 'index'])->name('index');
        Route::post('/', [\App\Http\Controllers\Api\V1\TransferController::class, 'store'])->name('store');
        Route::get('/{transfer}', [\App\Http\Controllers\Api\V1\TransferController::class, 'show'])->name('show');
        Route::put('/{transfer}', [\App\Http\Controllers\Api\V1\TransferController::class, 'update'])->name('update');
        Route::delete('/{transfer}', [\App\Http\Controllers\Api\V1\TransferController::class, 'destroy'])->name('destroy');
    });
    Route::get('/supllier/register-no', [SupplierController::class, 'getRegisterNo'])
    ->name('supllier.register-no');
// Personel işlemlerine aittir
    Route::group(['prefix' => 'personel', 'as' => 'personel.'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\PersonelController::class, 'index'])->name('index');
        Route::get('/list-employe', [\App\Http\Controllers\Api\V1\PersonelController::class, 'listEmployee'])
            ->name('list-employe');


        Route::get('/haftalik-calisma/{personelId}', [\App\Http\Controllers\Api\V1\PersonelWeeklyWorksController::class, 'index']);
        Route::post('/haftalik-calisma', [\App\Http\Controllers\Api\V1\PersonelWeeklyWorksController::class, 'store']);
        Route::get('/haftalik-calisma/show/{id}', [\App\Http\Controllers\Api\V1\PersonelWeeklyWorksController::class, 'show']);
        Route::put('/haftalik-calisma/{id}', [\App\Http\Controllers\Api\V1\PersonelWeeklyWorksController::class, 'update']);
        Route::delete('/haftalik-calisma/{id}', [\App\Http\Controllers\Api\V1\PersonelWeeklyWorksController::class, 'destroy']);




        Route::get('/register-no', [\App\Http\Controllers\Api\V1\PersonelController::class, 'getRegisterNo'])
            ->name('register-no');



        Route::post('/daily-data', [\App\Http\Controllers\Api\V1\PersonelDailyDataController::class, 'store'])->name('store');
        Route::get('/daily-data', [\App\Http\Controllers\Api\V1\PersonelDailyDataController::class, 'index'])->name('index-daily');
        Route::post('/', [\App\Http\Controllers\Api\V1\PersonelController::class, 'create'])->name('create');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\PersonelController::class, 'show'])->name('show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\PersonelController::class, 'update'])->name('update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\PersonelController::class, 'destroy'])->name('destroy');
        Route::post('/import', [\App\Http\Controllers\Api\V1\PersonelController::class, 'import'])->name('import');
        Route::get('/personel-odemeleri/hakedis', [\App\Http\Controllers\Api\V1\PersonelOdemeController::class, 'index']);

        // Maas Routes
        Route::prefix('maas')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'index']);
            Route::post('/borc', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'storeBorc']);
            Route::get('/borc/index', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'indexBorc']);

            Route::get('/borc/{id}', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'showBorc']);
            Route::put('/borc/{id}', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'updateBorc']);
            Route::delete('/borc/{id}', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'deleteBorc']);
            Route::post('/odeme', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'storeOdeme']);
            Route::get('/odeme/{id}', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'showOdeme']);
            Route::put('/odeme/{id}', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'updateOdeme']);
            Route::delete('/odeme/{id}', [\App\Http\Controllers\Api\V1\PersonelMaasController::class, 'deleteOdeme']);
        });

        // Prim Routes
        Route::prefix('prim')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Api\V1\PersonelPrimController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\PersonelPrimController::class, 'store']);
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\PersonelPrimController::class, 'show']);
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\PersonelPrimController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\PersonelPrimController::class, 'delete']);
            Route::post('/{primId}/odeme', [\App\Http\Controllers\Api\V1\PersonelPrimController::class, 'storeOdeme']);
            Route::delete('/odeme/{id}', [\App\Http\Controllers\Api\V1\PersonelPrimController::class, 'deleteOdeme']);
        });

        // Kesinti Routes
        Route::prefix('kesinti')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Api\V1\PersonelKesintiController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\PersonelKesintiController::class, 'store']);
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\PersonelKesintiController::class, 'show']);
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\PersonelKesintiController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\PersonelKesintiController::class, 'destroy']);
            Route::post('/{id}/tahsilat', [\App\Http\Controllers\Api\V1\PersonelKesintiController::class, 'tahsilatStore']);
        });

        // Iade Routes
        Route::prefix('iade')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Api\V1\PersonelIadeController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\PersonelIadeController::class, 'store']);
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\PersonelIadeController::class, 'show']);
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\PersonelIadeController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\PersonelIadeController::class, 'destroy']);
        });
        Route::prefix('tazminat')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Api\V1\PersonelTazminatController::class, 'index'])->name('tazminat.index');
            Route::post('/', [\App\Http\Controllers\Api\V1\PersonelTazminatController::class, 'store'])->name('tazminat.store');
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\PersonelTazminatController::class, 'show'])->name('tazminat.show');
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\PersonelTazminatController::class, 'update'])->name('tazminat.update');
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\PersonelTazminatController::class, 'destroy'])->name('tazminat.destroy');
        });
        Route::prefix('ders-ucretleri')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Api\V1\DersUcretiController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\DersUcretiController::class, 'store']);
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\DersUcretiController::class, 'show']);
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\DersUcretiController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\DersUcretiController::class, 'destroy']);
        });

        // Koçluk Ücretleri Routes
        Route::prefix('kocluk-ucretleri')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Api\V1\KoclukUcretiController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\KoclukUcretiController::class, 'store']);
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\KoclukUcretiController::class, 'show']);
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\KoclukUcretiController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\KoclukUcretiController::class, 'destroy']);
        });

        // Kupon Ücretleri Routes
        Route::prefix('kupon-ucretleri')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Api\V1\KuponUcretiController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\KuponUcretiController::class, 'store']);
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\KuponUcretiController::class, 'show']);
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\KuponUcretiController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\KuponUcretiController::class, 'destroy']);
        });

        // Özel Ders Ücretleri Routes
        Route::prefix('ozel-ders-ucretleri')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Api\V1\OzelDersUcretiController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\V1\OzelDersUcretiController::class, 'store']);
            Route::get('/{id}', [\App\Http\Controllers\Api\V1\OzelDersUcretiController::class, 'show']);
            Route::put('/{id}', [\App\Http\Controllers\Api\V1\OzelDersUcretiController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\V1\OzelDersUcretiController::class, 'destroy']);
        });
    });
//expences

    Route::group(['prefix' => 'expenses', 'as' => 'expenses.'], function () {
        Route::get('/getExpenseCategories', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'getExpenseCategoriesIndex'])->name('getExpenseCategoriesIndex');
        Route::get('/getExpenseCategories/{expense}', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'getExpenseCategoriesShow'])->name('getExpenseCategoriesShow');
        Route::put('/getExpenseCategories/{expense}', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'getExpenseCategoriesUpdate'])->name('getExpenseCategoriesUpdate');
        Route::delete('/getExpenseCategories/{expense}', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'getExpenseCategoriesDestroy'])->name('getExpenseCategoriesDestroy');

        Route::get('/getExpenseSummary', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'getExpenseSummary'])->name('getExpenseSummary');
        Route::get('/', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'index'])->name('index');
        Route::post('/', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'store'])->name('store');
        Route::put('/{expense}', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'update'])->name('update');
        Route::delete('/{expense}', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'destroy'])->name('destroy');
        Route::get('/{expense}', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'show'])->name('show');
       Route::post('/getExpenseCategories', [\App\Http\Controllers\Api\V1\ExpenseController::class, 'getExpenseCategories']);

    });
    Route::get("accounting/daily-summary", [AccountingController::class, "dailySummary"]);

    Route::get('accounting/financial-summary', [AccountingController::class, 'financialSummary'])->name('accounting.financial-summary');


///curriculum route
    Route::group(['prefix' => 'curriculum', 'as' => 'curriculum.'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\CurriculumController::class, 'index'])->name('index');
        Route::get('/{unit}', [\App\Http\Controllers\Api\V1\CurriculumController::class, 'show'])->name('show');
        Route::post('/', [\App\Http\Controllers\Api\V1\CurriculumController::class, 'store'])->name('store');
        Route::put('/{unit}', [\App\Http\Controllers\Api\V1\CurriculumController::class, 'update'])->name('update');
        Route::delete('/{unit}', [\App\Http\Controllers\Api\V1\CurriculumController::class, 'destroy'])->name('destroy');
        Route::post('/import', [\App\Http\Controllers\Api\V1\CurriculumController::class, 'import'])->name('import');
    });
    Route::group(['prefix' => 'instruments', 'as' => 'instruments.'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\InstrumentController::class, 'index'])->name('index');
        Route::get('/{unit}', [\App\Http\Controllers\Api\V1\InstrumentController::class, 'show'])->name('show');
        Route::post('/', [\App\Http\Controllers\Api\V1\InstrumentController::class, 'store'])->name('store');
        Route::put('/{unit}', [\App\Http\Controllers\Api\V1\InstrumentController::class, 'update'])->name('update');
        Route::delete('/{unit}', [\App\Http\Controllers\Api\V1\InstrumentController::class, 'destroy'])->name('destroy');

    });
    Route::group(['prefix' => 'bank', 'as' => 'bank.'], function () {
        Route::get('/', [BankController::class, 'index'])->name('index');
        Route::get('/{id}', [BankController::class, 'show'])->name('show');
        Route::post('/', [BankController::class, 'store'])->name('store');
        Route::put('/{id}', [BankController::class, 'update'])->name('update');
        Route::delete('/{id}', [BankController::class, 'destroy'])->name('destroy');
    });

    // CreditCard
    Route::group(['prefix' => 'credit-card', 'as' => 'credit-card.'], function () {
        Route::get('/', [CreditCardController::class, 'index'])->name('index');
        Route::get('/{id}', [CreditCardController::class, 'show'])->name('show');
        Route::post('/', [CreditCardController::class, 'store'])->name('store');
        Route::put('/{id}', [CreditCardController::class, 'update'])->name('update');
        Route::delete('/{id}', [CreditCardController::class, 'destroy'])->name('destroy');
    });

    // OpenAccount
    Route::group(['prefix' => 'open-account', 'as' => 'open-account.'], function () {
        Route::get('/', [OpenAccountController::class, 'index'])->name('index');
        Route::get('/{id}', [OpenAccountController::class, 'show'])->name('show');
        Route::post('/', [OpenAccountController::class, 'store'])->name('store');
        Route::put('/{id}', [OpenAccountController::class, 'update'])->name('update');
        Route::delete('/{id}', [OpenAccountController::class, 'destroy'])->name('destroy');
    });
//invoice
Route::prefix('invoice')->group(function () {
    Route::get('/summery', [InvoiceController::class, 'getStudentInvoiceSummary'])->name('invoice.getStudentInvoiceSummary');

    // Listeleme => GET /invoice
    Route::get('/', [InvoiceController::class, 'index'])->name('invoice.index');

    // Tek fatura göster => GET /invoice/{id}
    Route::get('/{id}', [InvoiceController::class, 'show'])->name('invoice.show');
    Route::get('/student/{studentId}', [InvoiceController::class, 'getInvoicesByStudent']);

    Route::get('/{id}', [InvoiceController::class, 'show'])->name('invoice.show');
    Route::post('/', [InvoiceController::class, 'store'])->name('invoice.store');

    // Toplu (Otomatik) Fatura Oluştur => POST /invoice/auto-generate
    Route::post('/auto-generate', [InvoiceController::class, 'storeAutoGenerate'])->name('invoice.autoGenerate');

    // Fatura güncelle => PUT /invoice/{id}
    Route::put('/{id}', [InvoiceController::class, 'update'])->name('invoice.update');

    // Fatura sil => DELETE /invoice/{id}
    Route::delete('/{id}', [InvoiceController::class, 'destroy'])->name('invoice.destroy');

    // Ödeme listesi (örnek) => GET /invoice/payment-lists
    Route::get('/payment-list', [InvoiceController::class, 'getPaymentList'])->name('invoice.payment-list');
}); 
Route::get('/incomes', [\App\Http\Controllers\Api\V1\IncomeController::class, 'index'])->name('income.index');

    Route::prefix('other-income')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\OtherIncomeController::class, 'index'])->name('other-income.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\OtherIncomeController::class, 'store'])->name('other-income.store');
        Route::get('/detail/{id}', [\App\Http\Controllers\Api\V1\OtherIncomeController::class, 'show'])->name('other-income.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\OtherIncomeController::class, 'update'])->name('other-income.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\OtherIncomeController::class, 'destroy'])->name('other-income.destroy');
    });
    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerOtherController::class, 'index'])->name('customers.index'); // Müşteri Listeleme
        Route::post('/', [CustomerOtherController::class, 'store'])->name('customers.store'); // Müşteri Ekleme
        Route::get('/detay/{id}', [CustomerOtherController::class, 'show'])->name('customers.show'); // Müşteri Detay
        Route::put('/{id}', [CustomerOtherController::class, 'update'])->name('customers.update'); // Müşteri Güncelleme
        Route::delete('/{id}', [CustomerOtherController::class, 'destroy'])->name('customers.destroy'); // Müşteri Silme
    });

    Route::prefix('payments')->group(function () {
        Route::get('/{studentId}', [\App\Http\Controllers\Api\V1\PaymentController::class, 'show']);
        Route::post('/', [\App\Http\Controllers\Api\V1\PaymentController::class, 'store']);
    });
    Route::prefix('payments-overview')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\PaymentOverviewController::class, 'index']); // Tüm Öğrenci Ödeme Listeleme
    });

    Route::prefix('lesson-programs')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\LessonProgramController::class, 'index'])->name('other-income.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\LessonProgramController::class, 'store'])->name('other-income.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\LessonProgramController::class, 'show'])->name('other-income.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\LessonProgramController::class, 'update'])->name('other-income.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\LessonProgramController::class, 'destroy'])->name('other-income.destroy');
    });
    Route::group(['prefix' => 'lesson-classes', 'as' => 'lesson-classes.'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\LessonClassController::class, 'index'])->name('index');
        Route::post('/', [\App\Http\Controllers\Api\V1\LessonClassController::class, 'store'])->name('store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\LessonClassController::class, 'show'])->name('show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\LessonClassController::class, 'update'])->name('update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\LessonClassController::class, 'destroy'])->name('destroy');
    });
    Route::group(['prefix' => 'derslikler'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\DerslikController::class, 'index'])->name('derslikler.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\DerslikController::class, 'store'])->name('derslikler.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\DerslikController::class, 'show'])->name('derslikler.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\DerslikController::class, 'update'])->name('derslikler.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\DerslikController::class, 'destroy'])->name('derslikler.destroy');
    });

    Route::group(['prefix' => 'teachers'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\TeacherController::class, 'index'])->name('teachers.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\TeacherController::class, 'store'])->name('teachers.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\TeacherController::class, 'show'])->name('teachers.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\TeacherController::class, 'update'])->name('teachers.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\TeacherController::class, 'destroy'])->name('teachers.destroy');
    });
    Route::group(['prefix' => 'daily-lesson-numbers'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\DailyLessonNumberController::class, 'index'])->name('daily-lesson-numbers.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\DailyLessonNumberController::class, 'store'])->name('daily-lesson-numbers.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\DailyLessonNumberController::class, 'show'])->name('daily-lesson-numbers.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\DailyLessonNumberController::class, 'update'])->name('daily-lesson-numbers.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\DailyLessonNumberController::class, 'destroy'])->name('daily-lesson-numbers.destroy');
    });

    // Lesson Days
    Route::group(['prefix' => 'lesson-days'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\LessonDayController::class, 'index'])->name('lesson-days.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\LessonDayController::class, 'store'])->name('lesson-days.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\LessonDayController::class, 'show'])->name('lesson-days.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\LessonDayController::class, 'update'])->name('lesson-days.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\LessonDayController::class, 'destroy'])->name('lesson-days.destroy');
    });

    // Lesson Hours
    Route::group(['prefix' => 'lesson-hours'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\LessonHourController::class, 'index'])->name('lesson-hours.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\LessonHourController::class, 'store'])->name('lesson-hours.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\LessonHourController::class, 'show'])->name('lesson-hours.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\LessonHourController::class, 'update'])->name('lesson-hours.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\LessonHourController::class, 'destroy'])->name('lesson-hours.destroy');
    });
    Route::group(['prefix' => 'class-lessons'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\ClassLessonController::class, 'index'])->name('class-lessons.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\ClassLessonController::class, 'store'])->name('class-lessons.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\ClassLessonController::class, 'show'])->name('class-lessons.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\ClassLessonController::class, 'update'])->name('class-lessons.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\ClassLessonController::class, 'destroy'])->name('class-lessons.destroy');
    });
    Route::group(['prefix' => 'common-lessons'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\CommonLessonController::class, 'index'])->name('common-lessons.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\CommonLessonController::class, 'store'])->name('common-lessons.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\CommonLessonController::class, 'show'])->name('common-lessons.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\CommonLessonController::class, 'update'])->name('common-lessons.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\CommonLessonController::class, 'destroy'])->name('common-lessons.destroy');
    });
    Route::group(['prefix' => 'teacher-lesson-assignments'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\TeacherLessonAssignmentController::class, 'index'])->name('teacher-lesson-assignments.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\TeacherLessonAssignmentController::class, 'store'])->name('teacher-lesson-assignments.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\TeacherLessonAssignmentController::class, 'show'])->name('teacher-lesson-assignments.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\TeacherLessonAssignmentController::class, 'update'])->name('teacher-lesson-assignments.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\TeacherLessonAssignmentController::class, 'destroy'])->name('teacher-lesson-assignments.destroy');
    });
    Route::group(['prefix' => 'classroom-lesson-assignments'], function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\ClassroomLessonAssignmentController::class, 'index'])->name('classroom-lesson-assignments.index');
        Route::post('/', [\App\Http\Controllers\Api\V1\ClassroomLessonAssignmentController::class, 'store'])->name('classroom-lesson-assignments.store');
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\ClassroomLessonAssignmentController::class, 'show'])->name('classroom-lesson-assignments.show');
        Route::put('/{id}', [\App\Http\Controllers\Api\V1\ClassroomLessonAssignmentController::class, 'update'])->name('classroom-lesson-assignments.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\V1\ClassroomLessonAssignmentController::class, 'destroy'])->name('classroom-lesson-assignments.destroy');
    });  
}); 
