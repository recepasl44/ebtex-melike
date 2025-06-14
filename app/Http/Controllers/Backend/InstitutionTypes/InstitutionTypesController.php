<?php

namespace App\Http\Controllers\Backend\InstitutionTypes;

use App\Models\InstitutionTypes\InstitutionType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\InstitutionTypes\CreateResponse;
use App\Http\Responses\Backend\InstitutionTypes\EditResponse;
use App\Repositories\Backend\InstitutionTypes\InstitutionTypeRepository;
use App\Http\Requests\Backend\InstitutionTypes\ManageInstitutionTypeRequest;
use App\Http\Requests\Backend\InstitutionTypes\CreateInstitutionTypeRequest;
use App\Http\Requests\Backend\InstitutionTypes\StoreInstitutionTypeRequest;
use App\Http\Requests\Backend\InstitutionTypes\EditInstitutionTypeRequest;
use App\Http\Requests\Backend\InstitutionTypes\UpdateInstitutionTypeRequest;
use App\Http\Requests\Backend\InstitutionTypes\DeleteInstitutionTypeRequest;

/**
 * InstitutionTypesController
 */
class InstitutionTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var InstitutionTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param InstitutionTypeRepository $repository;
     */
    public function __construct(InstitutionTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\InstitutionTypes\ManageInstitutionTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageInstitutionTypeRequest $request)
    {
        return new ViewResponse('backend.institutiontypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateInstitutionTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\InstitutionTypes\CreateResponse
     */
    public function create(CreateInstitutionTypeRequest $request)
    {
        return new CreateResponse('backend.institutiontypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreInstitutionTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreInstitutionTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.institutiontypes.index'), ['flash_success' => _tr('alerts.backend.institutiontypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\InstitutionTypes\InstitutionType  $institutiontype
     * @param  EditInstitutionTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\InstitutionTypes\EditResponse
     */
    public function edit(InstitutionType $institutiontype, EditInstitutionTypeRequest $request)
    {
        return new EditResponse($institutiontype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateInstitutionTypeRequestNamespace  $request
     * @param  App\Models\InstitutionTypes\InstitutionType  $institutiontype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateInstitutionTypeRequest $request, InstitutionType $institutiontype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $institutiontype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.institutiontypes.index'), ['flash_success' => _tr('alerts.backend.institutiontypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteInstitutionTypeRequestNamespace  $request
     * @param  App\Models\InstitutionTypes\InstitutionType  $institutiontype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(InstitutionType $institutiontype, DeleteInstitutionTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($institutiontype);
        //returning with successfull message
        return new RedirectResponse(route('admin.institutiontypes.index'), ['flash_success' => _tr('alerts.backend.institutiontypes.deleted')]);
    }
    
}
