<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ServiceStopResource;
use App\Models\ServiceStops\ServiceStop;
use App\Repositories\Backend\ServiceStops\ServiceStopRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ServiceStopsController
 */
class ServiceStopsController extends APIController
{
    /**
     * __construct.
     *
     * @var ServiceStopRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ServiceStopRepository $repository;
     */
    public function __construct(ServiceStopRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $servicestop.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ServiceStopResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ServiceStop $servicestop
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ServiceStop $servicestop)
    {
        return new ServiceStopResource($servicestop);
    }

    
     /**
      * Creates the Resource for servicestop.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateServiceStop($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ServiceStopResource(ServiceStop::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update servicestop.
         *
         * @param ServiceStop    $servicestop
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ServiceStop $servicestop)
    {
        $validation = $this->validateServiceStop($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($servicestop, $request->all());

        $servicestop = ServiceStop::findOrfail($servicestop->id);

        return new ServiceStopResource($servicestop);
    }
    
    /**
     * Delete servicestop.
     *
     * @param ServiceStop    $servicestop
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ServiceStop $servicestop)
    {
        $this->repository->delete($servicestop);

        return $this->respond([
            'message' => _tr('alerts.backend.servicestop.deleted'),
        ]);
    }
    

    /**
     * validate servicestop.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateServiceStop(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'lat' => 'decimal:2',
               'long' => 'decimal:2',
               ]);

        return $validation;
    }

    /**
     * validate message for validate servicestop.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
