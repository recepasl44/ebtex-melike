<?php

namespace App\Http\Controllers\Backend\ScholarshipApplications;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ScholarshipApplications\ScholarshipApplicationRepository;
use App\Http\Requests\Backend\ScholarshipApplications\ManageScholarshipApplicationRequest;

/**
 * Class ScholarshipApplicationsTableController.
 */
class ScholarshipApplicationsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScholarshipApplicationRepository
     */
    protected $scholarshipapplication;

    /**
     * contructor to initialize repository object
     * @param ScholarshipApplicationRepository $scholarshipapplication;
     */
    public function __construct(ScholarshipApplicationRepository $scholarshipapplication)
    {
        $this->scholarshipapplication = $scholarshipapplication;
    }

    /**
     * This method return the data of the model
     * @param ManageScholarshipApplicationRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageScholarshipApplicationRequest $request)
    {
        return Datatables::of($this->scholarshipapplication->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($scholarshipapplication) {
                return Carbon::parse($scholarshipapplication->created_at)->toDateString();
            })
            ->addColumn('actions', function ($scholarshipapplication) {
                return $scholarshipapplication->action_buttons;
            })
            ->make(true);
    }
}
