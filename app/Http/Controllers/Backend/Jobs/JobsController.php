<?php

namespace App\Http\Controllers\Backend\Jobs;

use App\Models\Jobs\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Jobs\CreateResponse;
use App\Http\Responses\Backend\Jobs\EditResponse;
use App\Repositories\Backend\Jobs\JobRepository;
use App\Http\Requests\Backend\Jobs\ManageJobRequest;
use App\Http\Requests\Backend\Jobs\CreateJobRequest;
use App\Http\Requests\Backend\Jobs\StoreJobRequest;
use App\Http\Requests\Backend\Jobs\EditJobRequest;
use App\Http\Requests\Backend\Jobs\UpdateJobRequest;
use App\Http\Requests\Backend\Jobs\DeleteJobRequest;

/**
 * JobsController
 */
class JobsController extends Controller
{
    /**
     * variable to store the repository object
     * @var JobRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param JobRepository $repository;
     */
    public function __construct(JobRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Jobs\ManageJobRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageJobRequest $request)
    {
        return new ViewResponse('backend.jobs.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateJobRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Jobs\CreateResponse
     */
    public function create(CreateJobRequest $request)
    {
        return new CreateResponse('backend.jobs.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreJobRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreJobRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.jobs.index'), ['flash_success' => _tr('alerts.backend.jobs.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Jobs\Job  $job
     * @param  EditJobRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Jobs\EditResponse
     */
    public function edit(Job $job, EditJobRequest $request)
    {
        return new EditResponse($job);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateJobRequestNamespace  $request
     * @param  App\Models\Jobs\Job  $job
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateJobRequest $request, Job $job)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $job, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.jobs.index'), ['flash_success' => _tr('alerts.backend.jobs.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteJobRequestNamespace  $request
     * @param  App\Models\Jobs\Job  $job
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Job $job, DeleteJobRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($job);
        //returning with successfull message
        return new RedirectResponse(route('admin.jobs.index'), ['flash_success' => _tr('alerts.backend.jobs.deleted')]);
    }
    
}
