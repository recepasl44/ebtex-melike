<?php

namespace App\Http\Controllers\Backend\QuizApplications;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizApplications\QuizApplicationRepository;
use App\Http\Requests\Backend\QuizApplications\ManageQuizApplicationRequest;

/**
 * Class QuizApplicationsTableController.
 */
class QuizApplicationsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizApplicationRepository
     */
    protected $quizapplication;

    /**
     * contructor to initialize repository object
     * @param QuizApplicationRepository $quizapplication;
     */
    public function __construct(QuizApplicationRepository $quizapplication)
    {
        $this->quizapplication = $quizapplication;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizApplicationRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizApplicationRequest $request)
    {
        return Datatables::of($this->quizapplication->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizapplication) {
                return Carbon::parse($quizapplication->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizapplication) {
                return $quizapplication->action_buttons;
            })
            ->make(true);
    }
}
