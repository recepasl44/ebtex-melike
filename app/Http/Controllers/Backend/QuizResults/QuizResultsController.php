<?php

namespace App\Http\Controllers\Backend\QuizResults;

use App\Models\QuizResults\QuizResult;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizResults\CreateResponse;
use App\Http\Responses\Backend\QuizResults\EditResponse;
use App\Repositories\Backend\QuizResults\QuizResultRepository;
use App\Http\Requests\Backend\QuizResults\ManageQuizResultRequest;
use App\Http\Requests\Backend\QuizResults\CreateQuizResultRequest;
use App\Http\Requests\Backend\QuizResults\StoreQuizResultRequest;
use App\Http\Requests\Backend\QuizResults\EditQuizResultRequest;
use App\Http\Requests\Backend\QuizResults\UpdateQuizResultRequest;
use App\Http\Requests\Backend\QuizResults\DeleteQuizResultRequest;

/**
 * QuizResultsController
 */
class QuizResultsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizResultRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizResultRepository $repository;
     */
    public function __construct(QuizResultRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizResults\ManageQuizResultRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizResultRequest $request)
    {
        return new ViewResponse('backend.quizresults.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizResultRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizResults\CreateResponse
     */
    public function create(CreateQuizResultRequest $request)
    {
        return new CreateResponse('backend.quizresults.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizResultRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizResultRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizresults.index'), ['flash_success' => _tr('alerts.backend.quizresults.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizResults\QuizResult  $quizresult
     * @param  EditQuizResultRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizResults\EditResponse
     */
    public function edit(QuizResult $quizresult, EditQuizResultRequest $request)
    {
        return new EditResponse($quizresult);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizResultRequestNamespace  $request
     * @param  App\Models\QuizResults\QuizResult  $quizresult
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizResultRequest $request, QuizResult $quizresult)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizresult, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizresults.index'), ['flash_success' => _tr('alerts.backend.quizresults.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizResultRequestNamespace  $request
     * @param  App\Models\QuizResults\QuizResult  $quizresult
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizResult $quizresult, DeleteQuizResultRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizresult);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizresults.index'), ['flash_success' => _tr('alerts.backend.quizresults.deleted')]);
    }
    
}
