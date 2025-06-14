<?php

namespace App\Http\Controllers\Backend\Quizzes;

use App\Models\Quizzes\Quiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Quizzes\CreateResponse;
use App\Http\Responses\Backend\Quizzes\EditResponse;
use App\Repositories\Backend\Quizzes\QuizRepository;
use App\Http\Requests\Backend\Quizzes\ManageQuizRequest;
use App\Http\Requests\Backend\Quizzes\CreateQuizRequest;
use App\Http\Requests\Backend\Quizzes\StoreQuizRequest;
use App\Http\Requests\Backend\Quizzes\EditQuizRequest;
use App\Http\Requests\Backend\Quizzes\UpdateQuizRequest;
use App\Http\Requests\Backend\Quizzes\DeleteQuizRequest;

/**
 * QuizzesController
 */
class QuizzesController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizRepository $repository;
     */
    public function __construct(QuizRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Quizzes\ManageQuizRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizRequest $request)
    {
        return new ViewResponse('backend.quizzes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Quizzes\CreateResponse
     */
    public function create(CreateQuizRequest $request)
    {
        return new CreateResponse('backend.quizzes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizzes.index'), ['flash_success' => _tr('alerts.backend.quizzes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Quizzes\Quiz  $quiz
     * @param  EditQuizRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Quizzes\EditResponse
     */
    public function edit(Quiz $quiz, EditQuizRequest $request)
    {
        return new EditResponse($quiz);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizRequestNamespace  $request
     * @param  App\Models\Quizzes\Quiz  $quiz
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizRequest $request, Quiz $quiz)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quiz, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizzes.index'), ['flash_success' => _tr('alerts.backend.quizzes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizRequestNamespace  $request
     * @param  App\Models\Quizzes\Quiz  $quiz
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Quiz $quiz, DeleteQuizRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quiz);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizzes.index'), ['flash_success' => _tr('alerts.backend.quizzes.deleted')]);
    }
    
}
