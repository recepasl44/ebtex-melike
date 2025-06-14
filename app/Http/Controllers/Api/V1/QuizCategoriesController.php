<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizCategoryResource;
use App\Models\QuizCategories\QuizCategory;
use App\Repositories\Backend\QuizCategories\QuizCategoryRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizCategoriesController
 */
class QuizCategoriesController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizCategoryRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizCategoryRepository $repository;
     */
    public function __construct(QuizCategoryRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizcategory.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizCategoryResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizCategory $quizcategory
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizCategory $quizcategory)
    {
        return new QuizCategoryResource($quizcategory);
    }

    
     /**
      * Creates the Resource for quizcategory.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizCategory($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizCategoryResource(QuizCategory::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizcategory.
         *
         * @param QuizCategory    $quizcategory
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizCategory $quizcategory)
    {
        $validation = $this->validateQuizCategory($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizcategory, $request->all());

        $quizcategory = QuizCategory::findOrfail($quizcategory->id);

        return new QuizCategoryResource($quizcategory);
    }
    
    /**
     * Delete quizcategory.
     *
     * @param QuizCategory    $quizcategory
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizCategory $quizcategory)
    {
        $this->repository->delete($quizcategory);

        return $this->respond([
            'message' => _tr('alerts.backend.quizcategory.deleted'),
        ]);
    }
    

    /**
     * validate quizcategory.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizCategory(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizcategory.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
