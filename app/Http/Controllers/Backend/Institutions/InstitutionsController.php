<?php

namespace App\Http\Controllers\Backend\Institutions;

use App\Models\Institutions\Institution;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Institutions\CreateResponse;
use App\Http\Responses\Backend\Institutions\EditResponse;
use App\Repositories\Backend\Institutions\InstitutionRepository;
use App\Http\Requests\Backend\Institutions\ManageInstitutionRequest;
use App\Http\Requests\Backend\Institutions\CreateInstitutionRequest;
use App\Http\Requests\Backend\Institutions\StoreInstitutionRequest;
use App\Http\Requests\Backend\Institutions\EditInstitutionRequest;
use App\Http\Requests\Backend\Institutions\UpdateInstitutionRequest;
use App\Http\Requests\Backend\Institutions\DeleteInstitutionRequest;

/**
 * InstitutionsController
 */
class InstitutionsController extends Controller
{
    /**
     * variable to store the repository object
     * @var InstitutionRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param InstitutionRepository $repository;
     */
    public function __construct(InstitutionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Institutions\ManageInstitutionRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageInstitutionRequest $request)
    {
        return new ViewResponse('backend.institutions.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateInstitutionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Institutions\CreateResponse
     */
    public function create(CreateInstitutionRequest $request)
    {
        return new CreateResponse('backend.institutions.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreInstitutionRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreInstitutionRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.institutions.index'), ['flash_success' => _tr('alerts.backend.institutions.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Institutions\Institution  $institution
     * @param  EditInstitutionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Institutions\EditResponse
     */
    public function edit(Institution $institution, EditInstitutionRequest $request)
    {
        return new EditResponse($institution);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateInstitutionRequestNamespace  $request
     * @param  App\Models\Institutions\Institution  $institution
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateInstitutionRequest $request, Institution $institution)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $institution, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.institutions.index'), ['flash_success' => _tr('alerts.backend.institutions.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteInstitutionRequestNamespace  $request
     * @param  App\Models\Institutions\Institution  $institution
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Institution $institution, DeleteInstitutionRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($institution);
        //returning with successfull message
        return new RedirectResponse(route('admin.institutions.index'), ['flash_success' => _tr('alerts.backend.institutions.deleted')]);
    }
    
}
