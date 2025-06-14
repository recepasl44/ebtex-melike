<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizLevelResource;
use App\Models\QuizLevels\QuizLevel;
use App\Repositories\Backend\QuizLevels\QuizLevelRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizLevelsController
 */
class QuizLevelsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizLevelRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizLevelRepository $repository;
     */
    public function __construct(QuizLevelRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizlevel.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizLevelResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizLevel $quizlevel
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizLevel $quizlevel)
    {
        return new QuizLevelResource($quizlevel);
    }

    
     /**
      * Creates the Resource for quizlevel.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizLevel($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizLevelResource(QuizLevel::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizlevel.
         *
         * @param QuizLevel    $quizlevel
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizLevel $quizlevel)
    {
        $validation = $this->validateQuizLevel($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizlevel, $request->all());

        $quizlevel = QuizLevel::findOrfail($quizlevel->id);

        return new QuizLevelResource($quizlevel);
    }
    
    /**
     * Delete quizlevel.
     *
     * @param QuizLevel    $quizlevel
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizLevel $quizlevel)
    {
        $this->repository->delete($quizlevel);

        return $this->respond([
            'message' => _tr('alerts.backend.quizlevel.deleted'),
        ]);
    }
    

    /**
     * validate quizlevel.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizLevel(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'level_id' => 'required',
               'type_id' => 'required',
               'time_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizlevel.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
