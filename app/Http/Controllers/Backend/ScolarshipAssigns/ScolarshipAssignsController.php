<?php

namespace App\Http\Controllers\Backend\ScolarshipAssigns;

use App\Models\ScolarshipAssigns\ScolarshipAssign;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ScolarshipAssigns\CreateResponse;
use App\Http\Responses\Backend\ScolarshipAssigns\EditResponse;
use App\Repositories\Backend\ScolarshipAssigns\ScolarshipAssignRepository;
use App\Http\Requests\Backend\ScolarshipAssigns\ManageScolarshipAssignRequest;
use App\Http\Requests\Backend\ScolarshipAssigns\CreateScolarshipAssignRequest;
use App\Http\Requests\Backend\ScolarshipAssigns\StoreScolarshipAssignRequest;
use App\Http\Requests\Backend\ScolarshipAssigns\EditScolarshipAssignRequest;
use App\Http\Requests\Backend\ScolarshipAssigns\UpdateScolarshipAssignRequest;
use App\Http\Requests\Backend\ScolarshipAssigns\DeleteScolarshipAssignRequest;

/**
 * ScolarshipAssignsController
 */
class ScolarshipAssignsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScolarshipAssignRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScolarshipAssignRepository $repository;
     */
    public function __construct(ScolarshipAssignRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ScolarshipAssigns\ManageScolarshipAssignRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageScolarshipAssignRequest $request)
    {
        return new ViewResponse('backend.scolarshipassigns.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateScolarshipAssignRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScolarshipAssigns\CreateResponse
     */
    public function create(CreateScolarshipAssignRequest $request)
    {
        return new CreateResponse('backend.scolarshipassigns.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreScolarshipAssignRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreScolarshipAssignRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.scolarshipassigns.index'), ['flash_success' => _tr('alerts.backend.scolarshipassigns.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ScolarshipAssigns\ScolarshipAssign  $scolarshipassign
     * @param  EditScolarshipAssignRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScolarshipAssigns\EditResponse
     */
    public function edit(ScolarshipAssign $scolarshipassign, EditScolarshipAssignRequest $request)
    {
        return new EditResponse($scolarshipassign);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateScolarshipAssignRequestNamespace  $request
     * @param  App\Models\ScolarshipAssigns\ScolarshipAssign  $scolarshipassign
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateScolarshipAssignRequest $request, ScolarshipAssign $scolarshipassign)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $scolarshipassign, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.scolarshipassigns.index'), ['flash_success' => _tr('alerts.backend.scolarshipassigns.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteScolarshipAssignRequestNamespace  $request
     * @param  App\Models\ScolarshipAssigns\ScolarshipAssign  $scolarshipassign
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ScolarshipAssign $scolarshipassign, DeleteScolarshipAssignRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($scolarshipassign);
        //returning with successfull message
        return new RedirectResponse(route('admin.scolarshipassigns.index'), ['flash_success' => _tr('alerts.backend.scolarshipassigns.deleted')]);
    }
    
}
