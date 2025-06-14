<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AttendanceResource;
use App\Models\Attendances\Attendance;
use App\Repositories\Backend\Attendances\AttendanceRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AttendancesController
 */
class AttendancesController extends APIController
{
    /**
     * __construct.
     *
     * @var AttendanceRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AttendanceRepository $repository;
     */
    public function __construct(AttendanceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $attendance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AttendanceResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Attendance $attendance
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Attendance $attendance)
    {
        return new AttendanceResource($attendance);
    }

    
     /**
      * Creates the Resource for attendance.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAttendance($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AttendanceResource(Attendance::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update attendance.
         *
         * @param Attendance    $attendance
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Attendance $attendance)
    {
        $validation = $this->validateAttendance($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($attendance, $request->all());

        $attendance = Attendance::findOrfail($attendance->id);

        return new AttendanceResource($attendance);
    }
    
    /**
     * Delete attendance.
     *
     * @param Attendance    $attendance
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Attendance $attendance)
    {
        $this->repository->delete($attendance);

        return $this->respond([
            'message' => _tr('alerts.backend.attendance.deleted'),
        ]);
    }
    

    /**
     * validate attendance.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAttendance(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'start_date' => 'required|date',
               'end_date' => 'required|date',
               'start_time' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate attendance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
