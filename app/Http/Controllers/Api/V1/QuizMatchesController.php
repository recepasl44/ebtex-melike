<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizMatchResource;
use App\Models\QuizMatchs\QuizMatch;
use App\Repositories\Backend\QuizMatchs\QuizMatchRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizMatchesController
 */
class QuizMatchesController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizMatchRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizMatchRepository $repository;
     */
    public function __construct(QuizMatchRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizmatch.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizMatchResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizMatch $quizmatch
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizMatch $quizmatch)
    {
        return new QuizMatchResource($quizmatch);
    }

    
     /**
      * Creates the Resource for quizmatch.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizMatch($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizMatchResource(QuizMatch::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizmatch.
         *
         * @param QuizMatch    $quizmatch
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizMatch $quizmatch)
    {
        $validation = $this->validateQuizMatch($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizmatch, $request->all());

        $quizmatch = QuizMatch::findOrfail($quizmatch->id);

        return new QuizMatchResource($quizmatch);
    }
    
    /**
     * Delete quizmatch.
     *
     * @param QuizMatch    $quizmatch
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizMatch $quizmatch)
    {
        $this->repository->delete($quizmatch);

        return $this->respond([
            'message' => _tr('alerts.backend.quizmatch.deleted'),
        ]);
    }
    

    /**
     * validate quizmatch.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizMatch(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'branche_id' => 'required',
               'levels' => 'required|array',
               'classrooms' => 'required|array',
               'sessions' => 'required|array',
               'quotas' => 'required|array',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizmatch.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
