<?php

namespace App\Http\Controllers\Backend\QuizTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizTypes\QuizTypeRepository;
use App\Http\Requests\Backend\QuizTypes\ManageQuizTypeRequest;

/**
 * Class QuizTypesTableController.
 */
class QuizTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizTypeRepository
     */
    protected $quiztype;

    /**
     * contructor to initialize repository object
     * @param QuizTypeRepository $quiztype;
     */
    public function __construct(QuizTypeRepository $quiztype)
    {
        $this->quiztype = $quiztype;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizTypeRequest $request)
    {
        return Datatables::of($this->quiztype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quiztype) {
                return Carbon::parse($quiztype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quiztype) {
                return $quiztype->action_buttons;
            })
            ->make(true);
    }
}
