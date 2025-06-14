<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AttendanceTeacherResource;
use App\Models\AttendanceTeachers\AttendanceTeacher;
use App\Repositories\Backend\AttendanceTeachers\AttendanceTeacherRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AttendanceTeachersController
 */
class AttendanceTeachersController extends APIController
{
    /**
     * __construct.
     *
     * @var AttendanceTeacherRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AttendanceTeacherRepository $repository;
     */
    public function __construct(AttendanceTeacherRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $attendanceteacher.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AttendanceTeacherResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param AttendanceTeacher $attendanceteacher
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(AttendanceTeacher $attendanceteacher)
    {
        return new AttendanceTeacherResource($attendanceteacher);
    }

    
     /**
      * Creates the Resource for attendanceteacher.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAttendanceTeacher($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AttendanceTeacherResource(AttendanceTeacher::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update attendanceteacher.
         *
         * @param AttendanceTeacher    $attendanceteacher
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, AttendanceTeacher $attendanceteacher)
    {
        $validation = $this->validateAttendanceTeacher($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($attendanceteacher, $request->all());

        $attendanceteacher = AttendanceTeacher::findOrfail($attendanceteacher->id);

        return new AttendanceTeacherResource($attendanceteacher);
    }
    
    /**
     * Delete attendanceteacher.
     *
     * @param AttendanceTeacher    $attendanceteacher
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(AttendanceTeacher $attendanceteacher)
    {
        $this->repository->delete($attendanceteacher);

        return $this->respond([
            'message' => _tr('alerts.backend.attendanceteacher.deleted'),
        ]);
    }
    

    /**
     * validate attendanceteacher.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAttendanceTeacher(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'attendance_id' => 'required',
               'teacher_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate attendanceteacher.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
