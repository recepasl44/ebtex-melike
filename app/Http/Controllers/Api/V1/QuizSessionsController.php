<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizSessionResource;
use App\Models\QuizSessions\QuizSession;
use App\Repositories\Backend\QuizSessions\QuizSessionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizSessionsController
 */
class QuizSessionsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizSessionRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizSessionRepository $repository;
     */
    public function __construct(QuizSessionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizsession.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizSessionResource::collection(
            $this->repository->getForDataTable()->selectRaw('DATE(session_date) as session_day')->groupBy('session_day')->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizSession $quizsession
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizSession $quizsession)
    {
        return new QuizSessionResource($quizsession);
    }

    
     /**
      * Creates the Resource for quizsession.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizSession($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizSessionResource(QuizSession::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizsession.
         *
         * @param QuizSession    $quizsession
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizSession $quizsession)
    {
        $validation = $this->validateQuizSession($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizsession, $request->all());

        $quizsession = QuizSession::findOrfail($quizsession->id);

        return new QuizSessionResource($quizsession);
    }
    
    /**
     * Delete quizsession.
     *
     * @param QuizSession    $quizsession
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizSession $quizsession)
    {
        $this->repository->delete($quizsession);

        return $this->respond([
            'message' => _tr('alerts.backend.quizsession.deleted'),
        ]);
    }
    

    /**
     * validate quizsession.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizSession(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'branche_id' => 'required',
               'session_date' => 'required|date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizsession.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
