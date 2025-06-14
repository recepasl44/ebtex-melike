<?php

namespace App\Http\Controllers\Backend\Guidances;

use App\Models\Guidances\Guidance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Guidances\CreateResponse;
use App\Http\Responses\Backend\Guidances\EditResponse;
use App\Repositories\Backend\Guidances\GuidanceRepository;
use App\Http\Requests\Backend\Guidances\ManageGuidanceRequest;
use App\Http\Requests\Backend\Guidances\CreateGuidanceRequest;
use App\Http\Requests\Backend\Guidances\StoreGuidanceRequest;
use App\Http\Requests\Backend\Guidances\EditGuidanceRequest;
use App\Http\Requests\Backend\Guidances\UpdateGuidanceRequest;
use App\Http\Requests\Backend\Guidances\DeleteGuidanceRequest;

/**
 * GuidancesController
 */
class GuidancesController extends Controller
{
    /**
     * variable to store the repository object
     * @var GuidanceRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuidanceRepository $repository;
     */
    public function __construct(GuidanceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Guidances\ManageGuidanceRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageGuidanceRequest $request)
    {
        return new ViewResponse('backend.guidances.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateGuidanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Guidances\CreateResponse
     */
    public function create(CreateGuidanceRequest $request)
    {
        return new CreateResponse('backend.guidances.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreGuidanceRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreGuidanceRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.guidances.index'), ['flash_success' => _tr('alerts.backend.guidances.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Guidances\Guidance  $guidance
     * @param  EditGuidanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Guidances\EditResponse
     */
    public function edit(Guidance $guidance, EditGuidanceRequest $request)
    {
        return new EditResponse($guidance);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateGuidanceRequestNamespace  $request
     * @param  App\Models\Guidances\Guidance  $guidance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateGuidanceRequest $request, Guidance $guidance)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $guidance, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.guidances.index'), ['flash_success' => _tr('alerts.backend.guidances.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteGuidanceRequestNamespace  $request
     * @param  App\Models\Guidances\Guidance  $guidance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Guidance $guidance, DeleteGuidanceRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($guidance);
        //returning with successfull message
        return new RedirectResponse(route('admin.guidances.index'), ['flash_success' => _tr('alerts.backend.guidances.deleted')]);
    }
    
}
