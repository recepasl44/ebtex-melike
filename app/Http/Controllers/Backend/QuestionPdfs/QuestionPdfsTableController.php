<?php

namespace App\Http\Controllers\Backend\QuestionPdfs;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuestionPdfs\QuestionPdfRepository;
use App\Http\Requests\Backend\QuestionPdfs\ManageQuestionPdfRequest;

/**
 * Class QuestionPdfsTableController.
 */
class QuestionPdfsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionPdfRepository
     */
    protected $questionpdf;

    /**
     * contructor to initialize repository object
     * @param QuestionPdfRepository $questionpdf;
     */
    public function __construct(QuestionPdfRepository $questionpdf)
    {
        $this->questionpdf = $questionpdf;
    }

    /**
     * This method return the data of the model
     * @param ManageQuestionPdfRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuestionPdfRequest $request)
    {
        return Datatables::of($this->questionpdf->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($questionpdf) {
                return Carbon::parse($questionpdf->created_at)->toDateString();
            })
            ->addColumn('actions', function ($questionpdf) {
                return $questionpdf->action_buttons;
            })
            ->make(true);
    }
}
