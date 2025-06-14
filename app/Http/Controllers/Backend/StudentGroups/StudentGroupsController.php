<?php

namespace App\Http\Controllers\Backend\StudentGroups;

use App\Models\StudentGroups\StudentGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\StudentGroups\CreateResponse;
use App\Http\Responses\Backend\StudentGroups\EditResponse;
use App\Repositories\Backend\StudentGroups\StudentGroupRepository;
use App\Http\Requests\Backend\StudentGroups\ManageStudentGroupRequest;
use App\Http\Requests\Backend\StudentGroups\CreateStudentGroupRequest;
use App\Http\Requests\Backend\StudentGroups\StoreStudentGroupRequest;
use App\Http\Requests\Backend\StudentGroups\EditStudentGroupRequest;
use App\Http\Requests\Backend\StudentGroups\UpdateStudentGroupRequest;
use App\Http\Requests\Backend\StudentGroups\DeleteStudentGroupRequest;

/**
 * StudentGroupsController
 */
class StudentGroupsController extends Controller
{
    /**
     * variable to store the repository object
     * @var StudentGroupRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param StudentGroupRepository $repository;
     */
    public function __construct(StudentGroupRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\StudentGroups\ManageStudentGroupRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageStudentGroupRequest $request)
    {
        return new ViewResponse('backend.studentgroups.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateStudentGroupRequestNamespace  $request
     * @return \App\Http\Responses\Backend\StudentGroups\CreateResponse
     */
    public function create(CreateStudentGroupRequest $request)
    {
        return new CreateResponse('backend.studentgroups.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreStudentGroupRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreStudentGroupRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.studentgroups.index'), ['flash_success' => _tr('alerts.backend.studentgroups.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\StudentGroups\StudentGroup  $studentgroup
     * @param  EditStudentGroupRequestNamespace  $request
     * @return \App\Http\Responses\Backend\StudentGroups\EditResponse
     */
    public function edit(StudentGroup $studentgroup, EditStudentGroupRequest $request)
    {
        return new EditResponse($studentgroup);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateStudentGroupRequestNamespace  $request
     * @param  App\Models\StudentGroups\StudentGroup  $studentgroup
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateStudentGroupRequest $request, StudentGroup $studentgroup)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $studentgroup, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.studentgroups.index'), ['flash_success' => _tr('alerts.backend.studentgroups.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteStudentGroupRequestNamespace  $request
     * @param  App\Models\StudentGroups\StudentGroup  $studentgroup
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(StudentGroup $studentgroup, DeleteStudentGroupRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($studentgroup);
        //returning with successfull message
        return new RedirectResponse(route('admin.studentgroups.index'), ['flash_success' => _tr('alerts.backend.studentgroups.deleted')]);
    }
    
}
