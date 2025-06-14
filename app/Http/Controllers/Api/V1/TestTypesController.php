<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\TestTypeResource;
use App\Models\TestTypes\TestType;
use App\Repositories\Backend\TestTypes\TestTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * TestTypesController
 */
class TestTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var TestTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TestTypeRepository $repository;
     */
    public function __construct(TestTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $testtype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return TestTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param TestType $testtype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(TestType $testtype)
    {
        return new TestTypeResource($testtype);
    }

    
     /**
      * Creates the Resource for testtype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateTestType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new TestTypeResource(TestType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update testtype.
         *
         * @param TestType    $testtype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, TestType $testtype)
    {
        $validation = $this->validateTestType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($testtype, $request->all());

        $testtype = TestType::findOrfail($testtype->id);

        return new TestTypeResource($testtype);
    }
    
    /**
     * Delete testtype.
     *
     * @param TestType    $testtype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(TestType $testtype)
    {
        $this->repository->delete($testtype);

        return $this->respond([
            'message' => _tr('alerts.backend.testtype.deleted'),
        ]);
    }
    

    /**
     * validate testtype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateTestType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate testtype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
