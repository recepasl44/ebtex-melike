<?php

namespace App\Http\Controllers\Backend\ServiceStops;

use App\Models\ServiceStops\ServiceStop;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ServiceStops\CreateResponse;
use App\Http\Responses\Backend\ServiceStops\EditResponse;
use App\Repositories\Backend\ServiceStops\ServiceStopRepository;
use App\Http\Requests\Backend\ServiceStops\ManageServiceStopRequest;
use App\Http\Requests\Backend\ServiceStops\CreateServiceStopRequest;
use App\Http\Requests\Backend\ServiceStops\StoreServiceStopRequest;
use App\Http\Requests\Backend\ServiceStops\EditServiceStopRequest;
use App\Http\Requests\Backend\ServiceStops\UpdateServiceStopRequest;
use App\Http\Requests\Backend\ServiceStops\DeleteServiceStopRequest;

/**
 * ServiceStopsController
 */
class ServiceStopsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServiceStopRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ServiceStops\ManageServiceStopRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageServiceStopRequest $request)
    {
        return new ViewResponse('backend.servicestops.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateServiceStopRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ServiceStops\CreateResponse
     */
    public function create(CreateServiceStopRequest $request)
    {
        return new CreateResponse('backend.servicestops.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreServiceStopRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreServiceStopRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.servicestops.index'), ['flash_success' => _tr('alerts.backend.servicestops.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ServiceStops\ServiceStop  $servicestop
     * @param  EditServiceStopRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ServiceStops\EditResponse
     */
    public function edit(ServiceStop $servicestop, EditServiceStopRequest $request)
    {
        return new EditResponse($servicestop);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateServiceStopRequestNamespace  $request
     * @param  App\Models\ServiceStops\ServiceStop  $servicestop
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateServiceStopRequest $request, ServiceStop $servicestop)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $servicestop, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.servicestops.index'), ['flash_success' => _tr('alerts.backend.servicestops.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteServiceStopRequestNamespace  $request
     * @param  App\Models\ServiceStops\ServiceStop  $servicestop
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ServiceStop $servicestop, DeleteServiceStopRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($servicestop);
        //returning with successfull message
        return new RedirectResponse(route('admin.servicestops.index'), ['flash_success' => _tr('alerts.backend.servicestops.deleted')]);
    }
    
}
