<?php

namespace App\Http\Controllers\Backend\QuizStudents;

use App\Models\QuizStudents\QuizStudent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizStudents\CreateResponse;
use App\Http\Responses\Backend\QuizStudents\EditResponse;
use App\Repositories\Backend\QuizStudents\QuizStudentRepository;
use App\Http\Requests\Backend\QuizStudents\ManageQuizStudentRequest;
use App\Http\Requests\Backend\QuizStudents\CreateQuizStudentRequest;
use App\Http\Requests\Backend\QuizStudents\StoreQuizStudentRequest;
use App\Http\Requests\Backend\QuizStudents\EditQuizStudentRequest;
use App\Http\Requests\Backend\QuizStudents\UpdateQuizStudentRequest;
use App\Http\Requests\Backend\QuizStudents\DeleteQuizStudentRequest;

/**
 * QuizStudentsController
 */
class QuizStudentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizStudentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizStudentRepository $repository;
     */
    public function __construct(QuizStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizStudents\ManageQuizStudentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizStudentRequest $request)
    {
        return new ViewResponse('backend.quizstudents.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizStudents\CreateResponse
     */
    public function create(CreateQuizStudentRequest $request)
    {
        return new CreateResponse('backend.quizstudents.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizStudentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizStudentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizstudents.index'), ['flash_success' => _tr('alerts.backend.quizstudents.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizStudents\QuizStudent  $quizstudent
     * @param  EditQuizStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizStudents\EditResponse
     */
    public function edit(QuizStudent $quizstudent, EditQuizStudentRequest $request)
    {
        return new EditResponse($quizstudent);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizStudentRequestNamespace  $request
     * @param  App\Models\QuizStudents\QuizStudent  $quizstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizStudentRequest $request, QuizStudent $quizstudent)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizstudent, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizstudents.index'), ['flash_success' => _tr('alerts.backend.quizstudents.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizStudentRequestNamespace  $request
     * @param  App\Models\QuizStudents\QuizStudent  $quizstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizStudent $quizstudent, DeleteQuizStudentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizstudent);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizstudents.index'), ['flash_success' => _tr('alerts.backend.quizstudents.deleted')]);
    }
    
}
