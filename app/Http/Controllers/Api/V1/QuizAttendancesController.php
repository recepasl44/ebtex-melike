<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizAttendanceResource;
use App\Models\QuizAttendances\QuizAttendance;
use App\Repositories\Backend\QuizAttendances\QuizAttendanceRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizAttendancesController
 */
class QuizAttendancesController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizAttendanceRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizAttendanceRepository $repository;
     */
    public function __construct(QuizAttendanceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizattendance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizAttendanceResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizAttendance $quizattendance
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizAttendance $quizattendance)
    {
        return new QuizAttendanceResource($quizattendance);
    }

    
     /**
      * Creates the Resource for quizattendance.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizAttendance($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizAttendanceResource(QuizAttendance::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizattendance.
         *
         * @param QuizAttendance    $quizattendance
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizAttendance $quizattendance)
    {
        $validation = $this->validateQuizAttendance($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizattendance, $request->all());

        $quizattendance = QuizAttendance::findOrfail($quizattendance->id);

        return new QuizAttendanceResource($quizattendance);
    }
    
    /**
     * Delete quizattendance.
     *
     * @param QuizAttendance    $quizattendance
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizAttendance $quizattendance)
    {
        $this->repository->delete($quizattendance);

        return $this->respond([
            'message' => _tr('alerts.backend.quizattendance.deleted'),
        ]);
    }
    

    /**
     * validate quizattendance.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizAttendance(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'user_id' => 'required',
               'is_attendance' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizattendance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
