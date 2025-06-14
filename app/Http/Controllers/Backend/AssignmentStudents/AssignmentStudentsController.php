<?php

namespace App\Http\Controllers\Backend\AssignmentStudents;

use App\Models\AssignmentStudents\AssignmentStudent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\AssignmentStudents\CreateResponse;
use App\Http\Responses\Backend\AssignmentStudents\EditResponse;
use App\Repositories\Backend\AssignmentStudents\AssignmentStudentRepository;
use App\Http\Requests\Backend\AssignmentStudents\ManageAssignmentStudentRequest;
use App\Http\Requests\Backend\AssignmentStudents\CreateAssignmentStudentRequest;
use App\Http\Requests\Backend\AssignmentStudents\StoreAssignmentStudentRequest;
use App\Http\Requests\Backend\AssignmentStudents\EditAssignmentStudentRequest;
use App\Http\Requests\Backend\AssignmentStudents\UpdateAssignmentStudentRequest;
use App\Http\Requests\Backend\AssignmentStudents\DeleteAssignmentStudentRequest;

/**
 * AssignmentStudentsController
 */
class AssignmentStudentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var AssignmentStudentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AssignmentStudentRepository $repository;
     */
    public function __construct(AssignmentStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\AssignmentStudents\ManageAssignmentStudentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAssignmentStudentRequest $request)
    {
        return new ViewResponse('backend.assignmentstudents.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAssignmentStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AssignmentStudents\CreateResponse
     */
    public function create(CreateAssignmentStudentRequest $request)
    {
        return new CreateResponse('backend.assignmentstudents.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAssignmentStudentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAssignmentStudentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.assignmentstudents.index'), ['flash_success' => _tr('alerts.backend.assignmentstudents.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\AssignmentStudents\AssignmentStudent  $assignmentstudent
     * @param  EditAssignmentStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AssignmentStudents\EditResponse
     */
    public function edit(AssignmentStudent $assignmentstudent, EditAssignmentStudentRequest $request)
    {
        return new EditResponse($assignmentstudent);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAssignmentStudentRequestNamespace  $request
     * @param  App\Models\AssignmentStudents\AssignmentStudent  $assignmentstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAssignmentStudentRequest $request, AssignmentStudent $assignmentstudent)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $assignmentstudent, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.assignmentstudents.index'), ['flash_success' => _tr('alerts.backend.assignmentstudents.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAssignmentStudentRequestNamespace  $request
     * @param  App\Models\AssignmentStudents\AssignmentStudent  $assignmentstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(AssignmentStudent $assignmentstudent, DeleteAssignmentStudentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($assignmentstudent);
        //returning with successfull message
        return new RedirectResponse(route('admin.assignmentstudents.index'), ['flash_success' => _tr('alerts.backend.assignmentstudents.deleted')]);
    }
    
}
