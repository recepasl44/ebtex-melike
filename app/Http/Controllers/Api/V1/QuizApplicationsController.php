<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizApplicationResource;
use App\Models\QuizApplications\QuizApplication;
use App\Repositories\Backend\QuizApplications\QuizApplicationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizApplicationsController
 */
class QuizApplicationsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizApplicationRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizApplicationRepository $repository;
     */
    public function __construct(QuizApplicationRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizapplication.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizApplicationResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizApplication $quizapplication
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizApplication $quizapplication)
    {
        return new QuizApplicationResource($quizapplication);
    }

    
     /**
      * Creates the Resource for quizapplication.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizApplication($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizApplicationResource(QuizApplication::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizapplication.
         *
         * @param QuizApplication    $quizapplication
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizApplication $quizapplication)
    {
        $validation = $this->validateQuizApplication($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizapplication, $request->all());

        $quizapplication = QuizApplication::findOrfail($quizapplication->id);

        return new QuizApplicationResource($quizapplication);
    }
    
    /**
     * Delete quizapplication.
     *
     * @param QuizApplication    $quizapplication
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizApplication $quizapplication)
    {
        $this->repository->delete($quizapplication);

        return $this->respond([
            'message' => _tr('alerts.backend.quizapplication.deleted'),
        ]);
    }
    

    /**
     * validate quizapplication.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizApplication(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'student_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizapplication.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
