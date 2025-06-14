<?php

namespace App\Http\Controllers\Backend\QuizSessions;

use App\Models\QuizSessions\QuizSession;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizSessions\CreateResponse;
use App\Http\Responses\Backend\QuizSessions\EditResponse;
use App\Repositories\Backend\QuizSessions\QuizSessionRepository;
use App\Http\Requests\Backend\QuizSessions\ManageQuizSessionRequest;
use App\Http\Requests\Backend\QuizSessions\CreateQuizSessionRequest;
use App\Http\Requests\Backend\QuizSessions\StoreQuizSessionRequest;
use App\Http\Requests\Backend\QuizSessions\EditQuizSessionRequest;
use App\Http\Requests\Backend\QuizSessions\UpdateQuizSessionRequest;
use App\Http\Requests\Backend\QuizSessions\DeleteQuizSessionRequest;

/**
 * QuizSessionsController
 */
class QuizSessionsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizSessionRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizSessionRepository $repository;
     */
    public function __construct(QuizSessionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizSessions\ManageQuizSessionRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizSessionRequest $request)
    {
        return new ViewResponse('backend.quizsessions.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizSessionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizSessions\CreateResponse
     */
    public function create(CreateQuizSessionRequest $request)
    {
        return new CreateResponse('backend.quizsessions.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizSessionRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizSessionRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizsessions.index'), ['flash_success' => _tr('alerts.backend.quizsessions.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizSessions\QuizSession  $quizsession
     * @param  EditQuizSessionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizSessions\EditResponse
     */
    public function edit(QuizSession $quizsession, EditQuizSessionRequest $request)
    {
        return new EditResponse($quizsession);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizSessionRequestNamespace  $request
     * @param  App\Models\QuizSessions\QuizSession  $quizsession
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizSessionRequest $request, QuizSession $quizsession)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizsession, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizsessions.index'), ['flash_success' => _tr('alerts.backend.quizsessions.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizSessionRequestNamespace  $request
     * @param  App\Models\QuizSessions\QuizSession  $quizsession
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizSession $quizsession, DeleteQuizSessionRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizsession);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizsessions.index'), ['flash_success' => _tr('alerts.backend.quizsessions.deleted')]);
    }
    
}
