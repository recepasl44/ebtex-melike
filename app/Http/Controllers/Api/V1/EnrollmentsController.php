<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\EnrollmentResource;
use App\Models\Enrollments\Enrollment;
use App\Repositories\Backend\Enrollments\EnrollmentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * EnrollmentsController
 */
class EnrollmentsController extends APIController
{
    /**
     * __construct.
     *
     * @var EnrollmentRepository
     * @param $repository
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
     * Return the $enrollment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return EnrollmentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Enrollment $enrollment
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Enrollment $enrollment)
    {
        return new EnrollmentResource($enrollment);
    }

    
     /**
      * Creates the Resource for enrollment.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateEnrollment($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new EnrollmentResource(Enrollment::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update enrollment.
         *
         * @param Enrollment    $enrollment
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Enrollment $enrollment)
    {
        $validation = $this->validateEnrollment($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($enrollment, $request->all());

        $enrollment = Enrollment::findOrfail($enrollment->id);

        return new EnrollmentResource($enrollment);
    }
    
    /**
     * Delete enrollment.
     *
     * @param Enrollment    $enrollment
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Enrollment $enrollment)
    {
        $this->repository->delete($enrollment);

        return $this->respond([
            'message' => _tr('alerts.backend.enrollment.deleted'),
        ]);
    }
    

    /**
     * validate enrollment.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateEnrollment(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'service_id' => 'required',
               'total_fee' => 'decimal:2',
               'discount' => 'decimal:2',
               'final_fee' => 'decimal:2',
               ]);

        return $validation;
    }

    /**
     * validate message for validate enrollment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
