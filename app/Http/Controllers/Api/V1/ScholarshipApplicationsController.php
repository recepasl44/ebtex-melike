<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ScholarshipApplicationResource;
use App\Models\ScholarshipApplications\ScholarshipApplication;
use App\Repositories\Backend\ScholarshipApplications\ScholarshipApplicationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ScholarshipApplicationsController
 */
class ScholarshipApplicationsController extends APIController
{
    /**
     * __construct.
     *
     * @var ScholarshipApplicationRepository
     * @param $repository
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
     * Return the $scholarshipapplication.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ScholarshipApplicationResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ScholarshipApplication $scholarshipapplication
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ScholarshipApplication $scholarshipapplication)
    {
        return new ScholarshipApplicationResource($scholarshipapplication);
    }

    
     /**
      * Creates the Resource for scholarshipapplication.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateScholarshipApplication($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ScholarshipApplicationResource(ScholarshipApplication::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update scholarshipapplication.
         *
         * @param ScholarshipApplication    $scholarshipapplication
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ScholarshipApplication $scholarshipapplication)
    {
        $validation = $this->validateScholarshipApplication($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($scholarshipapplication, $request->all());

        $scholarshipapplication = ScholarshipApplication::findOrfail($scholarshipapplication->id);

        return new ScholarshipApplicationResource($scholarshipapplication);
    }
    
    /**
     * Delete scholarshipapplication.
     *
     * @param ScholarshipApplication    $scholarshipapplication
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ScholarshipApplication $scholarshipapplication)
    {
        $this->repository->delete($scholarshipapplication);

        return $this->respond([
            'message' => _tr('alerts.backend.scholarshipapplication.deleted'),
        ]);
    }
    

    /**
     * validate scholarshipapplication.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateScholarshipApplication(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'scholarship_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate scholarshipapplication.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
