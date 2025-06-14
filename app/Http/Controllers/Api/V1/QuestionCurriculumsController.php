<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuestionCurriculumResource;
use App\Models\QuestionCurriculums\QuestionCurriculum;
use App\Repositories\Backend\QuestionCurriculums\QuestionCurriculumRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuestionCurriculumsController
 */
class QuestionCurriculumsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuestionCurriculumRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuestionCurriculumRepository $repository;
     */
    public function __construct(QuestionCurriculumRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $questioncurriculum.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuestionCurriculumResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuestionCurriculum $questioncurriculum
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuestionCurriculum $questioncurriculum)
    {
        return new QuestionCurriculumResource($questioncurriculum);
    }

    
     /**
      * Creates the Resource for questioncurriculum.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuestionCurriculum($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuestionCurriculumResource(QuestionCurriculum::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update questioncurriculum.
         *
         * @param QuestionCurriculum    $questioncurriculum
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuestionCurriculum $questioncurriculum)
    {
        $validation = $this->validateQuestionCurriculum($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($questioncurriculum, $request->all());

        $questioncurriculum = QuestionCurriculum::findOrfail($questioncurriculum->id);

        return new QuestionCurriculumResource($questioncurriculum);
    }
    
    /**
     * Delete questioncurriculum.
     *
     * @param QuestionCurriculum    $questioncurriculum
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuestionCurriculum $questioncurriculum)
    {
        $this->repository->delete($questioncurriculum);

        return $this->respond([
            'message' => _tr('alerts.backend.questioncurriculum.deleted'),
        ]);
    }
    

    /**
     * validate questioncurriculum.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuestionCurriculum(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'question_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate questioncurriculum.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
