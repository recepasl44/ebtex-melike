<?php

namespace App\Http\Controllers\Backend\ScholarshipDocuments;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ScholarshipDocuments\ScholarshipDocumentRepository;
use App\Http\Requests\Backend\ScholarshipDocuments\ManageScholarshipDocumentRequest;

/**
 * Class ScholarshipDocumentsTableController.
 */
class ScholarshipDocumentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScholarshipDocumentRepository
     */
    protected $scholarshipdocument;

    /**
     * contructor to initialize repository object
     * @param ScholarshipDocumentRepository $scholarshipdocument;
     */
    public function __construct(ScholarshipDocumentRepository $scholarshipdocument)
    {
        $this->scholarshipdocument = $scholarshipdocument;
    }

    /**
     * This method return the data of the model
     * @param ManageScholarshipDocumentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageScholarshipDocumentRequest $request)
    {
        return Datatables::of($this->scholarshipdocument->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($scholarshipdocument) {
                return Carbon::parse($scholarshipdocument->created_at)->toDateString();
            })
            ->addColumn('actions', function ($scholarshipdocument) {
                return $scholarshipdocument->action_buttons;
            })
            ->make(true);
    }
}
