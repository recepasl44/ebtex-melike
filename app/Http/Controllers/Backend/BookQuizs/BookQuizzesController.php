<?php

namespace App\Http\Controllers\Backend\BookQuizs;

use App\Models\BookQuizs\BookQuiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\BookQuizs\CreateResponse;
use App\Http\Responses\Backend\BookQuizs\EditResponse;
use App\Repositories\Backend\BookQuizs\BookQuizRepository;
use App\Http\Requests\Backend\BookQuizs\ManageBookQuizRequest;
use App\Http\Requests\Backend\BookQuizs\CreateBookQuizRequest;
use App\Http\Requests\Backend\BookQuizs\StoreBookQuizRequest;
use App\Http\Requests\Backend\BookQuizs\EditBookQuizRequest;
use App\Http\Requests\Backend\BookQuizs\UpdateBookQuizRequest;
use App\Http\Requests\Backend\BookQuizs\DeleteBookQuizRequest;

/**
 * BookQuizzesController
 */
class BookQuizzesController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookQuizRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookQuizRepository $repository;
     */
    public function __construct(BookQuizRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\BookQuizs\ManageBookQuizRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBookQuizRequest $request)
    {
        return new ViewResponse('backend.bookquizzes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateBookQuizRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookQuizs\CreateResponse
     */
    public function create(CreateBookQuizRequest $request)
    {
        return new CreateResponse('backend.bookquizzes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBookQuizRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreBookQuizRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.bookquizzes.index'), ['flash_success' => _tr('alerts.backend.bookquizzes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\BookQuizs\BookQuiz  $bookquiz
     * @param  EditBookQuizRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookQuizs\EditResponse
     */
    public function edit(BookQuiz $bookquiz, EditBookQuizRequest $request)
    {
        return new EditResponse($bookquiz);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBookQuizRequestNamespace  $request
     * @param  App\Models\BookQuizs\BookQuiz  $bookquiz
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateBookQuizRequest $request, BookQuiz $bookquiz)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $bookquiz, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.bookquizzes.index'), ['flash_success' => _tr('alerts.backend.bookquizzes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteBookQuizRequestNamespace  $request
     * @param  App\Models\BookQuizs\BookQuiz  $bookquiz
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(BookQuiz $bookquiz, DeleteBookQuizRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($bookquiz);
        //returning with successfull message
        return new RedirectResponse(route('admin.bookquizzes.index'), ['flash_success' => _tr('alerts.backend.bookquizzes.deleted')]);
    }
    
}
