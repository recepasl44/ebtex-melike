<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AttendanceDayResource;
use App\Models\AttendanceDays\AttendanceDay;
use App\Repositories\Backend\AttendanceDays\AttendanceDayRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AttendanceDaysController
 */
class AttendanceDaysController extends APIController
{
    /**
     * __construct.
     *
     * @var AttendanceDayRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AttendanceDayRepository $repository;
     */
    public function __construct(AttendanceDayRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $attendanceday.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AttendanceDayResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param AttendanceDay $attendanceday
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(AttendanceDay $attendanceday)
    {
        return new AttendanceDayResource($attendanceday);
    }

    
     /**
      * Creates the Resource for attendanceday.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAttendanceDay($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AttendanceDayResource(AttendanceDay::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update attendanceday.
         *
         * @param AttendanceDay    $attendanceday
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, AttendanceDay $attendanceday)
    {
        $validation = $this->validateAttendanceDay($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($attendanceday, $request->all());

        $attendanceday = AttendanceDay::findOrfail($attendanceday->id);

        return new AttendanceDayResource($attendanceday);
    }
    
    /**
     * Delete attendanceday.
     *
     * @param AttendanceDay    $attendanceday
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(AttendanceDay $attendanceday)
    {
        $this->repository->delete($attendanceday);

        return $this->respond([
            'message' => _tr('alerts.backend.attendanceday.deleted'),
        ]);
    }
    

    /**
     * validate attendanceday.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAttendanceDay(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'attendance_id' => 'required',
               'day_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate attendanceday.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
