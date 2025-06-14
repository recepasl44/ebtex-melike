<?php

namespace App\Http\Controllers\Backend\QuizStudents;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizStudents\QuizStudentRepository;
use App\Http\Requests\Backend\QuizStudents\ManageQuizStudentRequest;

/**
 * Class QuizStudentsTableController.
 */
class QuizStudentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizStudentRepository
     */
    protected $quizstudent;

    /**
     * contructor to initialize repository object
     * @param QuizStudentRepository $quizstudent;
     */
    public function __construct(QuizStudentRepository $quizstudent)
    {
        $this->quizstudent = $quizstudent;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizStudentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizStudentRequest $request)
    {
        return Datatables::of($this->quizstudent->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizstudent) {
                return Carbon::parse($quizstudent->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizstudent) {
                return $quizstudent->action_buttons;
            })
            ->make(true);
    }
}
