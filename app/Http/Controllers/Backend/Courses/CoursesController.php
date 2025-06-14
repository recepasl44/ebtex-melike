<?php

namespace App\Http\Controllers\Backend\Courses;

use App\Models\Courses\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Courses\CreateResponse;
use App\Http\Responses\Backend\Courses\EditResponse;
use App\Repositories\Backend\Courses\CourseRepository;
use App\Http\Requests\Backend\Courses\ManageCourseRequest;
use App\Http\Requests\Backend\Courses\CreateCourseRequest;
use App\Http\Requests\Backend\Courses\StoreCourseRequest;
use App\Http\Requests\Backend\Courses\EditCourseRequest;
use App\Http\Requests\Backend\Courses\UpdateCourseRequest;
use App\Http\Requests\Backend\Courses\DeleteCourseRequest;

/**
 * CoursesController
 */
class CoursesController extends Controller
{
    /**
     * variable to store the repository object
     * @var CourseRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param CourseRepository $repository;
     */
    public function __construct(CourseRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Courses\ManageCourseRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageCourseRequest $request)
    {
        return new ViewResponse('backend.courses.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateCourseRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Courses\CreateResponse
     */
    public function create(CreateCourseRequest $request)
    {
        return new CreateResponse('backend.courses.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCourseRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreCourseRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.courses.index'), ['flash_success' => _tr('alerts.backend.courses.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Courses\Course  $course
     * @param  EditCourseRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Courses\EditResponse
     */
    public function edit(Course $course, EditCourseRequest $request)
    {
        return new EditResponse($course);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCourseRequestNamespace  $request
     * @param  App\Models\Courses\Course  $course
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $course, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.courses.index'), ['flash_success' => _tr('alerts.backend.courses.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteCourseRequestNamespace  $request
     * @param  App\Models\Courses\Course  $course
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Course $course, DeleteCourseRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($course);
        //returning with successfull message
        return new RedirectResponse(route('admin.courses.index'), ['flash_success' => _tr('alerts.backend.courses.deleted')]);
    }
    
}
