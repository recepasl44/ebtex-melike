<?php

namespace App\Http\Controllers\Backend\ContractEmployees;

use App\Models\ContractEmployees\ContractEmployee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ContractEmployees\CreateResponse;
use App\Http\Responses\Backend\ContractEmployees\EditResponse;
use App\Repositories\Backend\ContractEmployees\ContractEmployeeRepository;
use App\Http\Requests\Backend\ContractEmployees\ManageContractEmployeeRequest;
use App\Http\Requests\Backend\ContractEmployees\CreateContractEmployeeRequest;
use App\Http\Requests\Backend\ContractEmployees\StoreContractEmployeeRequest;
use App\Http\Requests\Backend\ContractEmployees\EditContractEmployeeRequest;
use App\Http\Requests\Backend\ContractEmployees\UpdateContractEmployeeRequest;
use App\Http\Requests\Backend\ContractEmployees\DeleteContractEmployeeRequest;

/**
 * ContractEmployeesController
 */
class ContractEmployeesController extends Controller
{
    /**
     * variable to store the repository object
     * @var ContractEmployeeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ContractEmployeeRepository $repository;
     */
    public function __construct(ContractEmployeeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ContractEmployees\ManageContractEmployeeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageContractEmployeeRequest $request)
    {
        return new ViewResponse('backend.contractemployees.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateContractEmployeeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ContractEmployees\CreateResponse
     */
    public function create(CreateContractEmployeeRequest $request)
    {
        return new CreateResponse('backend.contractemployees.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreContractEmployeeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreContractEmployeeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.contractemployees.index'), ['flash_success' => _tr('alerts.backend.contractemployees.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ContractEmployees\ContractEmployee  $contractemployee
     * @param  EditContractEmployeeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ContractEmployees\EditResponse
     */
    public function edit(ContractEmployee $contractemployee, EditContractEmployeeRequest $request)
    {
        return new EditResponse($contractemployee);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateContractEmployeeRequestNamespace  $request
     * @param  App\Models\ContractEmployees\ContractEmployee  $contractemployee
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateContractEmployeeRequest $request, ContractEmployee $contractemployee)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $contractemployee, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.contractemployees.index'), ['flash_success' => _tr('alerts.backend.contractemployees.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteContractEmployeeRequestNamespace  $request
     * @param  App\Models\ContractEmployees\ContractEmployee  $contractemployee
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ContractEmployee $contractemployee, DeleteContractEmployeeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($contractemployee);
        //returning with successfull message
        return new RedirectResponse(route('admin.contractemployees.index'), ['flash_success' => _tr('alerts.backend.contractemployees.deleted')]);
    }
    
}
