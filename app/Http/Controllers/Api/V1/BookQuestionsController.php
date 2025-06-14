<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BookQuestionResource;
use App\Models\BookQuestions\BookQuestion;
use App\Repositories\Backend\BookQuestions\BookQuestionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BookQuestionsController
 */
class BookQuestionsController extends APIController
{
    /**
     * __construct.
     *
     * @var BookQuestionRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookQuestionRepository $repository;
     */
    public function __construct(BookQuestionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $bookquestion.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BookQuestionResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param BookQuestion $bookquestion
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(BookQuestion $bookquestion)
    {
        return new BookQuestionResource($bookquestion);
    }

    
     /**
      * Creates the Resource for bookquestion.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBookQuestion($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BookQuestionResource(BookQuestion::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update bookquestion.
         *
         * @param BookQuestion    $bookquestion
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, BookQuestion $bookquestion)
    {
        $validation = $this->validateBookQuestion($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($bookquestion, $request->all());

        $bookquestion = BookQuestion::findOrfail($bookquestion->id);

        return new BookQuestionResource($bookquestion);
    }
    
    /**
     * Delete bookquestion.
     *
     * @param BookQuestion    $bookquestion
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(BookQuestion $bookquestion)
    {
        $this->repository->delete($bookquestion);

        return $this->respond([
            'message' => _tr('alerts.backend.bookquestion.deleted'),
        ]);
    }
    

    /**
     * validate bookquestion.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBookQuestion(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'book_id' => 'required',
               'question_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate bookquestion.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
