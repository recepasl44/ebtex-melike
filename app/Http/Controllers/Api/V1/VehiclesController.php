<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\VehicleResource;
use App\Models\Vehicles\Vehicle;
use App\Repositories\Backend\Vehicles\VehicleRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * VehiclesController
 */
class VehiclesController extends APIController
{
    /**
     * __construct.
     *
     * @var VehicleRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param VehicleRepository $repository;
     */
    public function __construct(VehicleRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $vehicle.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return VehicleResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Vehicle $vehicle
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Vehicle $vehicle)
    {
        return new VehicleResource($vehicle);
    }

    
     /**
      * Creates the Resource for vehicle.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateVehicle($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new VehicleResource(Vehicle::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update vehicle.
         *
         * @param Vehicle    $vehicle
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Vehicle $vehicle)
    {
        $validation = $this->validateVehicle($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($vehicle, $request->all());

        $vehicle = Vehicle::findOrfail($vehicle->id);

        return new VehicleResource($vehicle);
    }
    
    /**
     * Delete vehicle.
     *
     * @param Vehicle    $vehicle
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Vehicle $vehicle)
    {
        $this->repository->delete($vehicle);

        return $this->respond([
            'message' => _tr('alerts.backend.vehicle.deleted'),
        ]);
    }
    

    /**
     * validate vehicle.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateVehicle(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'plate_no' => 'required|max:191',
               'model_year' => 'max:191',
               'owner' => 'max:191',
               'vin' => 'max:191',
               'check_date' => 'date',
               'insurance_date' => 'date',
               'mtv_date' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate vehicle.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
