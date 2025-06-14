<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\TestQuestionResource;
use App\Models\TestQuestions\TestQuestion;
use App\Repositories\Backend\TestQuestions\TestQuestionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * TestQuestionsController
 */
class TestQuestionsController extends APIController
{
    /**
     * __construct.
     *
     * @var TestQuestionRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TestQuestionRepository $repository;
     */
    public function __construct(TestQuestionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $testquestion.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return TestQuestionResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param TestQuestion $testquestion
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(TestQuestion $testquestion)
    {
        return new TestQuestionResource($testquestion);
    }

    
     /**
      * Creates the Resource for testquestion.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateTestQuestion($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new TestQuestionResource(TestQuestion::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update testquestion.
         *
         * @param TestQuestion    $testquestion
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, TestQuestion $testquestion)
    {
        $validation = $this->validateTestQuestion($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($testquestion, $request->all());

        $testquestion = TestQuestion::findOrfail($testquestion->id);

        return new TestQuestionResource($testquestion);
    }
    
    /**
     * Delete testquestion.
     *
     * @param TestQuestion    $testquestion
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(TestQuestion $testquestion)
    {
        $this->repository->delete($testquestion);

        return $this->respond([
            'message' => _tr('alerts.backend.testquestion.deleted'),
        ]);
    }
    

    /**
     * validate testquestion.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateTestQuestion(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'test_id' => 'required',
               'question_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate testquestion.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
