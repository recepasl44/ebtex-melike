<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\EmployeeAcademicResource;
use App\Models\EmployeeAcademics\EmployeeAcademic;
use App\Repositories\Backend\EmployeeAcademics\EmployeeAcademicRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * EmployeeAcademicsController
 */
class EmployeeAcademicsController extends APIController
{
    /**
     * __construct.
     *
     * @var EmployeeAcademicRepository
     * @param $repository
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
     * Return the $employeeacademic.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return EmployeeAcademicResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param EmployeeAcademic $employeeacademic
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(EmployeeAcademic $employeeacademic)
    {
        return new EmployeeAcademicResource($employeeacademic);
    }

    
     /**
      * Creates the Resource for employeeacademic.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateEmployeeAcademic($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new EmployeeAcademicResource(EmployeeAcademic::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update employeeacademic.
         *
         * @param EmployeeAcademic    $employeeacademic
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, EmployeeAcademic $employeeacademic)
    {
        $validation = $this->validateEmployeeAcademic($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($employeeacademic, $request->all());

        $employeeacademic = EmployeeAcademic::findOrfail($employeeacademic->id);

        return new EmployeeAcademicResource($employeeacademic);
    }
    
    /**
     * Delete employeeacademic.
     *
     * @param EmployeeAcademic    $employeeacademic
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(EmployeeAcademic $employeeacademic)
    {
        $this->repository->delete($employeeacademic);

        return $this->respond([
            'message' => _tr('alerts.backend.employeeacademic.deleted'),
        ]);
    }
    

    /**
     * validate employeeacademic.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateEmployeeAcademic(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'employee_id' => 'required',
               'education_status_id' => 'required',
               'job_id' => 'required',
               'profession_id' => 'required',
               'academic_title_id' => 'required',
               'experience' => 'required',
               'certificates' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate employeeacademic.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
