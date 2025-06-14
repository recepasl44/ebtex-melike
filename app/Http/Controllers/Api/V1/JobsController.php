<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\JobResource;
use App\Models\Jobs\Job;
use App\Repositories\Backend\Jobs\JobRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * JobsController
 */
class JobsController extends APIController
{
    /**
     * __construct.
     *
     * @var JobRepository
     * @param $repository
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
     * Return the $job.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return JobResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Job $job
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Job $job)
    {
        return new JobResource($job);
    }

    
     /**
      * Creates the Resource for job.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateJob($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new JobResource(Job::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update job.
         *
         * @param Job    $job
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Job $job)
    {
        $validation = $this->validateJob($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($job, $request->all());

        $job = Job::findOrfail($job->id);

        return new JobResource($job);
    }
    
    /**
     * Delete job.
     *
     * @param Job    $job
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Job $job)
    {
        $this->repository->delete($job);

        return $this->respond([
            'message' => _tr('alerts.backend.job.deleted'),
        ]);
    }
    

    /**
     * validate job.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateJob(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate job.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
