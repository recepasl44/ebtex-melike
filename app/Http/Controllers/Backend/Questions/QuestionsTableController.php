<?php

namespace App\Http\Controllers\Backend\Questions;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Questions\QuestionRepository;
use App\Http\Requests\Backend\Questions\ManageQuestionRequest;

/**
 * Class QuestionsTableController.
 */
class QuestionsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionRepository
     */
    protected $question;

    /**
     * contructor to initialize repository object
     * @param QuestionRepository $question;
     */
    public function __construct(QuestionRepository $question)
    {
        $this->question = $question;
    }

    /**
     * This method return the data of the model
     * @param ManageQuestionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuestionRequest $request)
    {
        return Datatables::of($this->question->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($question) {
                return Carbon::parse($question->created_at)->toDateString();
            })
            ->addColumn('actions', function ($question) {
                return $question->action_buttons;
            })
            ->make(true);
    }
}
