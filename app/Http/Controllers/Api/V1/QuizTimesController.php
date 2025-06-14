<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizTimeResource;
use App\Models\QuizTimes\QuizTime;
use App\Repositories\Backend\QuizTimes\QuizTimeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizTimesController
 */
class QuizTimesController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizTimeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizTimeRepository $repository;
     */
    public function __construct(QuizTimeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quiztime.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizTimeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizTime $quiztime
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizTime $quiztime)
    {
        return new QuizTimeResource($quiztime);
    }

    
     /**
      * Creates the Resource for quiztime.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizTime($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizTimeResource(QuizTime::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quiztime.
         *
         * @param QuizTime    $quiztime
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizTime $quiztime)
    {
        $validation = $this->validateQuizTime($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quiztime, $request->all());

        $quiztime = QuizTime::findOrfail($quiztime->id);

        return new QuizTimeResource($quiztime);
    }
    
    /**
     * Delete quiztime.
     *
     * @param QuizTime    $quiztime
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizTime $quiztime)
    {
        $this->repository->delete($quiztime);

        return $this->respond([
            'message' => _tr('alerts.backend.quiztime.deleted'),
        ]);
    }
    

    /**
     * validate quiztime.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizTime(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'session_id' => 'required',
               'session_hour' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quiztime.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
