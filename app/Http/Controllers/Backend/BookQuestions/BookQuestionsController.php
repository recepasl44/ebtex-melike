<?php

namespace App\Http\Controllers\Backend\BookQuestions;

use App\Models\BookQuestions\BookQuestion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\BookQuestions\CreateResponse;
use App\Http\Responses\Backend\BookQuestions\EditResponse;
use App\Repositories\Backend\BookQuestions\BookQuestionRepository;
use App\Http\Requests\Backend\BookQuestions\ManageBookQuestionRequest;
use App\Http\Requests\Backend\BookQuestions\CreateBookQuestionRequest;
use App\Http\Requests\Backend\BookQuestions\StoreBookQuestionRequest;
use App\Http\Requests\Backend\BookQuestions\EditBookQuestionRequest;
use App\Http\Requests\Backend\BookQuestions\UpdateBookQuestionRequest;
use App\Http\Requests\Backend\BookQuestions\DeleteBookQuestionRequest;

/**
 * BookQuestionsController
 */
class BookQuestionsController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookQuestionRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookQuestionRepository $repository;
     */
    public function __construct(BookQuestionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\BookQuestions\ManageBookQuestionRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBookQuestionRequest $request)
    {
        return new ViewResponse('backend.bookquestions.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateBookQuestionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookQuestions\CreateResponse
     */
    public function create(CreateBookQuestionRequest $request)
    {
        return new CreateResponse('backend.bookquestions.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBookQuestionRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreBookQuestionRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.bookquestions.index'), ['flash_success' => _tr('alerts.backend.bookquestions.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\BookQuestions\BookQuestion  $bookquestion
     * @param  EditBookQuestionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookQuestions\EditResponse
     */
    public function edit(BookQuestion $bookquestion, EditBookQuestionRequest $request)
    {
        return new EditResponse($bookquestion);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBookQuestionRequestNamespace  $request
     * @param  App\Models\BookQuestions\BookQuestion  $bookquestion
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateBookQuestionRequest $request, BookQuestion $bookquestion)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $bookquestion, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.bookquestions.index'), ['flash_success' => _tr('alerts.backend.bookquestions.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteBookQuestionRequestNamespace  $request
     * @param  App\Models\BookQuestions\BookQuestion  $bookquestion
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(BookQuestion $bookquestion, DeleteBookQuestionRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($bookquestion);
        //returning with successfull message
        return new RedirectResponse(route('admin.bookquestions.index'), ['flash_success' => _tr('alerts.backend.bookquestions.deleted')]);
    }
    
}
