<?php

namespace App\Http\Controllers\Backend\QuizClassrooms;

use App\Models\QuizClassrooms\QuizClassroom;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizClassrooms\CreateResponse;
use App\Http\Responses\Backend\QuizClassrooms\EditResponse;
use App\Repositories\Backend\QuizClassrooms\QuizClassroomRepository;
use App\Http\Requests\Backend\QuizClassrooms\ManageQuizClassroomRequest;
use App\Http\Requests\Backend\QuizClassrooms\CreateQuizClassroomRequest;
use App\Http\Requests\Backend\QuizClassrooms\StoreQuizClassroomRequest;
use App\Http\Requests\Backend\QuizClassrooms\EditQuizClassroomRequest;
use App\Http\Requests\Backend\QuizClassrooms\UpdateQuizClassroomRequest;
use App\Http\Requests\Backend\QuizClassrooms\DeleteQuizClassroomRequest;

/**
 * QuizClassroomsController
 */
class QuizClassroomsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizClassroomRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizClassroomRepository $repository;
     */
    public function __construct(QuizClassroomRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizClassrooms\ManageQuizClassroomRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizClassroomRequest $request)
    {
        return new ViewResponse('backend.quizclassrooms.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizClassroomRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizClassrooms\CreateResponse
     */
    public function create(CreateQuizClassroomRequest $request)
    {
        return new CreateResponse('backend.quizclassrooms.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizClassroomRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizClassroomRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizclassrooms.index'), ['flash_success' => _tr('alerts.backend.quizclassrooms.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizClassrooms\QuizClassroom  $scholarshipclassroom
     * @param  EditQuizClassroomRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizClassrooms\EditResponse
     */
    public function edit(QuizClassroom $scholarshipclassroom, EditQuizClassroomRequest $request)
    {
        return new EditResponse($scholarshipclassroom);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizClassroomRequestNamespace  $request
     * @param  App\Models\QuizClassrooms\QuizClassroom  $scholarshipclassroom
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizClassroomRequest $request, QuizClassroom $scholarshipclassroom)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $scholarshipclassroom, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizclassrooms.index'), ['flash_success' => _tr('alerts.backend.quizclassrooms.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizClassroomRequestNamespace  $request
     * @param  App\Models\QuizClassrooms\QuizClassroom  $scholarshipclassroom
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizClassroom $scholarshipclassroom, DeleteQuizClassroomRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($scholarshipclassroom);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizclassrooms.index'), ['flash_success' => _tr('alerts.backend.quizclassrooms.deleted')]);
    }
    
}
