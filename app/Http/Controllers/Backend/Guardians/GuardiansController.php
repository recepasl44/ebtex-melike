<?php

namespace App\Http\Controllers\Backend\Guardians;

use App\Models\Guardians\Guardian;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Guardians\CreateResponse;
use App\Http\Responses\Backend\Guardians\EditResponse;
use App\Repositories\Backend\Guardians\GuardianRepository;
use App\Http\Requests\Backend\Guardians\ManageGuardianRequest;
use App\Http\Requests\Backend\Guardians\CreateGuardianRequest;
use App\Http\Requests\Backend\Guardians\StoreGuardianRequest;
use App\Http\Requests\Backend\Guardians\EditGuardianRequest;
use App\Http\Requests\Backend\Guardians\UpdateGuardianRequest;
use App\Http\Requests\Backend\Guardians\DeleteGuardianRequest;

/**
 * GuardiansController
 */
class GuardiansController extends Controller
{
    /**
     * variable to store the repository object
     * @var GuardianRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuardianRepository $repository;
     */
    public function __construct(GuardianRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Guardians\ManageGuardianRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageGuardianRequest $request)
    {
        return new ViewResponse('backend.guardians.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateGuardianRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Guardians\CreateResponse
     */
    public function create(CreateGuardianRequest $request)
    {
        return new CreateResponse('backend.guardians.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreGuardianRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreGuardianRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.guardians.index'), ['flash_success' => _tr('alerts.backend.guardians.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Guardians\Guardian  $guardian
     * @param  EditGuardianRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Guardians\EditResponse
     */
    public function edit(Guardian $guardian, EditGuardianRequest $request)
    {
        return new EditResponse($guardian);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateGuardianRequestNamespace  $request
     * @param  App\Models\Guardians\Guardian  $guardian
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateGuardianRequest $request, Guardian $guardian)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $guardian, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.guardians.index'), ['flash_success' => _tr('alerts.backend.guardians.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteGuardianRequestNamespace  $request
     * @param  App\Models\Guardians\Guardian  $guardian
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Guardian $guardian, DeleteGuardianRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($guardian);
        //returning with successfull message
        return new RedirectResponse(route('admin.guardians.index'), ['flash_success' => _tr('alerts.backend.guardians.deleted')]);
    }
    
}
