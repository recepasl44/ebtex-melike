<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ServicePlanResource;
use App\Models\ServicePlans\ServicePlan;
use App\Repositories\Backend\ServicePlans\ServicePlanRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ServicePlansController
 */
class ServicePlansController extends APIController
{
    /**
     * __construct.
     *
     * @var ServicePlanRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ServicePlanRepository $repository;
     */
    public function __construct(ServicePlanRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $serviceplan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ServicePlanResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ServicePlan $serviceplan
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ServicePlan $serviceplan)
    {
        return new ServicePlanResource($serviceplan);
    }

    
     /**
      * Creates the Resource for serviceplan.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateServicePlan($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ServicePlanResource(ServicePlan::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update serviceplan.
         *
         * @param ServicePlan    $serviceplan
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ServicePlan $serviceplan)
    {
        $validation = $this->validateServicePlan($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($serviceplan, $request->all());

        $serviceplan = ServicePlan::findOrfail($serviceplan->id);

        return new ServicePlanResource($serviceplan);
    }
    
    /**
     * Delete serviceplan.
     *
     * @param ServicePlan    $serviceplan
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ServicePlan $serviceplan)
    {
        $this->repository->delete($serviceplan);

        return $this->respond([
            'message' => _tr('alerts.backend.serviceplan.deleted'),
        ]);
    }
    

    /**
     * validate serviceplan.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateServicePlan(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'vehicle_id' => 'required',
               'driver_id' => 'required',
               'start_date' => 'date',
               'end_date' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate serviceplan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
