<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ServiceStudentResource;
use App\Models\ServiceStudents\ServiceStudent;
use App\Repositories\Backend\ServiceStudents\ServiceStudentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ServiceStudentsController
 */
class ServiceStudentsController extends APIController
{
    /**
     * __construct.
     *
     * @var ServiceStudentRepository
     * @param $repository
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
     * Return the $servicestudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ServiceStudentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ServiceStudent $servicestudent
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ServiceStudent $servicestudent)
    {
        return new ServiceStudentResource($servicestudent);
    }

    
     /**
      * Creates the Resource for servicestudent.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateServiceStudent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ServiceStudentResource(ServiceStudent::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update servicestudent.
         *
         * @param ServiceStudent    $servicestudent
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ServiceStudent $servicestudent)
    {
        $validation = $this->validateServiceStudent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($servicestudent, $request->all());

        $servicestudent = ServiceStudent::findOrfail($servicestudent->id);

        return new ServiceStudentResource($servicestudent);
    }
    
    /**
     * Delete servicestudent.
     *
     * @param ServiceStudent    $servicestudent
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ServiceStudent $servicestudent)
    {
        $this->repository->delete($servicestudent);

        return $this->respond([
            'message' => _tr('alerts.backend.servicestudent.deleted'),
        ]);
    }
    

    /**
     * validate servicestudent.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateServiceStudent(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'service_id' => 'required',
               'student_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate servicestudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
