<?php

namespace App\Http\Controllers\Backend\QuizSessions;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizSessions\QuizSessionRepository;
use App\Http\Requests\Backend\QuizSessions\ManageQuizSessionRequest;

/**
 * Class QuizSessionsTableController.
 */
class QuizSessionsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizSessionRepository
     */
    protected $quizsession;

    /**
     * contructor to initialize repository object
     * @param QuizSessionRepository $quizsession;
     */
    public function __construct(QuizSessionRepository $quizsession)
    {
        $this->quizsession = $quizsession;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizSessionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizSessionRequest $request)
    {
        return Datatables::of($this->quizsession->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizsession) {
                return Carbon::parse($quizsession->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizsession) {
                return $quizsession->action_buttons;
            })
            ->make(true);
    }
}
