<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BookQuizResource;
use App\Models\BookQuizs\BookQuiz;
use App\Repositories\Backend\BookQuizs\BookQuizRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BookQuizzesController
 */
class BookQuizzesController extends APIController
{
    /**
     * __construct.
     *
     * @var BookQuizRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookQuizRepository $repository;
     */
    public function __construct(BookQuizRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $bookquiz.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BookQuizResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param BookQuiz $bookquiz
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(BookQuiz $bookquiz)
    {
        return new BookQuizResource($bookquiz);
    }

    
     /**
      * Creates the Resource for bookquiz.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBookQuiz($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BookQuizResource(BookQuiz::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update bookquiz.
         *
         * @param BookQuiz    $bookquiz
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, BookQuiz $bookquiz)
    {
        $validation = $this->validateBookQuiz($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($bookquiz, $request->all());

        $bookquiz = BookQuiz::findOrfail($bookquiz->id);

        return new BookQuizResource($bookquiz);
    }
    
    /**
     * Delete bookquiz.
     *
     * @param BookQuiz    $bookquiz
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(BookQuiz $bookquiz)
    {
        $this->repository->delete($bookquiz);

        return $this->respond([
            'message' => _tr('alerts.backend.bookquiz.deleted'),
        ]);
    }
    

    /**
     * validate bookquiz.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBookQuiz(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'book_id' => 'required',
               'quiz_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate bookquiz.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
