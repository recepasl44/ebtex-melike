<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ServiceResource;
use App\Models\Services\Service;
use App\Repositories\Backend\Services\ServiceRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ServicesController
 */
class ServicesController extends APIController
{
    /**
     * __construct.
     *
     * @var ServiceRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ServiceRepository $repository;
     */
    public function __construct(ServiceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $service.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ServiceResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Service $service
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Service $service)
    {
        return new ServiceResource($service);
    }

    
     /**
      * Creates the Resource for service.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateService($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ServiceResource(Service::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update service.
         *
         * @param Service    $service
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Service $service)
    {
        $validation = $this->validateService($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($service, $request->all());

        $service = Service::findOrfail($service->id);

        return new ServiceResource($service);
    }
    
    /**
     * Delete service.
     *
     * @param Service    $service
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Service $service)
    {
        $this->repository->delete($service);

        return $this->respond([
            'message' => _tr('alerts.backend.service.deleted'),
        ]);
    }
    

    /**
     * validate service.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateService(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'price' => 'required|decimal:2',
               ]);

        return $validation;
    }

    /**
     * validate message for validate service.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
