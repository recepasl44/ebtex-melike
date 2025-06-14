<?php

namespace App\Http\Controllers\Backend\ContractTypes;

use App\Models\ContractTypes\ContractType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ContractTypes\CreateResponse;
use App\Http\Responses\Backend\ContractTypes\EditResponse;
use App\Repositories\Backend\ContractTypes\ContractTypeRepository;
use App\Http\Requests\Backend\ContractTypes\ManageContractTypeRequest;
use App\Http\Requests\Backend\ContractTypes\CreateContractTypeRequest;
use App\Http\Requests\Backend\ContractTypes\StoreContractTypeRequest;
use App\Http\Requests\Backend\ContractTypes\EditContractTypeRequest;
use App\Http\Requests\Backend\ContractTypes\UpdateContractTypeRequest;
use App\Http\Requests\Backend\ContractTypes\DeleteContractTypeRequest;

/**
 * ContractTypesController
 */
class ContractTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var ContractTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ContractTypeRepository $repository;
     */
    public function __construct(ContractTypeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ContractTypes\ManageContractTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageContractTypeRequest $request)
    {
        return new ViewResponse('backend.contracttypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateContractTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ContractTypes\CreateResponse
     */
    public function create(CreateContractTypeRequest $request)
    {
        return new CreateResponse('backend.contracttypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreContractTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreContractTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.contracttypes.index'), ['flash_success' => _tr('alerts.backend.contracttypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ContractTypes\ContractType  $contracttype
     * @param  EditContractTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ContractTypes\EditResponse
     */
    public function edit(ContractType $contracttype, EditContractTypeRequest $request)
    {
        return new EditResponse($contracttype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateContractTypeRequestNamespace  $request
     * @param  App\Models\ContractTypes\ContractType  $contracttype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateContractTypeRequest $request, ContractType $contracttype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $contracttype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.contracttypes.index'), ['flash_success' => _tr('alerts.backend.contracttypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteContractTypeRequestNamespace  $request
     * @param  App\Models\ContractTypes\ContractType  $contracttype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ContractType $contracttype, DeleteContractTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($contracttype);
        //returning with successfull message
        return new RedirectResponse(route('admin.contracttypes.index'), ['flash_success' => _tr('alerts.backend.contracttypes.deleted')]);
    }
    
}
