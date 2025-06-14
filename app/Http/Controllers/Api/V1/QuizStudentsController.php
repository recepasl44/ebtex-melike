<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizStudentResource;
use App\Models\QuizStudents\QuizStudent;
use App\Repositories\Backend\QuizStudents\QuizStudentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizStudentsController
 */
class QuizStudentsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizStudentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizStudentRepository $repository;
     */
    public function __construct(QuizStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizStudentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizStudent $quizstudent
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizStudent $quizstudent)
    {
        return new QuizStudentResource($quizstudent);
    }

    
     /**
      * Creates the Resource for quizstudent.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizStudent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizStudentResource(QuizStudent::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizstudent.
         *
         * @param QuizStudent    $quizstudent
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizStudent $quizstudent)
    {
        $validation = $this->validateQuizStudent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizstudent, $request->all());

        $quizstudent = QuizStudent::findOrfail($quizstudent->id);

        return new QuizStudentResource($quizstudent);
    }
    
    /**
     * Delete quizstudent.
     *
     * @param QuizStudent    $quizstudent
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizStudent $quizstudent)
    {
        $this->repository->delete($quizstudent);

        return $this->respond([
            'message' => _tr('alerts.backend.quizstudent.deleted'),
        ]);
    }
    

    /**
     * validate quizstudent.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizStudent(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'student_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
