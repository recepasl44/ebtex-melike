<?php

namespace App\Http\Controllers\Backend\QuestionCurriculums;

use App\Models\QuestionCurriculums\QuestionCurriculum;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuestionCurriculums\CreateResponse;
use App\Http\Responses\Backend\QuestionCurriculums\EditResponse;
use App\Repositories\Backend\QuestionCurriculums\QuestionCurriculumRepository;
use App\Http\Requests\Backend\QuestionCurriculums\ManageQuestionCurriculumRequest;
use App\Http\Requests\Backend\QuestionCurriculums\CreateQuestionCurriculumRequest;
use App\Http\Requests\Backend\QuestionCurriculums\StoreQuestionCurriculumRequest;
use App\Http\Requests\Backend\QuestionCurriculums\EditQuestionCurriculumRequest;
use App\Http\Requests\Backend\QuestionCurriculums\UpdateQuestionCurriculumRequest;
use App\Http\Requests\Backend\QuestionCurriculums\DeleteQuestionCurriculumRequest;

/**
 * QuestionCurriculumsController
 */
class QuestionCurriculumsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionCurriculumRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuestionCurriculums\ManageQuestionCurriculumRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuestionCurriculumRequest $request)
    {
        return new ViewResponse('backend.questioncurriculums.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuestionCurriculumRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuestionCurriculums\CreateResponse
     */
    public function create(CreateQuestionCurriculumRequest $request)
    {
        return new CreateResponse('backend.questioncurriculums.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuestionCurriculumRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuestionCurriculumRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.questioncurriculums.index'), ['flash_success' => _tr('alerts.backend.questioncurriculums.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuestionCurriculums\QuestionCurriculum  $questioncurriculum
     * @param  EditQuestionCurriculumRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuestionCurriculums\EditResponse
     */
    public function edit(QuestionCurriculum $questioncurriculum, EditQuestionCurriculumRequest $request)
    {
        return new EditResponse($questioncurriculum);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuestionCurriculumRequestNamespace  $request
     * @param  App\Models\QuestionCurriculums\QuestionCurriculum  $questioncurriculum
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuestionCurriculumRequest $request, QuestionCurriculum $questioncurriculum)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $questioncurriculum, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.questioncurriculums.index'), ['flash_success' => _tr('alerts.backend.questioncurriculums.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuestionCurriculumRequestNamespace  $request
     * @param  App\Models\QuestionCurriculums\QuestionCurriculum  $questioncurriculum
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuestionCurriculum $questioncurriculum, DeleteQuestionCurriculumRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($questioncurriculum);
        //returning with successfull message
        return new RedirectResponse(route('admin.questioncurriculums.index'), ['flash_success' => _tr('alerts.backend.questioncurriculums.deleted')]);
    }
    
}
