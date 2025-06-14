<?php

namespace App\Http\Controllers\Backend\QuizNotes;

use App\Models\QuizNotes\QuizNote;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizNotes\CreateResponse;
use App\Http\Responses\Backend\QuizNotes\EditResponse;
use App\Repositories\Backend\QuizNotes\QuizNoteRepository;
use App\Http\Requests\Backend\QuizNotes\ManageQuizNoteRequest;
use App\Http\Requests\Backend\QuizNotes\CreateQuizNoteRequest;
use App\Http\Requests\Backend\QuizNotes\StoreQuizNoteRequest;
use App\Http\Requests\Backend\QuizNotes\EditQuizNoteRequest;
use App\Http\Requests\Backend\QuizNotes\UpdateQuizNoteRequest;
use App\Http\Requests\Backend\QuizNotes\DeleteQuizNoteRequest;

/**
 * QuizNotesController
 */
class QuizNotesController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizNoteRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizNoteRepository $repository;
     */
    public function __construct(QuizNoteRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizNotes\ManageQuizNoteRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizNoteRequest $request)
    {
        return new ViewResponse('backend.quiznotes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizNoteRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizNotes\CreateResponse
     */
    public function create(CreateQuizNoteRequest $request)
    {
        return new CreateResponse('backend.quiznotes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizNoteRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizNoteRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quiznotes.index'), ['flash_success' => _tr('alerts.backend.quiznotes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizNotes\QuizNote  $quiznote
     * @param  EditQuizNoteRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizNotes\EditResponse
     */
    public function edit(QuizNote $quiznote, EditQuizNoteRequest $request)
    {
        return new EditResponse($quiznote);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizNoteRequestNamespace  $request
     * @param  App\Models\QuizNotes\QuizNote  $quiznote
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizNoteRequest $request, QuizNote $quiznote)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quiznote, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quiznotes.index'), ['flash_success' => _tr('alerts.backend.quiznotes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizNoteRequestNamespace  $request
     * @param  App\Models\QuizNotes\QuizNote  $quiznote
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizNote $quiznote, DeleteQuizNoteRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quiznote);
        //returning with successfull message
        return new RedirectResponse(route('admin.quiznotes.index'), ['flash_success' => _tr('alerts.backend.quiznotes.deleted')]);
    }
    
}
