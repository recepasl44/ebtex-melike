<?php

namespace App\Http\Controllers\Backend\QuizCurriculums;

use App\Models\QuizCurriculums\QuizCurriculum;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizCurriculums\CreateResponse;
use App\Http\Responses\Backend\QuizCurriculums\EditResponse;
use App\Repositories\Backend\QuizCurriculums\QuizCurriculumRepository;
use App\Http\Requests\Backend\QuizCurriculums\ManageQuizCurriculumRequest;
use App\Http\Requests\Backend\QuizCurriculums\CreateQuizCurriculumRequest;
use App\Http\Requests\Backend\QuizCurriculums\StoreQuizCurriculumRequest;
use App\Http\Requests\Backend\QuizCurriculums\EditQuizCurriculumRequest;
use App\Http\Requests\Backend\QuizCurriculums\UpdateQuizCurriculumRequest;
use App\Http\Requests\Backend\QuizCurriculums\DeleteQuizCurriculumRequest;

/**
 * QuizCurriculumsController
 */
class QuizCurriculumsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizCurriculumRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizCurriculums\ManageQuizCurriculumRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizCurriculumRequest $request)
    {
        return new ViewResponse('backend.quizcurriculums.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizCurriculumRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizCurriculums\CreateResponse
     */
    public function create(CreateQuizCurriculumRequest $request)
    {
        return new CreateResponse('backend.quizcurriculums.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizCurriculumRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizCurriculumRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizcurriculums.index'), ['flash_success' => _tr('alerts.backend.quizcurriculums.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizCurriculums\QuizCurriculum  $quizcurriculum
     * @param  EditQuizCurriculumRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizCurriculums\EditResponse
     */
    public function edit(QuizCurriculum $quizcurriculum, EditQuizCurriculumRequest $request)
    {
        return new EditResponse($quizcurriculum);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizCurriculumRequestNamespace  $request
     * @param  App\Models\QuizCurriculums\QuizCurriculum  $quizcurriculum
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizCurriculumRequest $request, QuizCurriculum $quizcurriculum)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizcurriculum, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizcurriculums.index'), ['flash_success' => _tr('alerts.backend.quizcurriculums.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizCurriculumRequestNamespace  $request
     * @param  App\Models\QuizCurriculums\QuizCurriculum  $quizcurriculum
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizCurriculum $quizcurriculum, DeleteQuizCurriculumRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizcurriculum);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizcurriculums.index'), ['flash_success' => _tr('alerts.backend.quizcurriculums.deleted')]);
    }
    
}
