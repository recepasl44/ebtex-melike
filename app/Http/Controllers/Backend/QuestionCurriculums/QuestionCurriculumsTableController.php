<?php

namespace App\Http\Controllers\Backend\QuestionCurriculums;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuestionCurriculums\QuestionCurriculumRepository;
use App\Http\Requests\Backend\QuestionCurriculums\ManageQuestionCurriculumRequest;

/**
 * Class QuestionCurriculumsTableController.
 */
class QuestionCurriculumsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionCurriculumRepository
     */
    protected $questioncurriculum;

    /**
     * contructor to initialize repository object
     * @param QuestionCurriculumRepository $questioncurriculum;
     */
    public function __construct(QuestionCurriculumRepository $questioncurriculum)
    {
        $this->questioncurriculum = $questioncurriculum;
    }

    /**
     * This method return the data of the model
     * @param ManageQuestionCurriculumRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuestionCurriculumRequest $request)
    {
        return Datatables::of($this->questioncurriculum->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($questioncurriculum) {
                return Carbon::parse($questioncurriculum->created_at)->toDateString();
            })
            ->addColumn('actions', function ($questioncurriculum) {
                return $questioncurriculum->action_buttons;
            })
            ->make(true);
    }
}
