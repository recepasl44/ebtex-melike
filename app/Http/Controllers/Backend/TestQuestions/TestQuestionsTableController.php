<?php

namespace App\Http\Controllers\Backend\TestQuestions;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\TestQuestions\TestQuestionRepository;
use App\Http\Requests\Backend\TestQuestions\ManageTestQuestionRequest;

/**
 * Class TestQuestionsTableController.
 */
class TestQuestionsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestQuestionRepository
     */
    protected $testquestion;

    /**
     * contructor to initialize repository object
     * @param TestQuestionRepository $testquestion;
     */
    public function __construct(TestQuestionRepository $testquestion)
    {
        $this->testquestion = $testquestion;
    }

    /**
     * This method return the data of the model
     * @param ManageTestQuestionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageTestQuestionRequest $request)
    {
        return Datatables::of($this->testquestion->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($testquestion) {
                return Carbon::parse($testquestion->created_at)->toDateString();
            })
            ->addColumn('actions', function ($testquestion) {
                return $testquestion->action_buttons;
            })
            ->make(true);
    }
}
