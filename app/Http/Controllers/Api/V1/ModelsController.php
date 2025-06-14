<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ModelResource;
use App\Models\Models\Model;
use App\Repositories\Backend\Models\ModelRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ModelsController
 */
class ModelsController extends APIController
{
    /**
     * __construct.
     *
     * @var ModelRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ModelRepository $repository;
     */
    public function __construct(ModelRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $model.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ModelResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Model $model
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Model $model)
    {
        return new ModelResource($model);
    }

    
     /**
      * Creates the Resource for model.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateModel($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ModelResource(Model::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update model.
         *
         * @param Model    $model
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Model $model)
    {
        $validation = $this->validateModel($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($model, $request->all());

        $model = Model::findOrfail($model->id);

        return new ModelResource($model);
    }
    
    /**
     * Delete model.
     *
     * @param Model    $model
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Model $model)
    {
        $this->repository->delete($model);

        return $this->respond([
            'message' => _tr('alerts.backend.model.deleted'),
        ]);
    }
    

    /**
     * validate model.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateModel(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate model.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
