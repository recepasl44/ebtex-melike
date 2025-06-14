<?php

namespace App\Http\Controllers\Backend\QuizTimes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizTimes\QuizTimeRepository;
use App\Http\Requests\Backend\QuizTimes\ManageQuizTimeRequest;

/**
 * Class QuizTimesTableController.
 */
class QuizTimesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizTimeRepository
     */
    protected $quiztime;

    /**
     * contructor to initialize repository object
     * @param QuizTimeRepository $quiztime;
     */
    public function __construct(QuizTimeRepository $quiztime)
    {
        $this->quiztime = $quiztime;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizTimeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizTimeRequest $request)
    {
        return Datatables::of($this->quiztime->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quiztime) {
                return Carbon::parse($quiztime->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quiztime) {
                return $quiztime->action_buttons;
            })
            ->make(true);
    }
}
