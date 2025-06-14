<?php

namespace App\Http\Controllers\Backend\AttendanceTeachers;

use App\Models\AttendanceTeachers\AttendanceTeacher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\AttendanceTeachers\CreateResponse;
use App\Http\Responses\Backend\AttendanceTeachers\EditResponse;
use App\Repositories\Backend\AttendanceTeachers\AttendanceTeacherRepository;
use App\Http\Requests\Backend\AttendanceTeachers\ManageAttendanceTeacherRequest;
use App\Http\Requests\Backend\AttendanceTeachers\CreateAttendanceTeacherRequest;
use App\Http\Requests\Backend\AttendanceTeachers\StoreAttendanceTeacherRequest;
use App\Http\Requests\Backend\AttendanceTeachers\EditAttendanceTeacherRequest;
use App\Http\Requests\Backend\AttendanceTeachers\UpdateAttendanceTeacherRequest;
use App\Http\Requests\Backend\AttendanceTeachers\DeleteAttendanceTeacherRequest;

/**
 * AttendanceTeachersController
 */
class AttendanceTeachersController extends Controller
{
    /**
     * variable to store the repository object
     * @var AttendanceTeacherRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\AttendanceTeachers\ManageAttendanceTeacherRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAttendanceTeacherRequest $request)
    {
        return new ViewResponse('backend.attendanceteachers.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAttendanceTeacherRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AttendanceTeachers\CreateResponse
     */
    public function create(CreateAttendanceTeacherRequest $request)
    {
        return new CreateResponse('backend.attendanceteachers.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAttendanceTeacherRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAttendanceTeacherRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.attendanceteachers.index'), ['flash_success' => _tr('alerts.backend.attendanceteachers.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\AttendanceTeachers\AttendanceTeacher  $attendanceteacher
     * @param  EditAttendanceTeacherRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AttendanceTeachers\EditResponse
     */
    public function edit(AttendanceTeacher $attendanceteacher, EditAttendanceTeacherRequest $request)
    {
        return new EditResponse($attendanceteacher);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAttendanceTeacherRequestNamespace  $request
     * @param  App\Models\AttendanceTeachers\AttendanceTeacher  $attendanceteacher
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAttendanceTeacherRequest $request, AttendanceTeacher $attendanceteacher)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $attendanceteacher, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.attendanceteachers.index'), ['flash_success' => _tr('alerts.backend.attendanceteachers.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAttendanceTeacherRequestNamespace  $request
     * @param  App\Models\AttendanceTeachers\AttendanceTeacher  $attendanceteacher
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(AttendanceTeacher $attendanceteacher, DeleteAttendanceTeacherRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($attendanceteacher);
        //returning with successfull message
        return new RedirectResponse(route('admin.attendanceteachers.index'), ['flash_success' => _tr('alerts.backend.attendanceteachers.deleted')]);
    }
    
}
