<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\TaskTypeResource;
use App\Models\TaskTypes\TaskType;
use App\Repositories\Backend\TaskTypes\TaskTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * TaskTypesController
 */
class TaskTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var TaskTypeRepository
     * @param $repository
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
     * Return the $tasktype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return TaskTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param TaskType $tasktype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(TaskType $tasktype)
    {
        return new TaskTypeResource($tasktype);
    }

    
     /**
      * Creates the Resource for tasktype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateTaskType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new TaskTypeResource(TaskType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update tasktype.
         *
         * @param TaskType    $tasktype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, TaskType $tasktype)
    {
        $validation = $this->validateTaskType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($tasktype, $request->all());

        $tasktype = TaskType::findOrfail($tasktype->id);

        return new TaskTypeResource($tasktype);
    }
    
    /**
     * Delete tasktype.
     *
     * @param TaskType    $tasktype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(TaskType $tasktype)
    {
        $this->repository->delete($tasktype);

        return $this->respond([
            'message' => _tr('alerts.backend.tasktype.deleted'),
        ]);
    }
    

    /**
     * validate tasktype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateTaskType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate tasktype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
