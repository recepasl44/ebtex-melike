<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AttendanceStudentResource;
use App\Models\AttendanceStudents\AttendanceStudent;
use App\Repositories\Backend\AttendanceStudents\AttendanceStudentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AttendanceStudentsController
 */
class AttendanceStudentsController extends APIController
{
    /**
     * __construct.
     *
     * @var AttendanceStudentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AttendanceStudentRepository $repository;
     */
    public function __construct(AttendanceStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $attendancestudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AttendanceStudentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param AttendanceStudent $attendancestudent
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(AttendanceStudent $attendancestudent)
    {
        return new AttendanceStudentResource($attendancestudent);
    }

    
     /**
      * Creates the Resource for attendancestudent.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAttendanceStudent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AttendanceStudentResource(AttendanceStudent::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update attendancestudent.
         *
         * @param AttendanceStudent    $attendancestudent
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, AttendanceStudent $attendancestudent)
    {
        $validation = $this->validateAttendanceStudent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($attendancestudent, $request->all());

        $attendancestudent = AttendanceStudent::findOrfail($attendancestudent->id);

        return new AttendanceStudentResource($attendancestudent);
    }
    
    /**
     * Delete attendancestudent.
     *
     * @param AttendanceStudent    $attendancestudent
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(AttendanceStudent $attendancestudent)
    {
        $this->repository->delete($attendancestudent);

        return $this->respond([
            'message' => _tr('alerts.backend.attendancestudent.deleted'),
        ]);
    }
    

    /**
     * validate attendancestudent.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAttendanceStudent(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'attendance_id' => 'required',
               'student_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate attendancestudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
