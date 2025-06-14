<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\TestAttendanceResource;
use App\Models\TestAttendances\TestAttendance;
use App\Repositories\Backend\TestAttendances\TestAttendanceRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * TestAttendancesController
 */
class TestAttendancesController extends APIController
{
    /**
     * __construct.
     *
     * @var TestAttendanceRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TestAttendanceRepository $repository;
     */
    public function __construct(TestAttendanceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $testattendance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return TestAttendanceResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param TestAttendance $testattendance
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(TestAttendance $testattendance)
    {
        return new TestAttendanceResource($testattendance);
    }

    
     /**
      * Creates the Resource for testattendance.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateTestAttendance($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new TestAttendanceResource(TestAttendance::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update testattendance.
         *
         * @param TestAttendance    $testattendance
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, TestAttendance $testattendance)
    {
        $validation = $this->validateTestAttendance($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($testattendance, $request->all());

        $testattendance = TestAttendance::findOrfail($testattendance->id);

        return new TestAttendanceResource($testattendance);
    }
    
    /**
     * Delete testattendance.
     *
     * @param TestAttendance    $testattendance
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(TestAttendance $testattendance)
    {
        $this->repository->delete($testattendance);

        return $this->respond([
            'message' => _tr('alerts.backend.testattendance.deleted'),
        ]);
    }
    

    /**
     * validate testattendance.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateTestAttendance(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'test_id' => 'required',
               'user_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate testattendance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
