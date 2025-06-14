<?php

namespace App\Http\Controllers\Backend\AttendanceDays;

use App\Models\AttendanceDays\AttendanceDay;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\AttendanceDays\CreateResponse;
use App\Http\Responses\Backend\AttendanceDays\EditResponse;
use App\Repositories\Backend\AttendanceDays\AttendanceDayRepository;
use App\Http\Requests\Backend\AttendanceDays\ManageAttendanceDayRequest;
use App\Http\Requests\Backend\AttendanceDays\CreateAttendanceDayRequest;
use App\Http\Requests\Backend\AttendanceDays\StoreAttendanceDayRequest;
use App\Http\Requests\Backend\AttendanceDays\EditAttendanceDayRequest;
use App\Http\Requests\Backend\AttendanceDays\UpdateAttendanceDayRequest;
use App\Http\Requests\Backend\AttendanceDays\DeleteAttendanceDayRequest;

/**
 * AttendanceDaysController
 */
class AttendanceDaysController extends Controller
{
    /**
     * variable to store the repository object
     * @var AttendanceDayRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\AttendanceDays\ManageAttendanceDayRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAttendanceDayRequest $request)
    {
        return new ViewResponse('backend.attendancedays.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAttendanceDayRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AttendanceDays\CreateResponse
     */
    public function create(CreateAttendanceDayRequest $request)
    {
        return new CreateResponse('backend.attendancedays.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAttendanceDayRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAttendanceDayRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.attendancedays.index'), ['flash_success' => _tr('alerts.backend.attendancedays.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\AttendanceDays\AttendanceDay  $attendanceday
     * @param  EditAttendanceDayRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AttendanceDays\EditResponse
     */
    public function edit(AttendanceDay $attendanceday, EditAttendanceDayRequest $request)
    {
        return new EditResponse($attendanceday);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAttendanceDayRequestNamespace  $request
     * @param  App\Models\AttendanceDays\AttendanceDay  $attendanceday
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAttendanceDayRequest $request, AttendanceDay $attendanceday)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $attendanceday, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.attendancedays.index'), ['flash_success' => _tr('alerts.backend.attendancedays.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAttendanceDayRequestNamespace  $request
     * @param  App\Models\AttendanceDays\AttendanceDay  $attendanceday
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(AttendanceDay $attendanceday, DeleteAttendanceDayRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($attendanceday);
        //returning with successfull message
        return new RedirectResponse(route('admin.attendancedays.index'), ['flash_success' => _tr('alerts.backend.attendancedays.deleted')]);
    }
    
}
