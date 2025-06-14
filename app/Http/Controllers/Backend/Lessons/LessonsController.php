<?php

namespace App\Http\Controllers\Backend\Lessons;

use App\Models\Lessons\Lesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Lessons\CreateResponse;
use App\Http\Responses\Backend\Lessons\EditResponse;
use App\Repositories\Backend\Lessons\LessonRepository;
use App\Http\Requests\Backend\Lessons\ManageLessonRequest;
use App\Http\Requests\Backend\Lessons\CreateLessonRequest;
use App\Http\Requests\Backend\Lessons\StoreLessonRequest;
use App\Http\Requests\Backend\Lessons\EditLessonRequest;
use App\Http\Requests\Backend\Lessons\UpdateLessonRequest;
use App\Http\Requests\Backend\Lessons\DeleteLessonRequest;

/**
 * LessonsController
 */
class LessonsController extends Controller
{
    /**
     * variable to store the repository object
     * @var LessonRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param LessonRepository $repository;
     */
    public function __construct(LessonRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Lessons\ManageLessonRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageLessonRequest $request)
    {
        return new ViewResponse('backend.lessons.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateLessonRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Lessons\CreateResponse
     */
    public function create(CreateLessonRequest $request)
    {
        return new CreateResponse('backend.lessons.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreLessonRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreLessonRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.lessons.index'), ['flash_success' => _tr('alerts.backend.lessons.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Lessons\Lesson  $lesson
     * @param  EditLessonRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Lessons\EditResponse
     */
    public function edit(Lesson $lesson, EditLessonRequest $request)
    {
        return new EditResponse($lesson);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateLessonRequestNamespace  $request
     * @param  App\Models\Lessons\Lesson  $lesson
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $lesson, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.lessons.index'), ['flash_success' => _tr('alerts.backend.lessons.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteLessonRequestNamespace  $request
     * @param  App\Models\Lessons\Lesson  $lesson
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Lesson $lesson, DeleteLessonRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($lesson);
        //returning with successfull message
        return new RedirectResponse(route('admin.lessons.index'), ['flash_success' => _tr('alerts.backend.lessons.deleted')]);
    }
    
}
