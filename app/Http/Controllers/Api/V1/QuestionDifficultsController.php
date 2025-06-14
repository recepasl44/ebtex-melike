<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuestionDifficultResource;
use App\Models\QuestionDifficults\QuestionDifficult;
use App\Repositories\Backend\QuestionDifficults\QuestionDifficultRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuestionDifficultsController
 */
class QuestionDifficultsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuestionDifficultRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuestionDifficultRepository $repository;
     */
    public function __construct(QuestionDifficultRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $questiondifficult.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuestionDifficultResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuestionDifficult $questiondifficult
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuestionDifficult $questiondifficult)
    {
        return new QuestionDifficultResource($questiondifficult);
    }

    
     /**
      * Creates the Resource for questiondifficult.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuestionDifficult($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuestionDifficultResource(QuestionDifficult::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update questiondifficult.
         *
         * @param QuestionDifficult    $questiondifficult
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuestionDifficult $questiondifficult)
    {
        $validation = $this->validateQuestionDifficult($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($questiondifficult, $request->all());

        $questiondifficult = QuestionDifficult::findOrfail($questiondifficult->id);

        return new QuestionDifficultResource($questiondifficult);
    }
    
    /**
     * Delete questiondifficult.
     *
     * @param QuestionDifficult    $questiondifficult
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuestionDifficult $questiondifficult)
    {
        $this->repository->delete($questiondifficult);

        return $this->respond([
            'message' => _tr('alerts.backend.questiondifficult.deleted'),
        ]);
    }
    

    /**
     * validate questiondifficult.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuestionDifficult(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate questiondifficult.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
