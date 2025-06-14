<?php

namespace App\Http\Controllers\Backend\QuestionTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuestionTypes\QuestionTypeRepository;
use App\Http\Requests\Backend\QuestionTypes\ManageQuestionTypeRequest;

/**
 * Class QuestionTypesTableController.
 */
class QuestionTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionTypeRepository
     */
    protected $questiontype;

    /**
     * contructor to initialize repository object
     * @param QuestionTypeRepository $questiontype;
     */
    public function __construct(QuestionTypeRepository $questiontype)
    {
        $this->questiontype = $questiontype;
    }

    /**
     * This method return the data of the model
     * @param ManageQuestionTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuestionTypeRequest $request)
    {
        return Datatables::of($this->questiontype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($questiontype) {
                return Carbon::parse($questiontype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($questiontype) {
                return $questiontype->action_buttons;
            })
            ->make(true);
    }
}
