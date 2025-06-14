<?php

namespace App\Http\Controllers\Backend\Services;

use App\Models\Services\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Services\CreateResponse;
use App\Http\Responses\Backend\Services\EditResponse;
use App\Repositories\Backend\Services\ServiceRepository;
use App\Http\Requests\Backend\Services\ManageServiceRequest;
use App\Http\Requests\Backend\Services\CreateServiceRequest;
use App\Http\Requests\Backend\Services\StoreServiceRequest;
use App\Http\Requests\Backend\Services\EditServiceRequest;
use App\Http\Requests\Backend\Services\UpdateServiceRequest;
use App\Http\Requests\Backend\Services\DeleteServiceRequest;

/**
 * ServicesController
 */
class ServicesController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServiceRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Services\ManageServiceRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageServiceRequest $request)
    {
        return new ViewResponse('backend.services.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateServiceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Services\CreateResponse
     */
    public function create(CreateServiceRequest $request)
    {
        return new CreateResponse('backend.services.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreServiceRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreServiceRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.services.index'), ['flash_success' => _tr('alerts.backend.services.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Services\Service  $service
     * @param  EditServiceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Services\EditResponse
     */
    public function edit(Service $service, EditServiceRequest $request)
    {
        return new EditResponse($service);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateServiceRequestNamespace  $request
     * @param  App\Models\Services\Service  $service
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $service, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.services.index'), ['flash_success' => _tr('alerts.backend.services.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteServiceRequestNamespace  $request
     * @param  App\Models\Services\Service  $service
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Service $service, DeleteServiceRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($service);
        //returning with successfull message
        return new RedirectResponse(route('admin.services.index'), ['flash_success' => _tr('alerts.backend.services.deleted')]);
    }
    
}
