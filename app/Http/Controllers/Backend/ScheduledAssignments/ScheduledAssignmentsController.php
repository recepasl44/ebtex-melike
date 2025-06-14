<?php

namespace App\Http\Controllers\Backend\ScheduledAssignments;

use App\Models\ScheduledAssignments\ScheduledAssignment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ScheduledAssignments\CreateResponse;
use App\Http\Responses\Backend\ScheduledAssignments\EditResponse;
use App\Repositories\Backend\ScheduledAssignments\ScheduledAssignmentRepository;
use App\Http\Requests\Backend\ScheduledAssignments\ManageScheduledAssignmentRequest;
use App\Http\Requests\Backend\ScheduledAssignments\CreateScheduledAssignmentRequest;
use App\Http\Requests\Backend\ScheduledAssignments\StoreScheduledAssignmentRequest;
use App\Http\Requests\Backend\ScheduledAssignments\EditScheduledAssignmentRequest;
use App\Http\Requests\Backend\ScheduledAssignments\UpdateScheduledAssignmentRequest;
use App\Http\Requests\Backend\ScheduledAssignments\DeleteScheduledAssignmentRequest;

/**
 * ScheduledAssignmentsController
 */
class ScheduledAssignmentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScheduledAssignmentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScheduledAssignmentRepository $repository;
     */
    public function __construct(ScheduledAssignmentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ScheduledAssignments\ManageScheduledAssignmentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageScheduledAssignmentRequest $request)
    {
        return new ViewResponse('backend.scheduledassignments.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateScheduledAssignmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScheduledAssignments\CreateResponse
     */
    public function create(CreateScheduledAssignmentRequest $request)
    {
        return new CreateResponse('backend.scheduledassignments.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreScheduledAssignmentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreScheduledAssignmentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.scheduledassignments.index'), ['flash_success' => _tr('alerts.backend.scheduledassignments.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ScheduledAssignments\ScheduledAssignment  $scheduledassignment
     * @param  EditScheduledAssignmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScheduledAssignments\EditResponse
     */
    public function edit(ScheduledAssignment $scheduledassignment, EditScheduledAssignmentRequest $request)
    {
        return new EditResponse($scheduledassignment);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateScheduledAssignmentRequestNamespace  $request
     * @param  App\Models\ScheduledAssignments\ScheduledAssignment  $scheduledassignment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateScheduledAssignmentRequest $request, ScheduledAssignment $scheduledassignment)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $scheduledassignment, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.scheduledassignments.index'), ['flash_success' => _tr('alerts.backend.scheduledassignments.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteScheduledAssignmentRequestNamespace  $request
     * @param  App\Models\ScheduledAssignments\ScheduledAssignment  $scheduledassignment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ScheduledAssignment $scheduledassignment, DeleteScheduledAssignmentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($scheduledassignment);
        //returning with successfull message
        return new RedirectResponse(route('admin.scheduledassignments.index'), ['flash_success' => _tr('alerts.backend.scheduledassignments.deleted')]);
    }
    
}
