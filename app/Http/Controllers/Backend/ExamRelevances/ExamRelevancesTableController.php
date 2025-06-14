<?php

namespace App\Http\Controllers\Backend\ExamRelevances;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ExamRelevances\ExamRelevanceRepository;
use App\Http\Requests\Backend\ExamRelevances\ManageExamRelevanceRequest;

/**
 * Class ExamRelevancesTableController.
 */
class ExamRelevancesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ExamRelevanceRepository
     */
    protected $examrelevance;

    /**
     * contructor to initialize repository object
     * @param ExamRelevanceRepository $examrelevance;
     */
    public function __construct(ExamRelevanceRepository $examrelevance)
    {
        $this->examrelevance = $examrelevance;
    }

    /**
     * This method return the data of the model
     * @param ManageExamRelevanceRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageExamRelevanceRequest $request)
    {
        return Datatables::of($this->examrelevance->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($examrelevance) {
                return Carbon::parse($examrelevance->created_at)->toDateString();
            })
            ->addColumn('actions', function ($examrelevance) {
                return $examrelevance->action_buttons;
            })
            ->make(true);
    }
}
