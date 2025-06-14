<?php

namespace App\Http\Controllers\Backend\QuizResults;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizResults\QuizResultRepository;
use App\Http\Requests\Backend\QuizResults\ManageQuizResultRequest;

/**
 * Class QuizResultsTableController.
 */
class QuizResultsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizResultRepository
     */
    protected $quizresult;

    /**
     * contructor to initialize repository object
     * @param QuizResultRepository $quizresult;
     */
    public function __construct(QuizResultRepository $quizresult)
    {
        $this->quizresult = $quizresult;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizResultRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizResultRequest $request)
    {
        return Datatables::of($this->quizresult->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizresult) {
                return Carbon::parse($quizresult->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizresult) {
                return $quizresult->action_buttons;
            })
            ->make(true);
    }
}
