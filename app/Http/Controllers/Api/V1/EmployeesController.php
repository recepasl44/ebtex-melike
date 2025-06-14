<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\EmployeeResource;
use App\Models\Employees\Employee;
use App\Repositories\Backend\Employees\EmployeeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * EmployeesController
 */
class EmployeesController extends APIController
{
    /**
     * __construct.
     *
     * @var EmployeeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EmployeeRepository $repository;
     */
    public function __construct(EmployeeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $employee.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return EmployeeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Employee $employee
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Employee $employee)
    {
        return new EmployeeResource($employee);
    }

    
     /**
      * Creates the Resource for employee.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateEmployee($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new EmployeeResource(Employee::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update employee.
         *
         * @param Employee    $employee
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Employee $employee)
    {
        $validation = $this->validateEmployee($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($employee, $request->all());

        $employee = Employee::findOrfail($employee->id);

        return new EmployeeResource($employee);
    }
    
    /**
     * Delete employee.
     *
     * @param Employee    $employee
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Employee $employee)
    {
        $this->repository->delete($employee);

        return $this->respond([
            'message' => _tr('alerts.backend.employee.deleted'),
        ]);
    }
    

    /**
     * validate employee.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateEmployee(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'full_name' => 'required|max:191',
               'identification_no' => 'required|max:191',
               'birth_day' => 'date',
               'email' => 'required|max:191',
               'phone_number' => 'max:191',
               'address' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate employee.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
