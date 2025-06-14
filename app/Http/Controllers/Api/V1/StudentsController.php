<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\StudentInternalResource;
use App\Http\Resources\StudentRegisterNoResource;
use App\Http\Resources\StudentResource;
use App\Imports\StudentsImport;
use App\Models\Students\Student;
use App\Repositories\Backend\Students\StudentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use App\Rules\MainServiceRequired;

/**
 * StudentsController
 */
class StudentsController extends APIController
{
    /**
     * __construct.
     *
     * @var StudentRepository
     * @param $repository
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
     * Return the $student.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return StudentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the $student.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function internals(Request $request)
    {
        return new StudentInternalResource(
            $this->repository->getForInternal()->first()
        );
    }

    /**
     * Return the $student.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerNo(Request $request)
    {
        return new StudentRegisterNoResource(
            $this->repository->getRegisterNo()->first()
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Student $student
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Student $student)
    {
        return new StudentResource($student);
    }

    
     /**
      * Creates the Resource for student.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateStudent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new StudentResource(Student::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update student.
         *
         * @param Student    $student
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Student $student)
    {
        $validation = $this->validateStudent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($student, $request->all());

        $student = Student::findOrfail($student->id);

        return new StudentResource($student);
    }
    
    /**
     * Delete student.
     *
     * @param Student    $student
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Student $student)
    {
        $this->repository->delete($student);

        return $this->respond([
            'message' => _tr('alerts.backend.student.deleted'),
        ]);
    }

    public function postImport(Request $request){

        if (!$request->hasFile('student_import')) {
            return $this->respondNotFound();
        }

        $file = $request->file('student_import');
        if (!$file->isValid()) {
            return $this->respondWithNoContent();
        }

        $validator = Validator::make($request->all(), [
            'student_import' => 'required|mimes:xlsx,csv,xls',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();

            // Hatalar üzerinde işlem yapabilir, loglama yapabilir veya özel mesaj döndürebilirsiniz
            \Log::error('Validation errors: ', $errors->all());

            // Hataları kullanıcıya geri gönder
            return$this->respondWithError($errors->getMessages());
        }
        $import = new StudentsImport($request);
        Excel::import($import, $request->file('student_import'));
        // Hatalara erişim
        $failures = $import->validationFailures;

        if (!empty($failures)) {
            return $this->respondWithError($failures->getMessages());
        }
        return StudentResource::collection(
            $this->repository->getForDataTable()->paginate(2000)->appends(request()->query())
        );
    }

    public function scholarship(){
        $validation = $this->validateScholarship($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->scholarship($request->all());

        return new StudentResource(Student::orderBy('created_at', 'desc')->first());
    }
    

    /**
     * validate student.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateStudent(Request $request, $action = 'insert')
    {
        $valid = [];
        if($request->has('step') && $request->get('step') == 4 ){
            $valid = [
                'agreement_file' => 'required',
            ];
        }elseif($request->has('step') && $request->get('step') == 3 ){
            $valid = [
                'services_final' => ['required', 'array', new MainServiceRequired()],
                'services_dates' => 'required',
                'taxes' => 'required',
                'fees' => 'required',
            ];
        }elseif($request->has('step') && $request->get('step') == 2 ){
            $valid = [
                'services' => ['required', 'array', new MainServiceRequired()]
            ];
        }else{
            $valid = [
                'branche_id' => 'required',
                'identification_no' => 'required',
                'gender_id' => 'required',
                'first_name' => 'required|max:191',
                'last_name' => 'required|max:191',
                'birthday' => 'date',
                'program_id' => 'required',
                'level_id' => 'required',
                'email' => 'max:191',
                'phone' => 'max:191',
                'mobile_phone' => 'max:191',
                'financial_status' => 'max:191',
                'additional_information_1' => 'max:191',
                'additional_information_2' => 'max:191',
            ];
        }
        return Validator::make($request->all(), $valid);
    }

    public function validateScholarship(Request $request, $action = 'insert')
    {
        return Validator::make($request->all(), [
            'identification_no' => 'required',
            'first_name' => 'required|max:191',
            'last_name' => 'required|max:191',
            'birthday' => 'date',
            'program_id' => 'required',
            'level_id' => 'required',
            'email' => 'max:191',
            'phone' => 'max:191',
        ]);
    }

    /**
     * validate message for validate student.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
