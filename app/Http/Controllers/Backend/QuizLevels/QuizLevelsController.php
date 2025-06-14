<?php

namespace App\Http\Controllers\Backend\QuizLevels;

use App\Models\QuizLevels\QuizLevel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizLevels\CreateResponse;
use App\Http\Responses\Backend\QuizLevels\EditResponse;
use App\Repositories\Backend\QuizLevels\QuizLevelRepository;
use App\Http\Requests\Backend\QuizLevels\ManageQuizLevelRequest;
use App\Http\Requests\Backend\QuizLevels\CreateQuizLevelRequest;
use App\Http\Requests\Backend\QuizLevels\StoreQuizLevelRequest;
use App\Http\Requests\Backend\QuizLevels\EditQuizLevelRequest;
use App\Http\Requests\Backend\QuizLevels\UpdateQuizLevelRequest;
use App\Http\Requests\Backend\QuizLevels\DeleteQuizLevelRequest;

/**
 * QuizLevelsController
 */
class QuizLevelsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizLevelRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizLevelRepository $repository;
     */
    public function __construct(QuizLevelRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizLevels\ManageQuizLevelRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizLevelRequest $request)
    {
        return new ViewResponse('backend.quizlevels.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizLevelRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizLevels\CreateResponse
     */
    public function create(CreateQuizLevelRequest $request)
    {
        return new CreateResponse('backend.quizlevels.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizLevelRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizLevelRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizlevels.index'), ['flash_success' => _tr('alerts.backend.quizlevels.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizLevels\QuizLevel  $quizlevel
     * @param  EditQuizLevelRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizLevels\EditResponse
     */
    public function edit(QuizLevel $quizlevel, EditQuizLevelRequest $request)
    {
        return new EditResponse($quizlevel);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizLevelRequestNamespace  $request
     * @param  App\Models\QuizLevels\QuizLevel  $quizlevel
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizLevelRequest $request, QuizLevel $quizlevel)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizlevel, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizlevels.index'), ['flash_success' => _tr('alerts.backend.quizlevels.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizLevelRequestNamespace  $request
     * @param  App\Models\QuizLevels\QuizLevel  $quizlevel
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizLevel $quizlevel, DeleteQuizLevelRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizlevel);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizlevels.index'), ['flash_success' => _tr('alerts.backend.quizlevels.deleted')]);
    }
    
}
