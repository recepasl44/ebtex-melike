<?php

namespace App\Http\Controllers\Backend\QuizLevels;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizLevels\QuizLevelRepository;
use App\Http\Requests\Backend\QuizLevels\ManageQuizLevelRequest;

/**
 * Class QuizLevelsTableController.
 */
class QuizLevelsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizLevelRepository
     */
    protected $quizlevel;

    /**
     * contructor to initialize repository object
     * @param QuizLevelRepository $quizlevel;
     */
    public function __construct(QuizLevelRepository $quizlevel)
    {
        $this->quizlevel = $quizlevel;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizLevelRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizLevelRequest $request)
    {
        return Datatables::of($this->quizlevel->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizlevel) {
                return Carbon::parse($quizlevel->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizlevel) {
                return $quizlevel->action_buttons;
            })
            ->make(true);
    }
}
