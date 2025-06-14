<?php

namespace App\Http\Controllers\Backend\ServiceTypes;

use App\Models\ServiceTypes\ServiceType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ServiceTypes\CreateResponse;
use App\Http\Responses\Backend\ServiceTypes\EditResponse;
use App\Repositories\Backend\ServiceTypes\ServiceTypeRepository;
use App\Http\Requests\Backend\ServiceTypes\ManageServiceTypeRequest;
use App\Http\Requests\Backend\ServiceTypes\CreateServiceTypeRequest;
use App\Http\Requests\Backend\ServiceTypes\StoreServiceTypeRequest;
use App\Http\Requests\Backend\ServiceTypes\EditServiceTypeRequest;
use App\Http\Requests\Backend\ServiceTypes\UpdateServiceTypeRequest;
use App\Http\Requests\Backend\ServiceTypes\DeleteServiceTypeRequest;

/**
 * ServiceTypesController
 */
class ServiceTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServiceTypeRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ServiceTypes\ManageServiceTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageServiceTypeRequest $request)
    {
        return new ViewResponse('backend.servicetypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateServiceTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ServiceTypes\CreateResponse
     */
    public function create(CreateServiceTypeRequest $request)
    {
        return new CreateResponse('backend.servicetypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreServiceTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreServiceTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.servicetypes.index'), ['flash_success' => _tr('alerts.backend.servicetypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ServiceTypes\ServiceType  $servicetype
     * @param  EditServiceTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ServiceTypes\EditResponse
     */
    public function edit(ServiceType $servicetype, EditServiceTypeRequest $request)
    {
        return new EditResponse($servicetype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateServiceTypeRequestNamespace  $request
     * @param  App\Models\ServiceTypes\ServiceType  $servicetype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateServiceTypeRequest $request, ServiceType $servicetype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $servicetype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.servicetypes.index'), ['flash_success' => _tr('alerts.backend.servicetypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteServiceTypeRequestNamespace  $request
     * @param  App\Models\ServiceTypes\ServiceType  $servicetype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ServiceType $servicetype, DeleteServiceTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($servicetype);
        //returning with successfull message
        return new RedirectResponse(route('admin.servicetypes.index'), ['flash_success' => _tr('alerts.backend.servicetypes.deleted')]);
    }
    
}
