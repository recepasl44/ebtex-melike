<?php

namespace App\Http\Controllers\Backend\QuizCurriculums;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizCurriculums\QuizCurriculumRepository;
use App\Http\Requests\Backend\QuizCurriculums\ManageQuizCurriculumRequest;

/**
 * Class QuizCurriculumsTableController.
 */
class QuizCurriculumsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizCurriculumRepository
     */
    protected $quizcurriculum;

    /**
     * contructor to initialize repository object
     * @param QuizCurriculumRepository $quizcurriculum;
     */
    public function __construct(QuizCurriculumRepository $quizcurriculum)
    {
        $this->quizcurriculum = $quizcurriculum;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizCurriculumRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizCurriculumRequest $request)
    {
        return Datatables::of($this->quizcurriculum->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizcurriculum) {
                return Carbon::parse($quizcurriculum->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizcurriculum) {
                return $quizcurriculum->action_buttons;
            })
            ->make(true);
    }
}
