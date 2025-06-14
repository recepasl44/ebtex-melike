<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizResource;
use App\Models\Quizzes\Quiz;
use App\Repositories\Backend\Quizzes\QuizRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizzesController
 */
class QuizzesController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizRepository $repository;
     */
    public function __construct(QuizRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quiz.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Quiz $quiz
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Quiz $quiz)
    {
        return new QuizResource($quiz);
    }

    
     /**
      * Creates the Resource for quiz.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuiz($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizResource(Quiz::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quiz.
         *
         * @param Quiz    $quiz
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Quiz $quiz)
    {
        $validation = $this->validateQuiz($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quiz, $request->all());

        $quiz = Quiz::findOrfail($quiz->id);

        return new QuizResource($quiz);
    }
    
    /**
     * Delete quiz.
     *
     * @param Quiz    $quiz
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Quiz $quiz)
    {
        $this->repository->delete($quiz);

        return $this->respond([
            'message' => _tr('alerts.backend.quiz.deleted'),
        ]);
    }
    

    /**
     * validate quiz.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuiz(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'branche_id' => 'required',
               'quiz_no' => 'required',
               'name' => 'required',
               'quiz_date' => 'date',
               'quiz_type_id' => 'required',
               'quiz_category_id' => 'required',
               'point_type_id' => 'required',
               'optical_form_id' => 'required',
               'level_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quiz.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
