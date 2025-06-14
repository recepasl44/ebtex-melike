<?php

namespace App\Http\Controllers\Backend\AttendanceStudents;

use App\Models\AttendanceStudents\AttendanceStudent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\AttendanceStudents\CreateResponse;
use App\Http\Responses\Backend\AttendanceStudents\EditResponse;
use App\Repositories\Backend\AttendanceStudents\AttendanceStudentRepository;
use App\Http\Requests\Backend\AttendanceStudents\ManageAttendanceStudentRequest;
use App\Http\Requests\Backend\AttendanceStudents\CreateAttendanceStudentRequest;
use App\Http\Requests\Backend\AttendanceStudents\StoreAttendanceStudentRequest;
use App\Http\Requests\Backend\AttendanceStudents\EditAttendanceStudentRequest;
use App\Http\Requests\Backend\AttendanceStudents\UpdateAttendanceStudentRequest;
use App\Http\Requests\Backend\AttendanceStudents\DeleteAttendanceStudentRequest;

/**
 * AttendanceStudentsController
 */
class AttendanceStudentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var AttendanceStudentRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\AttendanceStudents\ManageAttendanceStudentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAttendanceStudentRequest $request)
    {
        return new ViewResponse('backend.attendancestudents.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAttendanceStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AttendanceStudents\CreateResponse
     */
    public function create(CreateAttendanceStudentRequest $request)
    {
        return new CreateResponse('backend.attendancestudents.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAttendanceStudentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAttendanceStudentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.attendancestudents.index'), ['flash_success' => _tr('alerts.backend.attendancestudents.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\AttendanceStudents\AttendanceStudent  $attendancestudent
     * @param  EditAttendanceStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AttendanceStudents\EditResponse
     */
    public function edit(AttendanceStudent $attendancestudent, EditAttendanceStudentRequest $request)
    {
        return new EditResponse($attendancestudent);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAttendanceStudentRequestNamespace  $request
     * @param  App\Models\AttendanceStudents\AttendanceStudent  $attendancestudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAttendanceStudentRequest $request, AttendanceStudent $attendancestudent)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $attendancestudent, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.attendancestudents.index'), ['flash_success' => _tr('alerts.backend.attendancestudents.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAttendanceStudentRequestNamespace  $request
     * @param  App\Models\AttendanceStudents\AttendanceStudent  $attendancestudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(AttendanceStudent $attendancestudent, DeleteAttendanceStudentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($attendancestudent);
        //returning with successfull message
        return new RedirectResponse(route('admin.attendancestudents.index'), ['flash_success' => _tr('alerts.backend.attendancestudents.deleted')]);
    }
    
}
