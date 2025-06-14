<?php

namespace App\Http\Controllers\Backend\ScholarshipApplications;

use App\Models\ScholarshipApplications\ScholarshipApplication;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ScholarshipApplications\CreateResponse;
use App\Http\Responses\Backend\ScholarshipApplications\EditResponse;
use App\Repositories\Backend\ScholarshipApplications\ScholarshipApplicationRepository;
use App\Http\Requests\Backend\ScholarshipApplications\ManageScholarshipApplicationRequest;
use App\Http\Requests\Backend\ScholarshipApplications\CreateScholarshipApplicationRequest;
use App\Http\Requests\Backend\ScholarshipApplications\StoreScholarshipApplicationRequest;
use App\Http\Requests\Backend\ScholarshipApplications\EditScholarshipApplicationRequest;
use App\Http\Requests\Backend\ScholarshipApplications\UpdateScholarshipApplicationRequest;
use App\Http\Requests\Backend\ScholarshipApplications\DeleteScholarshipApplicationRequest;

/**
 * ScholarshipApplicationsController
 */
class ScholarshipApplicationsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScholarshipApplicationRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScholarshipApplicationRepository $repository;
     */
    public function __construct(ScholarshipApplicationRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ScholarshipApplications\ManageScholarshipApplicationRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageScholarshipApplicationRequest $request)
    {
        return new ViewResponse('backend.scholarshipapplications.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateScholarshipApplicationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScholarshipApplications\CreateResponse
     */
    public function create(CreateScholarshipApplicationRequest $request)
    {
        return new CreateResponse('backend.scholarshipapplications.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreScholarshipApplicationRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreScholarshipApplicationRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.scholarshipapplications.index'), ['flash_success' => _tr('alerts.backend.scholarshipapplications.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ScholarshipApplications\ScholarshipApplication  $scholarshipapplication
     * @param  EditScholarshipApplicationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScholarshipApplications\EditResponse
     */
    public function edit(ScholarshipApplication $scholarshipapplication, EditScholarshipApplicationRequest $request)
    {
        return new EditResponse($scholarshipapplication);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateScholarshipApplicationRequestNamespace  $request
     * @param  App\Models\ScholarshipApplications\ScholarshipApplication  $scholarshipapplication
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateScholarshipApplicationRequest $request, ScholarshipApplication $scholarshipapplication)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $scholarshipapplication, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.scholarshipapplications.index'), ['flash_success' => _tr('alerts.backend.scholarshipapplications.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteScholarshipApplicationRequestNamespace  $request
     * @param  App\Models\ScholarshipApplications\ScholarshipApplication  $scholarshipapplication
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ScholarshipApplication $scholarshipapplication, DeleteScholarshipApplicationRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($scholarshipapplication);
        //returning with successfull message
        return new RedirectResponse(route('admin.scholarshipapplications.index'), ['flash_success' => _tr('alerts.backend.scholarshipapplications.deleted')]);
    }
    
}
