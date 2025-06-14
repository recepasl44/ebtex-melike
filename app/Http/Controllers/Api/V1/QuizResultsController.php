<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizResultOrderedResource;
use App\Http\Resources\QuizResultResource;
use App\Models\QuizResults\QuizResult;
use App\Repositories\Backend\QuizResults\QuizResultRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizResultsController
 */
class QuizResultsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizResultRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizResultRepository $repository;
     */
    public function __construct(QuizResultRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizresult.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizResultResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizResult $quizresult
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizResult $quizresult)
    {
        return new QuizResultResource($quizresult);
    }

    
     /**
      * Creates the Resource for quizresult.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizResult($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizResultResource(QuizResult::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizresult.
         *
         * @param QuizResult    $quizresult
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizResult $quizresult)
    {
        $validation = $this->validateQuizResult($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizresult, $request->all());

        $quizresult = QuizResult::findOrfail($quizresult->id);

        return new QuizResultResource($quizresult);
    }
    
    /**
     * Delete quizresult.
     *
     * @param QuizResult    $quizresult
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizResult $quizresult)
    {
        $this->repository->delete($quizresult);

        return $this->respond([
            'message' => _tr('alerts.backend.quizresult.deleted'),
        ]);
    }
    

    /**
     * validate quizresult.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizResult(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'student_id' => 'required',
               'nets' => 'decimal:2',
               'success_rate' => 'decimal:2',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizresult.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }

    public function orderedList(Request $request){
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizResultOrderedResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
}
