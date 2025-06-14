<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ContractEmployeeResource;
use App\Models\ContractEmployees\ContractEmployee;
use App\Repositories\Backend\ContractEmployees\ContractEmployeeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ContractEmployeesController
 */
class ContractEmployeesController extends APIController
{
    /**
     * __construct.
     *
     * @var ContractEmployeeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ContractEmployeeRepository $repository;
     */
    public function __construct(ContractEmployeeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $contractemployee.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ContractEmployeeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ContractEmployee $contractemployee
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ContractEmployee $contractemployee)
    {
        return new ContractEmployeeResource($contractemployee);
    }

    
     /**
      * Creates the Resource for contractemployee.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateContractEmployee($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ContractEmployeeResource(ContractEmployee::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update contractemployee.
         *
         * @param ContractEmployee    $contractemployee
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ContractEmployee $contractemployee)
    {
        $validation = $this->validateContractEmployee($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($contractemployee, $request->all());

        $contractemployee = ContractEmployee::findOrfail($contractemployee->id);

        return new ContractEmployeeResource($contractemployee);
    }
    
    /**
     * Delete contractemployee.
     *
     * @param ContractEmployee    $contractemployee
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ContractEmployee $contractemployee)
    {
        $this->repository->delete($contractemployee);

        return $this->respond([
            'message' => _tr('alerts.backend.contractemployee.deleted'),
        ]);
    }
    

    /**
     * validate contractemployee.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateContractEmployee(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'employee_id' => 'required',
               'contract_type_id' => 'required',
               'start_date' => 'required|date',
               'fixed_salary' => 'decimal:2',
               'lesson_price' => 'decimal:2',
               'day_price' => 'decimal:2',
               'solution_price' => 'decimal:2',
               'coaching_price' => 'decimal:2',
               'private_lesson_price' => 'decimal:2',
               'end_date' => 'date',
               'notes' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate contractemployee.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
