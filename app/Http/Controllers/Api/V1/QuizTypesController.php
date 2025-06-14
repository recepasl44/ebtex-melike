<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizTypeResource;
use App\Models\QuizTypes\QuizType;
use App\Repositories\Backend\QuizTypes\QuizTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizTypesController
 */
class QuizTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizTypeRepository $repository;
     */
    public function __construct(QuizTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quiztype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizType $quiztype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizType $quiztype)
    {
        return new QuizTypeResource($quiztype);
    }

    
     /**
      * Creates the Resource for quiztype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizTypeResource(QuizType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quiztype.
         *
         * @param QuizType    $quiztype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizType $quiztype)
    {
        $validation = $this->validateQuizType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quiztype, $request->all());

        $quiztype = QuizType::findOrfail($quiztype->id);

        return new QuizTypeResource($quiztype);
    }
    
    /**
     * Delete quiztype.
     *
     * @param QuizType    $quiztype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizType $quiztype)
    {
        $this->repository->delete($quiztype);

        return $this->respond([
            'message' => _tr('alerts.backend.quiztype.deleted'),
        ]);
    }
    

    /**
     * validate quiztype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quiztype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
