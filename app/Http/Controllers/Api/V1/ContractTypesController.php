<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ContractTypeResource;
use App\Models\ContractTypes\ContractType;
use App\Repositories\Backend\ContractTypes\ContractTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ContractTypesController
 */
class ContractTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var ContractTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ContractTypeRepository $repository;
     */
    public function __construct(ContractTypeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $contracttype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ContractTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ContractType $contracttype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ContractType $contracttype)
    {
        return new ContractTypeResource($contracttype);
    }

    
     /**
      * Creates the Resource for contracttype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateContractType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ContractTypeResource(ContractType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update contracttype.
         *
         * @param ContractType    $contracttype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ContractType $contracttype)
    {
        $validation = $this->validateContractType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($contracttype, $request->all());

        $contracttype = ContractType::findOrfail($contracttype->id);

        return new ContractTypeResource($contracttype);
    }
    
    /**
     * Delete contracttype.
     *
     * @param ContractType    $contracttype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ContractType $contracttype)
    {
        $this->repository->delete($contracttype);

        return $this->respond([
            'message' => _tr('alerts.backend.contracttype.deleted'),
        ]);
    }
    

    /**
     * validate contracttype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateContractType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate contracttype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
