<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizBrancheResource;
use App\Models\QuizBranches\QuizBranche;
use App\Repositories\Backend\QuizBranches\QuizBrancheRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizBranchesController
 */
class QuizBranchesController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizBrancheRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizBrancheRepository $repository;
     */
    public function __construct(QuizBrancheRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizbtanche.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizBrancheResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizBranche $quizbtanche
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizBranche $quizbtanche)
    {
        return new QuizBrancheResource($quizbtanche);
    }

    
     /**
      * Creates the Resource for quizbtanche.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizBranche($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizBrancheResource(QuizBranche::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizbtanche.
         *
         * @param QuizBranche    $quizbtanche
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizBranche $quizbtanche)
    {
        $validation = $this->validateQuizBranche($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizbtanche, $request->all());

        $quizbtanche = QuizBranche::findOrfail($quizbtanche->id);

        return new QuizBrancheResource($quizbtanche);
    }
    
    /**
     * Delete quizbtanche.
     *
     * @param QuizBranche    $quizbtanche
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizBranche $quizbtanche)
    {
        $this->repository->delete($quizbtanche);

        return $this->respond([
            'message' => _tr('alerts.backend.quizbtanche.deleted'),
        ]);
    }
    

    /**
     * validate quizbtanche.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizBranche(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'branche_id' => 'required',
               'session_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizbtanche.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
