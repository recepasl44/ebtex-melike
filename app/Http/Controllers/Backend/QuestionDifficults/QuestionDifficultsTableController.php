<?php

namespace App\Http\Controllers\Backend\QuestionDifficults;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuestionDifficults\QuestionDifficultRepository;
use App\Http\Requests\Backend\QuestionDifficults\ManageQuestionDifficultRequest;

/**
 * Class QuestionDifficultsTableController.
 */
class QuestionDifficultsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionDifficultRepository
     */
    protected $questiondifficult;

    /**
     * contructor to initialize repository object
     * @param QuestionDifficultRepository $questiondifficult;
     */
    public function __construct(QuestionDifficultRepository $questiondifficult)
    {
        $this->questiondifficult = $questiondifficult;
    }

    /**
     * This method return the data of the model
     * @param ManageQuestionDifficultRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuestionDifficultRequest $request)
    {
        return Datatables::of($this->questiondifficult->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($questiondifficult) {
                return Carbon::parse($questiondifficult->created_at)->toDateString();
            })
            ->addColumn('actions', function ($questiondifficult) {
                return $questiondifficult->action_buttons;
            })
            ->make(true);
    }
}
