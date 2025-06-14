<?php

namespace App\Http\Controllers\Backend\Enrollments;

use App\Models\Enrollments\Enrollment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Enrollments\CreateResponse;
use App\Http\Responses\Backend\Enrollments\EditResponse;
use App\Repositories\Backend\Enrollments\EnrollmentRepository;
use App\Http\Requests\Backend\Enrollments\ManageEnrollmentRequest;
use App\Http\Requests\Backend\Enrollments\CreateEnrollmentRequest;
use App\Http\Requests\Backend\Enrollments\StoreEnrollmentRequest;
use App\Http\Requests\Backend\Enrollments\EditEnrollmentRequest;
use App\Http\Requests\Backend\Enrollments\UpdateEnrollmentRequest;
use App\Http\Requests\Backend\Enrollments\DeleteEnrollmentRequest;

/**
 * EnrollmentsController
 */
class EnrollmentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var EnrollmentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EnrollmentRepository $repository;
     */
    public function __construct(EnrollmentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Enrollments\ManageEnrollmentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageEnrollmentRequest $request)
    {
        return new ViewResponse('backend.enrollments.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateEnrollmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Enrollments\CreateResponse
     */
    public function create(CreateEnrollmentRequest $request)
    {
        return new CreateResponse('backend.enrollments.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreEnrollmentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreEnrollmentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.enrollments.index'), ['flash_success' => _tr('alerts.backend.enrollments.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Enrollments\Enrollment  $enrollment
     * @param  EditEnrollmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Enrollments\EditResponse
     */
    public function edit(Enrollment $enrollment, EditEnrollmentRequest $request)
    {
        return new EditResponse($enrollment);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEnrollmentRequestNamespace  $request
     * @param  App\Models\Enrollments\Enrollment  $enrollment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateEnrollmentRequest $request, Enrollment $enrollment)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $enrollment, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.enrollments.index'), ['flash_success' => _tr('alerts.backend.enrollments.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteEnrollmentRequestNamespace  $request
     * @param  App\Models\Enrollments\Enrollment  $enrollment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Enrollment $enrollment, DeleteEnrollmentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($enrollment);
        //returning with successfull message
        return new RedirectResponse(route('admin.enrollments.index'), ['flash_success' => _tr('alerts.backend.enrollments.deleted')]);
    }
    
}
