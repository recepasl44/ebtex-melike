<?php

namespace App\Http\Controllers\Backend\ExamRelevances;

use App\Models\ExamRelevances\ExamRelevance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ExamRelevances\CreateResponse;
use App\Http\Responses\Backend\ExamRelevances\EditResponse;
use App\Repositories\Backend\ExamRelevances\ExamRelevanceRepository;
use App\Http\Requests\Backend\ExamRelevances\ManageExamRelevanceRequest;
use App\Http\Requests\Backend\ExamRelevances\CreateExamRelevanceRequest;
use App\Http\Requests\Backend\ExamRelevances\StoreExamRelevanceRequest;
use App\Http\Requests\Backend\ExamRelevances\EditExamRelevanceRequest;
use App\Http\Requests\Backend\ExamRelevances\UpdateExamRelevanceRequest;
use App\Http\Requests\Backend\ExamRelevances\DeleteExamRelevanceRequest;

/**
 * ExamRelevancesController
 */
class ExamRelevancesController extends Controller
{
    /**
     * variable to store the repository object
     * @var ExamRelevanceRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ExamRelevances\ManageExamRelevanceRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageExamRelevanceRequest $request)
    {
        return new ViewResponse('backend.examrelevances.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateExamRelevanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ExamRelevances\CreateResponse
     */
    public function create(CreateExamRelevanceRequest $request)
    {
        return new CreateResponse('backend.examrelevances.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreExamRelevanceRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreExamRelevanceRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.examrelevances.index'), ['flash_success' => _tr('alerts.backend.examrelevances.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ExamRelevances\ExamRelevance  $examrelevance
     * @param  EditExamRelevanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ExamRelevances\EditResponse
     */
    public function edit(ExamRelevance $examrelevance, EditExamRelevanceRequest $request)
    {
        return new EditResponse($examrelevance);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateExamRelevanceRequestNamespace  $request
     * @param  App\Models\ExamRelevances\ExamRelevance  $examrelevance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateExamRelevanceRequest $request, ExamRelevance $examrelevance)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $examrelevance, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.examrelevances.index'), ['flash_success' => _tr('alerts.backend.examrelevances.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteExamRelevanceRequestNamespace  $request
     * @param  App\Models\ExamRelevances\ExamRelevance  $examrelevance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ExamRelevance $examrelevance, DeleteExamRelevanceRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($examrelevance);
        //returning with successfull message
        return new RedirectResponse(route('admin.examrelevances.index'), ['flash_success' => _tr('alerts.backend.examrelevances.deleted')]);
    }
    
}
