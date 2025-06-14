<?php

namespace App\Http\Controllers\Backend\QuizApplications;

use App\Models\QuizApplications\QuizApplication;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizApplications\CreateResponse;
use App\Http\Responses\Backend\QuizApplications\EditResponse;
use App\Repositories\Backend\QuizApplications\QuizApplicationRepository;
use App\Http\Requests\Backend\QuizApplications\ManageQuizApplicationRequest;
use App\Http\Requests\Backend\QuizApplications\CreateQuizApplicationRequest;
use App\Http\Requests\Backend\QuizApplications\StoreQuizApplicationRequest;
use App\Http\Requests\Backend\QuizApplications\EditQuizApplicationRequest;
use App\Http\Requests\Backend\QuizApplications\UpdateQuizApplicationRequest;
use App\Http\Requests\Backend\QuizApplications\DeleteQuizApplicationRequest;

/**
 * QuizApplicationsController
 */
class QuizApplicationsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizApplicationRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizApplicationRepository $repository;
     */
    public function __construct(QuizApplicationRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizApplications\ManageQuizApplicationRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizApplicationRequest $request)
    {
        return new ViewResponse('backend.quizapplications.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizApplicationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizApplications\CreateResponse
     */
    public function create(CreateQuizApplicationRequest $request)
    {
        return new CreateResponse('backend.quizapplications.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizApplicationRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizApplicationRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizapplications.index'), ['flash_success' => _tr('alerts.backend.quizapplications.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizApplications\QuizApplication  $quizapplication
     * @param  EditQuizApplicationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizApplications\EditResponse
     */
    public function edit(QuizApplication $quizapplication, EditQuizApplicationRequest $request)
    {
        return new EditResponse($quizapplication);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizApplicationRequestNamespace  $request
     * @param  App\Models\QuizApplications\QuizApplication  $quizapplication
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizApplicationRequest $request, QuizApplication $quizapplication)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizapplication, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizapplications.index'), ['flash_success' => _tr('alerts.backend.quizapplications.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizApplicationRequestNamespace  $request
     * @param  App\Models\QuizApplications\QuizApplication  $quizapplication
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizApplication $quizapplication, DeleteQuizApplicationRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizapplication);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizapplications.index'), ['flash_success' => _tr('alerts.backend.quizapplications.deleted')]);
    }
    
}
