<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuestionPdfResource;
use App\Models\QuestionPdfs\QuestionPdf;
use App\Repositories\Backend\QuestionPdfs\QuestionPdfRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuestionPdfsController
 */
class QuestionPdfsController extends APIController
{
    /**
     * __construct.
     *
     * @var QuestionPdfRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuestionPdfRepository $repository;
     */
    public function __construct(QuestionPdfRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $questionpdf.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuestionPdfResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuestionPdf $questionpdf
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuestionPdf $questionpdf)
    {
        return new QuestionPdfResource($questionpdf);
    }

    
     /**
      * Creates the Resource for questionpdf.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuestionPdf($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuestionPdfResource(QuestionPdf::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update questionpdf.
         *
         * @param QuestionPdf    $questionpdf
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuestionPdf $questionpdf)
    {
        $validation = $this->validateQuestionPdf($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($questionpdf, $request->all());

        $questionpdf = QuestionPdf::findOrfail($questionpdf->id);

        return new QuestionPdfResource($questionpdf);
    }
    
    /**
     * Delete questionpdf.
     *
     * @param QuestionPdf    $questionpdf
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuestionPdf $questionpdf)
    {
        $this->repository->delete($questionpdf);

        return $this->respond([
            'message' => _tr('alerts.backend.questionpdf.deleted'),
        ]);
    }
    

    /**
     * validate questionpdf.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuestionPdf(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'file_path' => 'required|numeric',
               ]);

        return $validation;
    }

    /**
     * validate message for validate questionpdf.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
