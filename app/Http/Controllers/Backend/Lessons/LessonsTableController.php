<?php

namespace App\Http\Controllers\Backend\Lessons;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Lessons\LessonRepository;
use App\Http\Requests\Backend\Lessons\ManageLessonRequest;

/**
 * Class LessonsTableController.
 */
class LessonsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var LessonRepository
     */
    protected $lesson;

    /**
     * contructor to initialize repository object
     * @param LessonRepository $lesson;
     */
    public function __construct(LessonRepository $lesson)
    {
        $this->lesson = $lesson;
    }

    /**
     * This method return the data of the model
     * @param ManageLessonRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageLessonRequest $request)
    {
        return Datatables::of($this->lesson->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($lesson) {
                return Carbon::parse($lesson->created_at)->toDateString();
            })
            ->addColumn('actions', function ($lesson) {
                return $lesson->action_buttons;
            })
            ->make(true);
    }
}
