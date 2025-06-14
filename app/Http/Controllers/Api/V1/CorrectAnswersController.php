<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\CorrectAnswerResource;
use App\Models\CorrectAnswers\CorrectAnswer;
use App\Repositories\Backend\CorrectAnswers\CorrectAnswerRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * CorrectAnswersController
 */
class CorrectAnswersController extends APIController
{
    /**
     * __construct.
     *
     * @var CorrectAnswerRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param CorrectAnswerRepository $repository;
     */
    public function __construct(CorrectAnswerRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $correctanswer.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return CorrectAnswerResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param CorrectAnswer $correctanswer
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(CorrectAnswer $correctanswer)
    {
        return new CorrectAnswerResource($correctanswer);
    }

    
     /**
      * Creates the Resource for correctanswer.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateCorrectAnswer($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new CorrectAnswerResource(CorrectAnswer::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update correctanswer.
         *
         * @param CorrectAnswer    $correctanswer
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, CorrectAnswer $correctanswer)
    {
        $validation = $this->validateCorrectAnswer($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($correctanswer, $request->all());

        $correctanswer = CorrectAnswer::findOrfail($correctanswer->id);

        return new CorrectAnswerResource($correctanswer);
    }
    
    /**
     * Delete correctanswer.
     *
     * @param CorrectAnswer    $correctanswer
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(CorrectAnswer $correctanswer)
    {
        $this->repository->delete($correctanswer);

        return $this->respond([
            'message' => _tr('alerts.backend.correctanswer.deleted'),
        ]);
    }
    

    /**
     * validate correctanswer.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateCorrectAnswer(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'question_id' => 'required',
               'quiz_id' => 'required',
               'correct_answer' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate correctanswer.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
