<?php

namespace App\Http\Controllers\Backend\Quizzes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Quizzes\QuizRepository;
use App\Http\Requests\Backend\Quizzes\ManageQuizRequest;

/**
 * Class QuizzesTableController.
 */
class QuizzesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizRepository
     */
    protected $quiz;

    /**
     * contructor to initialize repository object
     * @param QuizRepository $quiz;
     */
    public function __construct(QuizRepository $quiz)
    {
        $this->quiz = $quiz;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizRequest $request)
    {
        return Datatables::of($this->quiz->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quiz) {
                return Carbon::parse($quiz->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quiz) {
                return $quiz->action_buttons;
            })
            ->make(true);
    }
}
