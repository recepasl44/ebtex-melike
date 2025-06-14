<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\StudentInfoResource;
use App\Models\StudentInfos\StudentInfo;
use App\Repositories\Backend\StudentInfos\StudentInfoRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * StudentInfosController
 */
class StudentInfosController extends APIController
{
    /**
     * __construct.
     *
     * @var StudentInfoRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param StudentInfoRepository $repository;
     */
    public function __construct(StudentInfoRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $studentinfo.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return StudentInfoResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param StudentInfo $studentinfo
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(StudentInfo $studentinfo)
    {
        return new StudentInfoResource($studentinfo);
    }

    
     /**
      * Creates the Resource for studentinfo.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateStudentInfo($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new StudentInfoResource(StudentInfo::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update studentinfo.
         *
         * @param StudentInfo    $studentinfo
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, StudentInfo $studentinfo)
    {
        $validation = $this->validateStudentInfo($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($studentinfo, $request->all());

        $studentinfo = StudentInfo::findOrfail($studentinfo->id);

        return new StudentInfoResource($studentinfo);
    }
    
    /**
     * Delete studentinfo.
     *
     * @param StudentInfo    $studentinfo
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(StudentInfo $studentinfo)
    {
        $this->repository->delete($studentinfo);

        return $this->respond([
            'message' => _tr('alerts.backend.studentinfo.deleted'),
        ]);
    }
    

    /**
     * validate studentinfo.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateStudentInfo(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'medical_support' => 'max:191',
               'special_conditions' => 'max:191',
               'extracurricular_activities' => 'max:191',
               'hobbies_and_skills' => 'max:191',
               'residential_address' => 'max:191',
               'emergency_contact_info' => 'max:191',
               'chronic_illness' => 'max:191',
               'household_members' => 'max:191',
               'psychological_status' => 'max:191',
               'academic_performance' => 'max:191',
               'support_educations' => 'max:191',
               'additional_notes' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate studentinfo.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
