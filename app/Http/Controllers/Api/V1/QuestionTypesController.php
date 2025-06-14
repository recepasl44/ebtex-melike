<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuestionTypeResource;
use App\Models\QuestionTypes\QuestionType;
use App\Repositories\Backend\QuestionTypes\QuestionTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuestionTypesController
 */
class QuestionTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var QuestionTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuestionTypeRepository $repository;
     */
    public function __construct(QuestionTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $questiontype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuestionTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuestionType $questiontype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuestionType $questiontype)
    {
        return new QuestionTypeResource($questiontype);
    }

    
     /**
      * Creates the Resource for questiontype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuestionType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuestionTypeResource(QuestionType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update questiontype.
         *
         * @param QuestionType    $questiontype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuestionType $questiontype)
    {
        $validation = $this->validateQuestionType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($questiontype, $request->all());

        $questiontype = QuestionType::findOrfail($questiontype->id);

        return new QuestionTypeResource($questiontype);
    }
    
    /**
     * Delete questiontype.
     *
     * @param QuestionType    $questiontype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuestionType $questiontype)
    {
        $this->repository->delete($questiontype);

        return $this->respond([
            'message' => _tr('alerts.backend.questiontype.deleted'),
        ]);
    }
    

    /**
     * validate questiontype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuestionType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate questiontype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
