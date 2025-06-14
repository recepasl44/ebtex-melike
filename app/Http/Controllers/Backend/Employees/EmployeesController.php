<?php

namespace App\Http\Controllers\Backend\Employees;

use App\Models\Employees\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Employees\CreateResponse;
use App\Http\Responses\Backend\Employees\EditResponse;
use App\Repositories\Backend\Employees\EmployeeRepository;
use App\Http\Requests\Backend\Employees\ManageEmployeeRequest;
use App\Http\Requests\Backend\Employees\CreateEmployeeRequest;
use App\Http\Requests\Backend\Employees\StoreEmployeeRequest;
use App\Http\Requests\Backend\Employees\EditEmployeeRequest;
use App\Http\Requests\Backend\Employees\UpdateEmployeeRequest;
use App\Http\Requests\Backend\Employees\DeleteEmployeeRequest;

/**
 * EmployeesController
 */
class EmployeesController extends Controller
{
    /**
     * variable to store the repository object
     * @var EmployeeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EmployeeRepository $repository;
     */
    public function __construct(EmployeeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Employees\ManageEmployeeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageEmployeeRequest $request)
    {
        return new ViewResponse('backend.employees.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateEmployeeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Employees\CreateResponse
     */
    public function create(CreateEmployeeRequest $request)
    {
        return new CreateResponse('backend.employees.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreEmployeeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreEmployeeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.employees.index'), ['flash_success' => _tr('alerts.backend.employees.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Employees\Employee  $employee
     * @param  EditEmployeeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Employees\EditResponse
     */
    public function edit(Employee $employee, EditEmployeeRequest $request)
    {
        return new EditResponse($employee);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEmployeeRequestNamespace  $request
     * @param  App\Models\Employees\Employee  $employee
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $employee, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.employees.index'), ['flash_success' => _tr('alerts.backend.employees.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteEmployeeRequestNamespace  $request
     * @param  App\Models\Employees\Employee  $employee
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Employee $employee, DeleteEmployeeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($employee);
        //returning with successfull message
        return new RedirectResponse(route('admin.employees.index'), ['flash_success' => _tr('alerts.backend.employees.deleted')]);
    }
    
}
