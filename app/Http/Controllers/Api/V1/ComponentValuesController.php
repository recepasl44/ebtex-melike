<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ComponentValueResource;
use App\Models\ComponentValues\ComponentValue;
use App\Repositories\Backend\ComponentValues\ComponentValueRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ComponentValuesController
 */
class ComponentValuesController extends APIController
{
    /**
     * __construct.
     *
     * @var ComponentValueRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ComponentValueRepository $repository;
     */
    public function __construct(ComponentValueRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $componentvalue.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ComponentValueResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ComponentValue $componentvalue
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ComponentValue $componentvalue)
    {
        return new ComponentValueResource($componentvalue);
    }

    
     /**
      * Creates the Resource for componentvalue.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateComponentValue($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ComponentValueResource(ComponentValue::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update componentvalue.
         *
         * @param ComponentValue    $componentvalue
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ComponentValue $componentvalue)
    {
        $validation = $this->validateComponentValue($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($componentvalue, $request->all());

        $componentvalue = ComponentValue::findOrfail($componentvalue->id);

        return new ComponentValueResource($componentvalue);
    }
    
    /**
     * Delete componentvalue.
     *
     * @param ComponentValue    $componentvalue
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ComponentValue $componentvalue)
    {
        $this->repository->delete($componentvalue);

        return $this->respond([
            'message' => _tr('alerts.backend.componentvalue.deleted'),
        ]);
    }
    

    /**
     * validate componentvalue.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateComponentValue(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'lang' => 'required|max:191',
               'component_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate componentvalue.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
