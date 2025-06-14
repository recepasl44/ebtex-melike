<?php

namespace App\Http\Controllers\Backend\Assignments;

use App\Models\Assignments\Assignment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Assignments\CreateResponse;
use App\Http\Responses\Backend\Assignments\EditResponse;
use App\Repositories\Backend\Assignments\AssignmentRepository;
use App\Http\Requests\Backend\Assignments\ManageAssignmentRequest;
use App\Http\Requests\Backend\Assignments\CreateAssignmentRequest;
use App\Http\Requests\Backend\Assignments\StoreAssignmentRequest;
use App\Http\Requests\Backend\Assignments\EditAssignmentRequest;
use App\Http\Requests\Backend\Assignments\UpdateAssignmentRequest;

/**
 * AssignmentsController
 */
class AssignmentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var AssignmentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AssignmentRepository $repository;
     */
    public function __construct(AssignmentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Assignments\ManageAssignmentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAssignmentRequest $request)
    {
        return new ViewResponse('backend.assignments.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAssignmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Assignments\CreateResponse
     */
    public function create(CreateAssignmentRequest $request)
    {
        return new CreateResponse('backend.assignments.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAssignmentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAssignmentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.assignments.index'), ['flash_success' => _tr('alerts.backend.assignments.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Assignments\Assignment  $assignment
     * @param  EditAssignmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Assignments\EditResponse
     */
    public function edit(Assignment $assignment, EditAssignmentRequest $request)
    {
        return new EditResponse($assignment);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAssignmentRequestNamespace  $request
     * @param  App\Models\Assignments\Assignment  $assignment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $assignment, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.assignments.index'), ['flash_success' => _tr('alerts.backend.assignments.updated')]);
    }
    
}
