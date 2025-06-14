<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizCurriculumResource;
use App\Models\QuizCurriculums\QuizCurriculum;
use App\Repositories\Backend\QuizCurriculums\QuizCurriculumRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizCurriculumsController
 */
class QuizCurriculumsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizCurriculumRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizCurriculumRepository $repository;
     */
    public function __construct(QuizCurriculumRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quizcurriculum.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizCurriculumResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizCurriculum $quizcurriculum
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizCurriculum $quizcurriculum)
    {
        return new QuizCurriculumResource($quizcurriculum);
    }

    
     /**
      * Creates the Resource for quizcurriculum.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizCurriculum($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizCurriculumResource(QuizCurriculum::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quizcurriculum.
         *
         * @param QuizCurriculum    $quizcurriculum
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizCurriculum $quizcurriculum)
    {
        $validation = $this->validateQuizCurriculum($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quizcurriculum, $request->all());

        $quizcurriculum = QuizCurriculum::findOrfail($quizcurriculum->id);

        return new QuizCurriculumResource($quizcurriculum);
    }
    
    /**
     * Delete quizcurriculum.
     *
     * @param QuizCurriculum    $quizcurriculum
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizCurriculum $quizcurriculum)
    {
        $this->repository->delete($quizcurriculum);

        return $this->respond([
            'message' => _tr('alerts.backend.quizcurriculum.deleted'),
        ]);
    }
    

    /**
     * validate quizcurriculum.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizCurriculum(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'type_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quizcurriculum.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
