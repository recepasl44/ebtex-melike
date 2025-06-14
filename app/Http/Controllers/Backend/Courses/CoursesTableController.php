<?php

namespace App\Http\Controllers\Backend\Courses;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Courses\CourseRepository;
use App\Http\Requests\Backend\Courses\ManageCourseRequest;

/**
 * Class CoursesTableController.
 */
class CoursesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var CourseRepository
     */
    protected $course;

    /**
     * contructor to initialize repository object
     * @param CourseRepository $course;
     */
    public function __construct(CourseRepository $course)
    {
        $this->course = $course;
    }

    /**
     * This method return the data of the model
     * @param ManageCourseRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageCourseRequest $request)
    {
        return Datatables::of($this->course->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('level', function ($course) {
                return $course?->level?->name;
            })
            ->addColumn('created_at', function ($course) {
                return Carbon::parse($course->created_at)->toDateString();
            })
            ->addColumn('actions', function ($course) {
                return $course->action_buttons;
            })
            ->make(true);
    }
}
