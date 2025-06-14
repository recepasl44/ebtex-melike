<?php

namespace App\Http\Controllers\Backend\Answers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Answers\AnswerRepository;
use App\Http\Requests\Backend\Answers\ManageAnswerRequest;

/**
 * Class AnswersTableController.
 */
class AnswersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AnswerRepository
     */
    protected $answer;

    /**
     * contructor to initialize repository object
     * @param AnswerRepository $answer;
     */
    public function __construct(AnswerRepository $answer)
    {
        $this->answer = $answer;
    }

    /**
     * This method return the data of the model
     * @param ManageAnswerRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAnswerRequest $request)
    {
        return Datatables::of($this->answer->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($answer) {
                return Carbon::parse($answer->created_at)->toDateString();
            })
            ->addColumn('actions', function ($answer) {
                return $answer->action_buttons;
            })
            ->make(true);
    }
}
