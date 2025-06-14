<?php

namespace App\Http\Controllers\Backend\QuizMatchs;

use App\Models\QuizMatchs\QuizMatch;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizMatchs\CreateResponse;
use App\Http\Responses\Backend\QuizMatchs\EditResponse;
use App\Repositories\Backend\QuizMatchs\QuizMatchRepository;
use App\Http\Requests\Backend\QuizMatchs\ManageQuizMatchRequest;
use App\Http\Requests\Backend\QuizMatchs\CreateQuizMatchRequest;
use App\Http\Requests\Backend\QuizMatchs\StoreQuizMatchRequest;
use App\Http\Requests\Backend\QuizMatchs\EditQuizMatchRequest;
use App\Http\Requests\Backend\QuizMatchs\UpdateQuizMatchRequest;
use App\Http\Requests\Backend\QuizMatchs\DeleteQuizMatchRequest;

/**
 * QuizMatchesController
 */
class QuizMatchesController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizMatchRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizMatchRepository $repository;
     */
    public function __construct(QuizMatchRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizMatchs\ManageQuizMatchRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizMatchRequest $request)
    {
        return new ViewResponse('backend.quizmatches.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizMatchRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizMatchs\CreateResponse
     */
    public function create(CreateQuizMatchRequest $request)
    {
        return new CreateResponse('backend.quizmatches.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizMatchRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizMatchRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizmatches.index'), ['flash_success' => _tr('alerts.backend.quizmatches.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizMatchs\QuizMatch  $quizmatch
     * @param  EditQuizMatchRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizMatchs\EditResponse
     */
    public function edit(QuizMatch $quizmatch, EditQuizMatchRequest $request)
    {
        return new EditResponse($quizmatch);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizMatchRequestNamespace  $request
     * @param  App\Models\QuizMatchs\QuizMatch  $quizmatch
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizMatchRequest $request, QuizMatch $quizmatch)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizmatch, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizmatches.index'), ['flash_success' => _tr('alerts.backend.quizmatches.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizMatchRequestNamespace  $request
     * @param  App\Models\QuizMatchs\QuizMatch  $quizmatch
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizMatch $quizmatch, DeleteQuizMatchRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizmatch);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizmatches.index'), ['flash_success' => _tr('alerts.backend.quizmatches.deleted')]);
    }
    
}
