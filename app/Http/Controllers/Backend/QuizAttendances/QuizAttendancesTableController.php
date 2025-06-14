<?php

namespace App\Http\Controllers\Backend\QuizAttendances;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizAttendances\QuizAttendanceRepository;
use App\Http\Requests\Backend\QuizAttendances\ManageQuizAttendanceRequest;

/**
 * Class QuizAttendancesTableController.
 */
class QuizAttendancesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizAttendanceRepository
     */
    protected $quizattendance;

    /**
     * contructor to initialize repository object
     * @param QuizAttendanceRepository $quizattendance;
     */
    public function __construct(QuizAttendanceRepository $quizattendance)
    {
        $this->quizattendance = $quizattendance;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizAttendanceRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizAttendanceRequest $request)
    {
        return Datatables::of($this->quizattendance->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizattendance) {
                return Carbon::parse($quizattendance->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizattendance) {
                return $quizattendance->action_buttons;
            })
            ->make(true);
    }
}
