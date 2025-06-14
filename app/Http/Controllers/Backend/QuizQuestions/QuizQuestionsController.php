<?php

namespace App\Http\Controllers\Backend\QuizQuestions;

use App\Models\QuizQuestions\QuizQuestion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizQuestions\CreateResponse;
use App\Http\Responses\Backend\QuizQuestions\EditResponse;
use App\Repositories\Backend\QuizQuestions\QuizQuestionRepository;
use App\Http\Requests\Backend\QuizQuestions\ManageQuizQuestionRequest;
use App\Http\Requests\Backend\QuizQuestions\CreateQuizQuestionRequest;
use App\Http\Requests\Backend\QuizQuestions\StoreQuizQuestionRequest;
use App\Http\Requests\Backend\QuizQuestions\EditQuizQuestionRequest;
use App\Http\Requests\Backend\QuizQuestions\UpdateQuizQuestionRequest;
use App\Http\Requests\Backend\QuizQuestions\DeleteQuizQuestionRequest;

/**
 * QuizQuestionsController
 */
class QuizQuestionsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizQuestionRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizQuestionRepository $repository;
     */
    public function __construct(QuizQuestionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizQuestions\ManageQuizQuestionRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizQuestionRequest $request)
    {
        return new ViewResponse('backend.quizquestions.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizQuestionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizQuestions\CreateResponse
     */
    public function create(CreateQuizQuestionRequest $request)
    {
        return new CreateResponse('backend.quizquestions.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizQuestionRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizQuestionRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizquestions.index'), ['flash_success' => _tr('alerts.backend.quizquestions.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizQuestions\QuizQuestion  $quizquestion
     * @param  EditQuizQuestionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizQuestions\EditResponse
     */
    public function edit(QuizQuestion $quizquestion, EditQuizQuestionRequest $request)
    {
        return new EditResponse($quizquestion);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizQuestionRequestNamespace  $request
     * @param  App\Models\QuizQuestions\QuizQuestion  $quizquestion
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizQuestionRequest $request, QuizQuestion $quizquestion)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizquestion, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizquestions.index'), ['flash_success' => _tr('alerts.backend.quizquestions.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizQuestionRequestNamespace  $request
     * @param  App\Models\QuizQuestions\QuizQuestion  $quizquestion
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizQuestion $quizquestion, DeleteQuizQuestionRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizquestion);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizquestions.index'), ['flash_success' => _tr('alerts.backend.quizquestions.deleted')]);
    }
    
}
