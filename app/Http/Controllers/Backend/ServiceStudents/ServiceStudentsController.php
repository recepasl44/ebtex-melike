<?php

namespace App\Http\Controllers\Backend\ServiceStudents;

use App\Models\ServiceStudents\ServiceStudent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ServiceStudents\CreateResponse;
use App\Http\Responses\Backend\ServiceStudents\EditResponse;
use App\Repositories\Backend\ServiceStudents\ServiceStudentRepository;
use App\Http\Requests\Backend\ServiceStudents\ManageServiceStudentRequest;
use App\Http\Requests\Backend\ServiceStudents\CreateServiceStudentRequest;
use App\Http\Requests\Backend\ServiceStudents\StoreServiceStudentRequest;
use App\Http\Requests\Backend\ServiceStudents\EditServiceStudentRequest;
use App\Http\Requests\Backend\ServiceStudents\UpdateServiceStudentRequest;
use App\Http\Requests\Backend\ServiceStudents\DeleteServiceStudentRequest;

/**
 * ServiceStudentsController
 */
class ServiceStudentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServiceStudentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ServiceStudentRepository $repository;
     */
    public function __construct(ServiceStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ServiceStudents\ManageServiceStudentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageServiceStudentRequest $request)
    {
        return new ViewResponse('backend.servicestudents.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateServiceStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ServiceStudents\CreateResponse
     */
    public function create(CreateServiceStudentRequest $request)
    {
        return new CreateResponse('backend.servicestudents.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreServiceStudentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreServiceStudentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.servicestudents.index'), ['flash_success' => _tr('alerts.backend.servicestudents.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ServiceStudents\ServiceStudent  $servicestudent
     * @param  EditServiceStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ServiceStudents\EditResponse
     */
    public function edit(ServiceStudent $servicestudent, EditServiceStudentRequest $request)
    {
        return new EditResponse($servicestudent);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateServiceStudentRequestNamespace  $request
     * @param  App\Models\ServiceStudents\ServiceStudent  $servicestudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateServiceStudentRequest $request, ServiceStudent $servicestudent)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $servicestudent, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.servicestudents.index'), ['flash_success' => _tr('alerts.backend.servicestudents.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteServiceStudentRequestNamespace  $request
     * @param  App\Models\ServiceStudents\ServiceStudent  $servicestudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ServiceStudent $servicestudent, DeleteServiceStudentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($servicestudent);
        //returning with successfull message
        return new RedirectResponse(route('admin.servicestudents.index'), ['flash_success' => _tr('alerts.backend.servicestudents.deleted')]);
    }
    
}
