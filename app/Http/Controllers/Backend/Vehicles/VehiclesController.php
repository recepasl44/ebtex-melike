<?php

namespace App\Http\Controllers\Backend\Vehicles;

use App\Models\Vehicles\Vehicle;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Vehicles\CreateResponse;
use App\Http\Responses\Backend\Vehicles\EditResponse;
use App\Repositories\Backend\Vehicles\VehicleRepository;
use App\Http\Requests\Backend\Vehicles\ManageVehicleRequest;
use App\Http\Requests\Backend\Vehicles\CreateVehicleRequest;
use App\Http\Requests\Backend\Vehicles\StoreVehicleRequest;
use App\Http\Requests\Backend\Vehicles\EditVehicleRequest;
use App\Http\Requests\Backend\Vehicles\UpdateVehicleRequest;
use App\Http\Requests\Backend\Vehicles\DeleteVehicleRequest;

/**
 * VehiclesController
 */
class VehiclesController extends Controller
{
    /**
     * variable to store the repository object
     * @var VehicleRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Vehicles\ManageVehicleRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageVehicleRequest $request)
    {
        return new ViewResponse('backend.vehicles.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateVehicleRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Vehicles\CreateResponse
     */
    public function create(CreateVehicleRequest $request)
    {
        return new CreateResponse('backend.vehicles.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreVehicleRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreVehicleRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.vehicles.index'), ['flash_success' => _tr('alerts.backend.vehicles.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Vehicles\Vehicle  $vehicle
     * @param  EditVehicleRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Vehicles\EditResponse
     */
    public function edit(Vehicle $vehicle, EditVehicleRequest $request)
    {
        return new EditResponse($vehicle);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateVehicleRequestNamespace  $request
     * @param  App\Models\Vehicles\Vehicle  $vehicle
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $vehicle, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.vehicles.index'), ['flash_success' => _tr('alerts.backend.vehicles.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteVehicleRequestNamespace  $request
     * @param  App\Models\Vehicles\Vehicle  $vehicle
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Vehicle $vehicle, DeleteVehicleRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($vehicle);
        //returning with successfull message
        return new RedirectResponse(route('admin.vehicles.index'), ['flash_success' => _tr('alerts.backend.vehicles.deleted')]);
    }
    
}
