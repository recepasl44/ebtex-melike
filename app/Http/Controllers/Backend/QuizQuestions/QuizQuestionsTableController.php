<?php

namespace App\Http\Controllers\Backend\QuizQuestions;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizQuestions\QuizQuestionRepository;
use App\Http\Requests\Backend\QuizQuestions\ManageQuizQuestionRequest;

/**
 * Class QuizQuestionsTableController.
 */
class QuizQuestionsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizQuestionRepository
     */
    protected $quizquestion;

    /**
     * contructor to initialize repository object
     * @param QuizQuestionRepository $quizquestion;
     */
    public function __construct(QuizQuestionRepository $quizquestion)
    {
        $this->quizquestion = $quizquestion;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizQuestionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizQuestionRequest $request)
    {
        return Datatables::of($this->quizquestion->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizquestion) {
                return Carbon::parse($quizquestion->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizquestion) {
                return $quizquestion->action_buttons;
            })
            ->make(true);
    }
}
