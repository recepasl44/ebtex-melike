<?php

namespace App\Http\Controllers\Backend\Attendances;

use App\Models\Attendances\Attendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Attendances\CreateResponse;
use App\Http\Responses\Backend\Attendances\EditResponse;
use App\Repositories\Backend\Attendances\AttendanceRepository;
use App\Http\Requests\Backend\Attendances\ManageAttendanceRequest;
use App\Http\Requests\Backend\Attendances\CreateAttendanceRequest;
use App\Http\Requests\Backend\Attendances\StoreAttendanceRequest;
use App\Http\Requests\Backend\Attendances\EditAttendanceRequest;
use App\Http\Requests\Backend\Attendances\UpdateAttendanceRequest;
use App\Http\Requests\Backend\Attendances\DeleteAttendanceRequest;

/**
 * AttendancesController
 */
class AttendancesController extends Controller
{
    /**
     * variable to store the repository object
     * @var AttendanceRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Attendances\ManageAttendanceRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAttendanceRequest $request)
    {
        return new ViewResponse('backend.attendances.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAttendanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Attendances\CreateResponse
     */
    public function create(CreateAttendanceRequest $request)
    {
        return new CreateResponse('backend.attendances.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAttendanceRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAttendanceRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.attendances.index'), ['flash_success' => _tr('alerts.backend.attendances.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Attendances\Attendance  $attendance
     * @param  EditAttendanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Attendances\EditResponse
     */
    public function edit(Attendance $attendance, EditAttendanceRequest $request)
    {
        return new EditResponse($attendance);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAttendanceRequestNamespace  $request
     * @param  App\Models\Attendances\Attendance  $attendance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $attendance, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.attendances.index'), ['flash_success' => _tr('alerts.backend.attendances.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAttendanceRequestNamespace  $request
     * @param  App\Models\Attendances\Attendance  $attendance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Attendance $attendance, DeleteAttendanceRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($attendance);
        //returning with successfull message
        return new RedirectResponse(route('admin.attendances.index'), ['flash_success' => _tr('alerts.backend.attendances.deleted')]);
    }
    
}
