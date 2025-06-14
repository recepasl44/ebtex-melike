<?php

namespace App\Http\Controllers\Backend\Questions;

use App\Models\Questions\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Questions\CreateResponse;
use App\Http\Responses\Backend\Questions\EditResponse;
use App\Repositories\Backend\Questions\QuestionRepository;
use App\Http\Requests\Backend\Questions\ManageQuestionRequest;
use App\Http\Requests\Backend\Questions\CreateQuestionRequest;
use App\Http\Requests\Backend\Questions\StoreQuestionRequest;
use App\Http\Requests\Backend\Questions\EditQuestionRequest;
use App\Http\Requests\Backend\Questions\UpdateQuestionRequest;
use App\Http\Requests\Backend\Questions\DeleteQuestionRequest;

/**
 * QuestionsController
 */
class QuestionsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuestionRepository $repository;
     */
    public function __construct(QuestionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Questions\ManageQuestionRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuestionRequest $request)
    {
        return new ViewResponse('backend.questions.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuestionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Questions\CreateResponse
     */
    public function create(CreateQuestionRequest $request)
    {
        return new CreateResponse('backend.questions.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuestionRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuestionRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.questions.index'), ['flash_success' => _tr('alerts.backend.questions.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Questions\Question  $question
     * @param  EditQuestionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Questions\EditResponse
     */
    public function edit(Question $question, EditQuestionRequest $request)
    {
        return new EditResponse($question);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuestionRequestNamespace  $request
     * @param  App\Models\Questions\Question  $question
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuestionRequest $request, Question $question)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $question, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.questions.index'), ['flash_success' => _tr('alerts.backend.questions.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuestionRequestNamespace  $request
     * @param  App\Models\Questions\Question  $question
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Question $question, DeleteQuestionRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($question);
        //returning with successfull message
        return new RedirectResponse(route('admin.questions.index'), ['flash_success' => _tr('alerts.backend.questions.deleted')]);
    }

    public function upload( Request $request)
    {
        return view('backend.questions.upload');
    }
    
}
