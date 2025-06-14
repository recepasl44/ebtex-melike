<?php

namespace App\Http\Controllers\Backend\TaskTypes;

use App\Models\TaskTypes\TaskType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\TaskTypes\CreateResponse;
use App\Http\Responses\Backend\TaskTypes\EditResponse;
use App\Repositories\Backend\TaskTypes\TaskTypeRepository;
use App\Http\Requests\Backend\TaskTypes\ManageTaskTypeRequest;
use App\Http\Requests\Backend\TaskTypes\CreateTaskTypeRequest;
use App\Http\Requests\Backend\TaskTypes\StoreTaskTypeRequest;
use App\Http\Requests\Backend\TaskTypes\EditTaskTypeRequest;
use App\Http\Requests\Backend\TaskTypes\UpdateTaskTypeRequest;
use App\Http\Requests\Backend\TaskTypes\DeleteTaskTypeRequest;

/**
 * TaskTypesController
 */
class TaskTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var TaskTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TaskTypeRepository $repository;
     */
    public function __construct(TaskTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\TaskTypes\ManageTaskTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageTaskTypeRequest $request)
    {
        return new ViewResponse('backend.tasktypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateTaskTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\TaskTypes\CreateResponse
     */
    public function create(CreateTaskTypeRequest $request)
    {
        return new CreateResponse('backend.tasktypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreTaskTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreTaskTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.tasktypes.index'), ['flash_success' => _tr('alerts.backend.tasktypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\TaskTypes\TaskType  $tasktype
     * @param  EditTaskTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\TaskTypes\EditResponse
     */
    public function edit(TaskType $tasktype, EditTaskTypeRequest $request)
    {
        return new EditResponse($tasktype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateTaskTypeRequestNamespace  $request
     * @param  App\Models\TaskTypes\TaskType  $tasktype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateTaskTypeRequest $request, TaskType $tasktype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $tasktype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.tasktypes.index'), ['flash_success' => _tr('alerts.backend.tasktypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteTaskTypeRequestNamespace  $request
     * @param  App\Models\TaskTypes\TaskType  $tasktype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(TaskType $tasktype, DeleteTaskTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($tasktype);
        //returning with successfull message
        return new RedirectResponse(route('admin.tasktypes.index'), ['flash_success' => _tr('alerts.backend.tasktypes.deleted')]);
    }
    
}
