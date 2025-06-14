<?php

namespace App\Http\Controllers\Backend\ServicePlans;

use App\Models\ServicePlans\ServicePlan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ServicePlans\CreateResponse;
use App\Http\Responses\Backend\ServicePlans\EditResponse;
use App\Repositories\Backend\ServicePlans\ServicePlanRepository;
use App\Http\Requests\Backend\ServicePlans\ManageServicePlanRequest;
use App\Http\Requests\Backend\ServicePlans\CreateServicePlanRequest;
use App\Http\Requests\Backend\ServicePlans\StoreServicePlanRequest;
use App\Http\Requests\Backend\ServicePlans\EditServicePlanRequest;
use App\Http\Requests\Backend\ServicePlans\UpdateServicePlanRequest;
use App\Http\Requests\Backend\ServicePlans\DeleteServicePlanRequest;

/**
 * ServicePlansController
 */
class ServicePlansController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServicePlanRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ServicePlans\ManageServicePlanRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageServicePlanRequest $request)
    {
        return new ViewResponse('backend.serviceplans.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateServicePlanRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ServicePlans\CreateResponse
     */
    public function create(CreateServicePlanRequest $request)
    {
        return new CreateResponse('backend.serviceplans.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreServicePlanRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreServicePlanRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.serviceplans.index'), ['flash_success' => _tr('alerts.backend.serviceplans.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ServicePlans\ServicePlan  $serviceplan
     * @param  EditServicePlanRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ServicePlans\EditResponse
     */
    public function edit(ServicePlan $serviceplan, EditServicePlanRequest $request)
    {
        return new EditResponse($serviceplan);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateServicePlanRequestNamespace  $request
     * @param  App\Models\ServicePlans\ServicePlan  $serviceplan
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateServicePlanRequest $request, ServicePlan $serviceplan)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $serviceplan, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.serviceplans.index'), ['flash_success' => _tr('alerts.backend.serviceplans.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteServicePlanRequestNamespace  $request
     * @param  App\Models\ServicePlans\ServicePlan  $serviceplan
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ServicePlan $serviceplan, DeleteServicePlanRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($serviceplan);
        //returning with successfull message
        return new RedirectResponse(route('admin.serviceplans.index'), ['flash_success' => _tr('alerts.backend.serviceplans.deleted')]);
    }
    
}
