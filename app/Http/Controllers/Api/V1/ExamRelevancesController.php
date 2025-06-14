<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ExamRelevanceResource;
use App\Models\ExamRelevances\ExamRelevance;
use App\Repositories\Backend\ExamRelevances\ExamRelevanceRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ExamRelevancesController
 */
class ExamRelevancesController extends APIController
{
    /**
     * __construct.
     *
     * @var ExamRelevanceRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ExamRelevanceRepository $repository;
     */
    public function __construct(ExamRelevanceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $examrelevance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ExamRelevanceResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ExamRelevance $examrelevance
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ExamRelevance $examrelevance)
    {
        return new ExamRelevanceResource($examrelevance);
    }

    
     /**
      * Creates the Resource for examrelevance.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateExamRelevance($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ExamRelevanceResource(ExamRelevance::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update examrelevance.
         *
         * @param ExamRelevance    $examrelevance
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ExamRelevance $examrelevance)
    {
        $validation = $this->validateExamRelevance($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($examrelevance, $request->all());

        $examrelevance = ExamRelevance::findOrfail($examrelevance->id);

        return new ExamRelevanceResource($examrelevance);
    }
    
    /**
     * Delete examrelevance.
     *
     * @param ExamRelevance    $examrelevance
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ExamRelevance $examrelevance)
    {
        $this->repository->delete($examrelevance);

        return $this->respond([
            'message' => _tr('alerts.backend.examrelevance.deleted'),
        ]);
    }
    

    /**
     * validate examrelevance.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateExamRelevance(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate examrelevance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
