<?php

namespace App\Http\Controllers\Backend\Tasks;

use App\Models\Tasks\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Tasks\CreateResponse;
use App\Http\Responses\Backend\Tasks\EditResponse;
use App\Repositories\Backend\Tasks\TaskRepository;
use App\Http\Requests\Backend\Tasks\ManageTaskRequest;
use App\Http\Requests\Backend\Tasks\CreateTaskRequest;
use App\Http\Requests\Backend\Tasks\StoreTaskRequest;
use App\Http\Requests\Backend\Tasks\EditTaskRequest;
use App\Http\Requests\Backend\Tasks\UpdateTaskRequest;
use App\Http\Requests\Backend\Tasks\DeleteTaskRequest;

/**
 * TasksController
 */
class TasksController extends Controller
{
    /**
     * variable to store the repository object
     * @var TaskRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TaskRepository $repository;
     */
    public function __construct(TaskRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Tasks\ManageTaskRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageTaskRequest $request)
    {
        return new ViewResponse('backend.tasks.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateTaskRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Tasks\CreateResponse
     */
    public function create(CreateTaskRequest $request)
    {
        return new CreateResponse('backend.tasks.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreTaskRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreTaskRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.tasks.index'), ['flash_success' => _tr('alerts.backend.tasks.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Tasks\Task  $task
     * @param  EditTaskRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Tasks\EditResponse
     */
    public function edit(Task $task, EditTaskRequest $request)
    {
        return new EditResponse($task);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateTaskRequestNamespace  $request
     * @param  App\Models\Tasks\Task  $task
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $task, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.tasks.index'), ['flash_success' => _tr('alerts.backend.tasks.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteTaskRequestNamespace  $request
     * @param  App\Models\Tasks\Task  $task
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Task $task, DeleteTaskRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($task);
        //returning with successfull message
        return new RedirectResponse(route('admin.tasks.index'), ['flash_success' => _tr('alerts.backend.tasks.deleted')]);
    }
    
}
