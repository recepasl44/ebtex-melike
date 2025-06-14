<?php

namespace App\Http\Controllers\Backend\TestQuestions;

use App\Models\TestQuestions\TestQuestion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\TestQuestions\CreateResponse;
use App\Http\Responses\Backend\TestQuestions\EditResponse;
use App\Repositories\Backend\TestQuestions\TestQuestionRepository;
use App\Http\Requests\Backend\TestQuestions\ManageTestQuestionRequest;
use App\Http\Requests\Backend\TestQuestions\CreateTestQuestionRequest;
use App\Http\Requests\Backend\TestQuestions\StoreTestQuestionRequest;
use App\Http\Requests\Backend\TestQuestions\EditTestQuestionRequest;
use App\Http\Requests\Backend\TestQuestions\UpdateTestQuestionRequest;
use App\Http\Requests\Backend\TestQuestions\DeleteTestQuestionRequest;

/**
 * TestQuestionsController
 */
class TestQuestionsController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestQuestionRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TestQuestionRepository $repository;
     */
    public function __construct(TestQuestionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\TestQuestions\ManageTestQuestionRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageTestQuestionRequest $request)
    {
        return new ViewResponse('backend.testquestions.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateTestQuestionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\TestQuestions\CreateResponse
     */
    public function create(CreateTestQuestionRequest $request)
    {
        return new CreateResponse('backend.testquestions.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreTestQuestionRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreTestQuestionRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.testquestions.index'), ['flash_success' => _tr('alerts.backend.testquestions.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\TestQuestions\TestQuestion  $testquestion
     * @param  EditTestQuestionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\TestQuestions\EditResponse
     */
    public function edit(TestQuestion $testquestion, EditTestQuestionRequest $request)
    {
        return new EditResponse($testquestion);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateTestQuestionRequestNamespace  $request
     * @param  App\Models\TestQuestions\TestQuestion  $testquestion
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateTestQuestionRequest $request, TestQuestion $testquestion)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $testquestion, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.testquestions.index'), ['flash_success' => _tr('alerts.backend.testquestions.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteTestQuestionRequestNamespace  $request
     * @param  App\Models\TestQuestions\TestQuestion  $testquestion
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(TestQuestion $testquestion, DeleteTestQuestionRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($testquestion);
        //returning with successfull message
        return new RedirectResponse(route('admin.testquestions.index'), ['flash_success' => _tr('alerts.backend.testquestions.deleted')]);
    }
    
}
