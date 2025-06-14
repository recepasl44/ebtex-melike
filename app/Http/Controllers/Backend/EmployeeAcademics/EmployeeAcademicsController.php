<?php

namespace App\Http\Controllers\Backend\EmployeeAcademics;

use App\Models\EmployeeAcademics\EmployeeAcademic;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\EmployeeAcademics\CreateResponse;
use App\Http\Responses\Backend\EmployeeAcademics\EditResponse;
use App\Repositories\Backend\EmployeeAcademics\EmployeeAcademicRepository;
use App\Http\Requests\Backend\EmployeeAcademics\ManageEmployeeAcademicRequest;
use App\Http\Requests\Backend\EmployeeAcademics\CreateEmployeeAcademicRequest;
use App\Http\Requests\Backend\EmployeeAcademics\StoreEmployeeAcademicRequest;
use App\Http\Requests\Backend\EmployeeAcademics\EditEmployeeAcademicRequest;
use App\Http\Requests\Backend\EmployeeAcademics\UpdateEmployeeAcademicRequest;
use App\Http\Requests\Backend\EmployeeAcademics\DeleteEmployeeAcademicRequest;

/**
 * EmployeeAcademicsController
 */
class EmployeeAcademicsController extends Controller
{
    /**
     * variable to store the repository object
     * @var EmployeeAcademicRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EmployeeAcademicRepository $repository;
     */
    public function __construct(EmployeeAcademicRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\EmployeeAcademics\ManageEmployeeAcademicRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageEmployeeAcademicRequest $request)
    {
        return new ViewResponse('backend.employeeacademics.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateEmployeeAcademicRequestNamespace  $request
     * @return \App\Http\Responses\Backend\EmployeeAcademics\CreateResponse
     */
    public function create(CreateEmployeeAcademicRequest $request)
    {
        return new CreateResponse('backend.employeeacademics.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreEmployeeAcademicRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreEmployeeAcademicRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.employeeacademics.index'), ['flash_success' => _tr('alerts.backend.employeeacademics.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\EmployeeAcademics\EmployeeAcademic  $employeeacademic
     * @param  EditEmployeeAcademicRequestNamespace  $request
     * @return \App\Http\Responses\Backend\EmployeeAcademics\EditResponse
     */
    public function edit(EmployeeAcademic $employeeacademic, EditEmployeeAcademicRequest $request)
    {
        return new EditResponse($employeeacademic);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEmployeeAcademicRequestNamespace  $request
     * @param  App\Models\EmployeeAcademics\EmployeeAcademic  $employeeacademic
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateEmployeeAcademicRequest $request, EmployeeAcademic $employeeacademic)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $employeeacademic, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.employeeacademics.index'), ['flash_success' => _tr('alerts.backend.employeeacademics.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteEmployeeAcademicRequestNamespace  $request
     * @param  App\Models\EmployeeAcademics\EmployeeAcademic  $employeeacademic
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(EmployeeAcademic $employeeacademic, DeleteEmployeeAcademicRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($employeeacademic);
        //returning with successfull message
        return new RedirectResponse(route('admin.employeeacademics.index'), ['flash_success' => _tr('alerts.backend.employeeacademics.deleted')]);
    }
    
}
