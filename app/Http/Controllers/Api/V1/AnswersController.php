<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AnswerResource;
use App\Models\Answers\Answer;
use App\Repositories\Backend\Answers\AnswerRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AnswersController
 */
class AnswersController extends APIController
{
    /**
     * __construct.
     *
     * @var AnswerRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AnswerRepository $repository;
     */
    public function __construct(AnswerRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $answer.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AnswerResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Answer $answer
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Answer $answer)
    {
        return new AnswerResource($answer);
    }

    
     /**
      * Creates the Resource for answer.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAnswer($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AnswerResource(Answer::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update answer.
         *
         * @param Answer    $answer
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Answer $answer)
    {
        $validation = $this->validateAnswer($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($answer, $request->all());

        $answer = Answer::findOrfail($answer->id);

        return new AnswerResource($answer);
    }
    
    /**
     * Delete answer.
     *
     * @param Answer    $answer
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Answer $answer)
    {
        $this->repository->delete($answer);

        return $this->respond([
            'message' => _tr('alerts.backend.answer.deleted'),
        ]);
    }
    

    /**
     * validate answer.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAnswer(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'question_id' => 'required',
               'user_id' => 'required',
               'answer' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate answer.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
