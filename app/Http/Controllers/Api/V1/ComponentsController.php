<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ComponentResource;
use App\Models\Components\Component;
use App\Repositories\Backend\Components\ComponentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ComponentsController
 */
class ComponentsController extends APIController
{
    /**
     * __construct.
     *
     * @var ComponentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ComponentRepository $repository;
     */
    public function __construct(ComponentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $component.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ComponentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Component $component
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Component $component)
    {
        return new ComponentResource($component);
    }

    
     /**
      * Creates the Resource for component.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateComponent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ComponentResource(Component::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update component.
         *
         * @param Component    $component
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Component $component)
    {
        $validation = $this->validateComponent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($component, $request->all());

        $component = Component::findOrfail($component->id);

        return new ComponentResource($component);
    }
    
    /**
     * Delete component.
     *
     * @param Component    $component
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Component $component)
    {
        $this->repository->delete($component);

        return $this->respond([
            'message' => _tr('alerts.backend.component.deleted'),
        ]);
    }
    

    /**
     * validate component.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateComponent(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'cover' => 'numeric',
               ]);

        return $validation;
    }

    /**
     * validate message for validate component.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
