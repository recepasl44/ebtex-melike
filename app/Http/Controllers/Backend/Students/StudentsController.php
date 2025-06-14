<?php

namespace App\Http\Controllers\Backend\Students;

use App\Imports\StudentsImport;
use App\Models\Branches\Branche;
use App\Models\Countries\Country;
use App\Models\Courses\Course;
use App\Models\Levels\Level;
use App\Models\Programs\Program;
use App\Models\Schools\School;
use App\Models\Students\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Students\CreateResponse;
use App\Http\Responses\Backend\Students\EditResponse;
use App\Repositories\Backend\Students\StudentRepository;
use App\Http\Requests\Backend\Students\ManageStudentRequest;
use App\Http\Requests\Backend\Students\CreateStudentRequest;
use App\Http\Requests\Backend\Students\StoreStudentRequest;
use App\Http\Requests\Backend\Students\EditStudentRequest;
use App\Http\Requests\Backend\Students\UpdateStudentRequest;
use App\Http\Requests\Backend\Students\DeleteStudentRequest;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

/**
 * StudentsController
 */
class StudentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var StudentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param StudentRepository $repository;
     */
    public function __construct(StudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Students\ManageStudentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageStudentRequest $request)
    {
        return new ViewResponse('backend.students.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Students\CreateResponse
     */
    public function create(CreateStudentRequest $request)
    {
        return new CreateResponse('backend.students.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreStudentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreStudentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message

        return new RedirectResponse(route('admin.students.index'), ['flash_success' => _tr('alerts.backend.students.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Students\Student  $student
     * @param  EditStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Students\EditResponse
     */
    public function edit(Student $student, EditStudentRequest $request)
    {
        return new EditResponse($student);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateStudentRequestNamespace  $request
     * @param  App\Models\Students\Student  $student
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $student, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.students.index'), ['flash_success' => _tr('alerts.backend.students.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteStudentRequestNamespace  $request
     * @param  App\Models\Students\Student  $student
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Student $student, DeleteStudentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($student);
        //returning with successfull message
        return new RedirectResponse(route('admin.students.index'), ['flash_success' => _tr('alerts.backend.students.deleted')]);
    }


    public function registration(CreateStudentRequest $request)
    {
        if($request->has('identification_no')){
            $student = Student::where('identification_no', $request->input('identification_no'))->first();
            if(!$student){
                return redirect()->route('admin.students.create', ['registration' => 1])->withInput($request->except(['_token']));
            }else{
                return redirect()->route('admin.students.edit', ['student' => $student, 'registration' => 1])->withInput($request->except(['_token']));
            }

        }
        return view('backend.students.registration');
    }

    public function appointments(Student $student){
        return view('backend.appointments.index')->with(['student' => $student]);
    }

    public function meetings(Student $student){
        return view('backend.meetings.index')->with(['student' => $student]);
    }
    public function userdiscounts(Student $student){
        return view('backend.userdiscounts.index')->with(['student' => $student]);
    }

    public function internalRecords(Request $request){
        return view('backend.students.internal');
    }

    public function list(ManageStudentRequest $request){
        return view('backend.students.list');
    }

    public function data(ManageStudentRequest $request){
        $branches = Branche::pluck('name', 'id');
        $schools = School::pluck('name', 'id');
        $countries = Country::pluck('name', 'id');
        $programs = Program::pluck('name', 'id');
        $levels = Level::pluck('name', 'id');
        $courses = Course::pluck('name', 'id');
        return view('backend.students.data', compact('branches', 'schools', 'countries', 'programs', 'levels', 'courses'));
    }

    public function postData(Request $request){
        $student_ids = $request->input('student_ids');
        $student_ids = explode(',', $student_ids);

        $students = Student::whereIn('id', $student_ids)->get();
        foreach($students as $student){
            foreach (['branche_id','nationality_id', 'program_id', 'level_id', 'course_id', 'school_id'] as $attr){
                $student->{$attr} = $request->input($attr);
            }
            $student->save();
        }

        return back();
    }

    public function import(Request $request){
        $branches = Branche::pluck('name', 'id');
        return view('backend.students.import', compact('branches'));
    }

    public function postImport(Request $request){

        if (!$request->hasFile('student_import')) {
            return redirect()->back()->with('error', 'Dosya gönderilmedi.');
        }

        $file = $request->file('student_import');
        if (!$file->isValid()) {
            return redirect()->back()->with('error', 'Dosya geçersiz.');
        }

        $validator = Validator::make($request->all(), [
            'student_import' => 'required|mimes:xlsx,csv,xls',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            // Hatalar üzerinde işlem yapabilir, loglama yapabilir veya özel mesaj döndürebilirsiniz
            \Log::error('Validation errors: ', $errors->all());

            dd($errors->all());

            // Hataları kullanıcıya geri gönder
            return redirect()->back()->withErrors($errors)->withInput();
        }
        $import = new StudentsImport($request);
        Excel::import($import, $request->file('student_import'));
        // Hatalara erişim
        $failures = $import->validationFailures;

        if (!empty($failures)) {
            session()->put('failures', $failures);
            return back()->with(['failures' => $failures])->withInput();
        }else{
            session()->remove('failures');
        }

//        return redirect()->route('admin.students.import');
    }


    
}
