<?php

namespace App\Http\Controllers\Backend\ScholarshipDocuments;

use App\Models\ScholarshipDocuments\ScholarshipDocument;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ScholarshipDocuments\CreateResponse;
use App\Http\Responses\Backend\ScholarshipDocuments\EditResponse;
use App\Repositories\Backend\ScholarshipDocuments\ScholarshipDocumentRepository;
use App\Http\Requests\Backend\ScholarshipDocuments\ManageScholarshipDocumentRequest;
use App\Http\Requests\Backend\ScholarshipDocuments\CreateScholarshipDocumentRequest;
use App\Http\Requests\Backend\ScholarshipDocuments\StoreScholarshipDocumentRequest;
use App\Http\Requests\Backend\ScholarshipDocuments\EditScholarshipDocumentRequest;
use App\Http\Requests\Backend\ScholarshipDocuments\UpdateScholarshipDocumentRequest;
use App\Http\Requests\Backend\ScholarshipDocuments\DeleteScholarshipDocumentRequest;

/**
 * ScholarshipDocumentsController
 */
class ScholarshipDocumentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScholarshipDocumentRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ScholarshipDocuments\ManageScholarshipDocumentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageScholarshipDocumentRequest $request)
    {
        return new ViewResponse('backend.scholarshipdocuments.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateScholarshipDocumentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScholarshipDocuments\CreateResponse
     */
    public function create(CreateScholarshipDocumentRequest $request)
    {
        return new CreateResponse('backend.scholarshipdocuments.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreScholarshipDocumentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreScholarshipDocumentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.scholarshipdocuments.index'), ['flash_success' => _tr('alerts.backend.scholarshipdocuments.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ScholarshipDocuments\ScholarshipDocument  $scholarshipdocument
     * @param  EditScholarshipDocumentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScholarshipDocuments\EditResponse
     */
    public function edit(ScholarshipDocument $scholarshipdocument, EditScholarshipDocumentRequest $request)
    {
        return new EditResponse($scholarshipdocument);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateScholarshipDocumentRequestNamespace  $request
     * @param  App\Models\ScholarshipDocuments\ScholarshipDocument  $scholarshipdocument
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateScholarshipDocumentRequest $request, ScholarshipDocument $scholarshipdocument)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $scholarshipdocument, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.scholarshipdocuments.index'), ['flash_success' => _tr('alerts.backend.scholarshipdocuments.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteScholarshipDocumentRequestNamespace  $request
     * @param  App\Models\ScholarshipDocuments\ScholarshipDocument  $scholarshipdocument
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ScholarshipDocument $scholarshipdocument, DeleteScholarshipDocumentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($scholarshipdocument);
        //returning with successfull message
        return new RedirectResponse(route('admin.scholarshipdocuments.index'), ['flash_success' => _tr('alerts.backend.scholarshipdocuments.deleted')]);
    }
    
}
