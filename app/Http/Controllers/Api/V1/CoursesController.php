<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\CourseResource;
use App\Models\Courses\Course;
use App\Repositories\Backend\Courses\CourseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * CoursesController
 */
class CoursesController extends APIController
{
    /**
     * __construct.
     *
     * @var CourseRepository
     * @param $repository
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
     * Return the $course.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return CourseResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Course $course
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Course $course)
    {
        return new CourseResource($course);
    }

    
     /**
      * Creates the Resource for course.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateCourse($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new CourseResource(Course::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update course.
         *
         * @param Course    $course
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Course $course)
    {
        $validation = $this->validateCourse($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($course, $request->all());

        $course = Course::findOrfail($course->id);

        return new CourseResource($course);
    }
    
    /**
     * Delete course.
     *
     * @param Course    $course
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Course $course)
    {
        $this->repository->delete($course);

        return $this->respond([
            'message' => _tr('alerts.backend.course.deleted'),
        ]);
    }
    

    /**
     * validate course.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateCourse(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'level_id' => 'required',
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate course.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
