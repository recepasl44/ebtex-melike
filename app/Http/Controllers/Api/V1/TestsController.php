<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\TestResource;
use App\Models\Tests\Test;
use App\Repositories\Backend\Tests\TestRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * TestsController
 */
class TestsController extends APIController
{
    /**
     * __construct.
     *
     * @var TestRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TestRepository $repository;
     */
    public function __construct(TestRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $test.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return TestResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Test $test
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Test $test)
    {
        return new TestResource($test);
    }

    
     /**
      * Creates the Resource for test.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateTest($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new TestResource(Test::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update test.
         *
         * @param Test    $test
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Test $test)
    {
        $validation = $this->validateTest($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($test, $request->all());

        $test = Test::findOrfail($test->id);

        return new TestResource($test);
    }
    
    /**
     * Delete test.
     *
     * @param Test    $test
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Test $test)
    {
        $this->repository->delete($test);

        return $this->respond([
            'message' => _tr('alerts.backend.test.deleted'),
        ]);
    }
    

    /**
     * validate test.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateTest(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'type_id' => 'required',
               'question_numbers' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate test.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
