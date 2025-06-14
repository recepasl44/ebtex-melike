<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuestionResource;
use App\Models\Questions\Question;
use App\Repositories\Backend\Questions\QuestionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuestionsController
 */
class QuestionsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuestionRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuestionRepository $repository;
     */
    public function __construct(QuestionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $question.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuestionResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Question $question
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Question $question)
    {
        return new QuestionResource($question);
    }

    
     /**
      * Creates the Resource for question.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuestion($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuestionResource(Question::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update question.
         *
         * @param Question    $question
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Question $question)
    {
        $validation = $this->validateQuestion($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($question, $request->all());

        $question = Question::findOrfail($question->id);

        return new QuestionResource($question);
    }
    
    /**
     * Delete question.
     *
     * @param Question    $question
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Question $question)
    {
        $this->repository->delete($question);

        return $this->respond([
            'message' => _tr('alerts.backend.question.deleted'),
        ]);
    }
    

    /**
     * validate question.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuestion(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'author_full_name' => 'max:191',
               'places_use_id' => 'required',
               'question_type_id' => 'required',
               'difficulty_level_id' => 'required',
               'exam_type_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate question.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
