<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\TaskResource;
use App\Models\Tasks\Task;
use App\Repositories\Backend\Tasks\TaskRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * TasksController
 */
class TasksController extends APIController
{
    /**
     * __construct.
     *
     * @var TaskRepository
     * @param $repository
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
     * Return the $task.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return TaskResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Task $task
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    
     /**
      * Creates the Resource for task.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateTask($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new TaskResource(Task::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update task.
         *
         * @param Task    $task
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Task $task)
    {
        $validation = $this->validateTask($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($task, $request->all());

        $task = Task::findOrfail($task->id);

        return new TaskResource($task);
    }
    
    /**
     * Delete task.
     *
     * @param Task    $task
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Task $task)
    {
        $this->repository->delete($task);

        return $this->respond([
            'message' => _tr('alerts.backend.task.deleted'),
        ]);
    }
    

    /**
     * validate task.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateTask(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'user_by' => 'required',
               'user_at' => 'required',
               'task_to' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate task.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
