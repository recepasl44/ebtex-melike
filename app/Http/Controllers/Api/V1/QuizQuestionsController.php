<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizQuestionResource;
use App\Models\QuizQuestions\QuizQuestion;
use App\Repositories\Backend\QuizQuestions\QuizQuestionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizQuestionsController
 */
class QuizQuestionsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizQuestionRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizQuestionRepository $repository;
     */
    public function __construct(QuizQuestionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizquestion.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizQuestionResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizQuestion $quizquestion
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizQuestion $quizquestion)
    {
        return new QuizQuestionResource($quizquestion);
    }

    
     /**
      * Creates the Resource for quizquestion.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizQuestion($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizQuestionResource(QuizQuestion::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizquestion.
         *
         * @param QuizQuestion    $quizquestion
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizQuestion $quizquestion)
    {
        $validation = $this->validateQuizQuestion($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizquestion, $request->all());

        $quizquestion = QuizQuestion::findOrfail($quizquestion->id);

        return new QuizQuestionResource($quizquestion);
    }
    
    /**
     * Delete quizquestion.
     *
     * @param QuizQuestion    $quizquestion
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizQuestion $quizquestion)
    {
        $this->repository->delete($quizquestion);

        return $this->respond([
            'message' => _tr('alerts.backend.quizquestion.deleted'),
        ]);
    }
    

    /**
     * validate quizquestion.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizQuestion(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'question_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizquestion.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
