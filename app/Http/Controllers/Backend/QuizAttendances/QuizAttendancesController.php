<?php

namespace App\Http\Controllers\Backend\QuizAttendances;

use App\Models\QuizAttendances\QuizAttendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizAttendances\CreateResponse;
use App\Http\Responses\Backend\QuizAttendances\EditResponse;
use App\Repositories\Backend\QuizAttendances\QuizAttendanceRepository;
use App\Http\Requests\Backend\QuizAttendances\ManageQuizAttendanceRequest;
use App\Http\Requests\Backend\QuizAttendances\CreateQuizAttendanceRequest;
use App\Http\Requests\Backend\QuizAttendances\StoreQuizAttendanceRequest;
use App\Http\Requests\Backend\QuizAttendances\EditQuizAttendanceRequest;
use App\Http\Requests\Backend\QuizAttendances\UpdateQuizAttendanceRequest;
use App\Http\Requests\Backend\QuizAttendances\DeleteQuizAttendanceRequest;

/**
 * QuizAttendancesController
 */
class QuizAttendancesController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizAttendanceRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizAttendanceRepository $repository;
     */
    public function __construct(QuizAttendanceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizAttendances\ManageQuizAttendanceRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizAttendanceRequest $request)
    {
        return new ViewResponse('backend.quizattendances.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizAttendanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizAttendances\CreateResponse
     */
    public function create(CreateQuizAttendanceRequest $request)
    {
        return new CreateResponse('backend.quizattendances.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizAttendanceRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizAttendanceRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizattendances.index'), ['flash_success' => _tr('alerts.backend.quizattendances.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizAttendances\QuizAttendance  $quizattendance
     * @param  EditQuizAttendanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizAttendances\EditResponse
     */
    public function edit(QuizAttendance $quizattendance, EditQuizAttendanceRequest $request)
    {
        return new EditResponse($quizattendance);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizAttendanceRequestNamespace  $request
     * @param  App\Models\QuizAttendances\QuizAttendance  $quizattendance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizAttendanceRequest $request, QuizAttendance $quizattendance)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizattendance, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizattendances.index'), ['flash_success' => _tr('alerts.backend.quizattendances.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizAttendanceRequestNamespace  $request
     * @param  App\Models\QuizAttendances\QuizAttendance  $quizattendance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizAttendance $quizattendance, DeleteQuizAttendanceRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizattendance);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizattendances.index'), ['flash_success' => _tr('alerts.backend.quizattendances.deleted')]);
    }
    
}
