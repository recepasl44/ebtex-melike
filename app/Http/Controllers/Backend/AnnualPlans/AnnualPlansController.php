<?php

namespace App\Http\Controllers\Backend\AnnualPlans;

use App\Models\AnnualPlans\AnnualPlan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\AnnualPlans\CreateResponse;
use App\Http\Responses\Backend\AnnualPlans\EditResponse;
use App\Repositories\Backend\AnnualPlans\AnnualPlanRepository;
use App\Http\Requests\Backend\AnnualPlans\ManageAnnualPlanRequest;
use App\Http\Requests\Backend\AnnualPlans\CreateAnnualPlanRequest;
use App\Http\Requests\Backend\AnnualPlans\StoreAnnualPlanRequest;
use App\Http\Requests\Backend\AnnualPlans\EditAnnualPlanRequest;
use App\Http\Requests\Backend\AnnualPlans\UpdateAnnualPlanRequest;
use App\Http\Requests\Backend\AnnualPlans\DeleteAnnualPlanRequest;

/**
 * AnnualPlansController
 */
class AnnualPlansController extends Controller
{
    /**
     * variable to store the repository object
     * @var AnnualPlanRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AnnualPlanRepository $repository;
     */
    public function __construct(AnnualPlanRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\AnnualPlans\ManageAnnualPlanRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAnnualPlanRequest $request)
    {
        return new ViewResponse('backend.annualplans.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAnnualPlanRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AnnualPlans\CreateResponse
     */
    public function create(CreateAnnualPlanRequest $request)
    {
        return new CreateResponse('backend.annualplans.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAnnualPlanRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAnnualPlanRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.annualplans.index'), ['flash_success' => _tr('alerts.backend.annualplans.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\AnnualPlans\AnnualPlan  $annualplan
     * @param  EditAnnualPlanRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AnnualPlans\EditResponse
     */
    public function edit(AnnualPlan $annualplan, EditAnnualPlanRequest $request)
    {
        return new EditResponse($annualplan);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAnnualPlanRequestNamespace  $request
     * @param  App\Models\AnnualPlans\AnnualPlan  $annualplan
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAnnualPlanRequest $request, AnnualPlan $annualplan)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $annualplan, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.annualplans.index'), ['flash_success' => _tr('alerts.backend.annualplans.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAnnualPlanRequestNamespace  $request
     * @param  App\Models\AnnualPlans\AnnualPlan  $annualplan
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(AnnualPlan $annualplan, DeleteAnnualPlanRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($annualplan);
        //returning with successfull message
        return new RedirectResponse(route('admin.annualplans.index'), ['flash_success' => _tr('alerts.backend.annualplans.deleted')]);
    }
    
}
