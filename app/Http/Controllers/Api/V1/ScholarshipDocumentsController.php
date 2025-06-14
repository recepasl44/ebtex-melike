<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ScholarshipDocumentResource;
use App\Models\ScholarshipDocuments\ScholarshipDocument;
use App\Repositories\Backend\ScholarshipDocuments\ScholarshipDocumentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ScholarshipDocumentsController
 */
class ScholarshipDocumentsController extends APIController
{
    /**
     * __construct.
     *
     * @var ScholarshipDocumentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScholarshipDocumentRepository $repository;
     */
    public function __construct(ScholarshipDocumentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $scholarshipdocument.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ScholarshipDocumentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ScholarshipDocument $scholarshipdocument
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ScholarshipDocument $scholarshipdocument)
    {
        return new ScholarshipDocumentResource($scholarshipdocument);
    }

    
     /**
      * Creates the Resource for scholarshipdocument.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateScholarshipDocument($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ScholarshipDocumentResource(ScholarshipDocument::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update scholarshipdocument.
         *
         * @param ScholarshipDocument    $scholarshipdocument
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ScholarshipDocument $scholarshipdocument)
    {
        $validation = $this->validateScholarshipDocument($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($scholarshipdocument, $request->all());

        $scholarshipdocument = ScholarshipDocument::findOrfail($scholarshipdocument->id);

        return new ScholarshipDocumentResource($scholarshipdocument);
    }
    
    /**
     * Delete scholarshipdocument.
     *
     * @param ScholarshipDocument    $scholarshipdocument
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ScholarshipDocument $scholarshipdocument)
    {
        $this->repository->delete($scholarshipdocument);

        return $this->respond([
            'message' => _tr('alerts.backend.scholarshipdocument.deleted'),
        ]);
    }
    

    /**
     * validate scholarshipdocument.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateScholarshipDocument(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'scholarship_id' => 'required',
               'campus_name' => 'required|max:191',
               'building_name' => 'required|max:191',
               'hall_name' => 'required|max:191',
               'hall_date' => 'required|date',
               'hall_session' => 'required|max:191',
               'phone' => 'max:191',
               'birth_date' => 'required|date',
               'first_name' => 'required|max:191',
               'last_name' => 'required|max:191',
               'identity_no' => 'required|max:191',
               'gender' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate scholarshipdocument.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
