<?php

namespace App\Http\Controllers\Backend\QuizBranches;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizBranches\QuizBrancheRepository;
use App\Http\Requests\Backend\QuizBranches\ManageQuizBrancheRequest;

/**
 * Class QuizBranchesTableController.
 */
class QuizBranchesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizBrancheRepository
     */
    protected $quizbtanche;

    /**
     * contructor to initialize repository object
     * @param QuizBrancheRepository $quizbtanche;
     */
    public function __construct(QuizBrancheRepository $quizbtanche)
    {
        $this->quizbtanche = $quizbtanche;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizBrancheRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizBrancheRequest $request)
    {
        return Datatables::of($this->quizbtanche->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizbtanche) {
                return Carbon::parse($quizbtanche->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizbtanche) {
                return $quizbtanche->action_buttons;
            })
            ->make(true);
    }
}
