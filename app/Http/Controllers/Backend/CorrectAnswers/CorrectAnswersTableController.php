<?php

namespace App\Http\Controllers\Backend\CorrectAnswers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\CorrectAnswers\CorrectAnswerRepository;
use App\Http\Requests\Backend\CorrectAnswers\ManageCorrectAnswerRequest;

/**
 * Class CorrectAnswersTableController.
 */
class CorrectAnswersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var CorrectAnswerRepository
     */
    protected $correctanswer;

    /**
     * contructor to initialize repository object
     * @param CorrectAnswerRepository $correctanswer;
     */
    public function __construct(CorrectAnswerRepository $correctanswer)
    {
        $this->correctanswer = $correctanswer;
    }

    /**
     * This method return the data of the model
     * @param ManageCorrectAnswerRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageCorrectAnswerRequest $request)
    {
        return Datatables::of($this->correctanswer->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($correctanswer) {
                return Carbon::parse($correctanswer->created_at)->toDateString();
            })
            ->addColumn('actions', function ($correctanswer) {
                return $correctanswer->action_buttons;
            })
            ->make(true);
    }
}
