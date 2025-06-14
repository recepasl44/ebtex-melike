<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ServiceTypeResource;
use App\Models\ServiceTypes\ServiceType;
use App\Repositories\Backend\ServiceTypes\ServiceTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ServiceTypesController
 */
class ServiceTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var ServiceTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ServiceTypeRepository $repository;
     */
    public function __construct(ServiceTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $servicetype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ServiceTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ServiceType $servicetype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ServiceType $servicetype)
    {
        return new ServiceTypeResource($servicetype);
    }

    
     /**
      * Creates the Resource for servicetype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateServiceType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ServiceTypeResource(ServiceType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update servicetype.
         *
         * @param ServiceType    $servicetype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ServiceType $servicetype)
    {
        $validation = $this->validateServiceType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($servicetype, $request->all());

        $servicetype = ServiceType::findOrfail($servicetype->id);

        return new ServiceTypeResource($servicetype);
    }
    
    /**
     * Delete servicetype.
     *
     * @param ServiceType    $servicetype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ServiceType $servicetype)
    {
        $this->repository->delete($servicetype);

        return $this->respond([
            'message' => _tr('alerts.backend.servicetype.deleted'),
        ]);
    }
    

    /**
     * validate servicetype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateServiceType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate servicetype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
