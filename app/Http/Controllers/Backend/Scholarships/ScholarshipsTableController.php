<?php

namespace App\Http\Controllers\Backend\Scholarships;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Scholarships\ScholarshipRepository;
use App\Http\Requests\Backend\Scholarships\ManageScholarshipRequest;

/**
 * Class ScholarshipsTableController.
 */
class ScholarshipsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScholarshipRepository
     */
    protected $scholarship;

    /**
     * contructor to initialize repository object
     * @param ScholarshipRepository $scholarship;
     */
    public function __construct(ScholarshipRepository $scholarship)
    {
        $this->scholarship = $scholarship;
    }

    /**
     * This method return the data of the model
     * @param ManageScholarshipRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageScholarshipRequest $request)
    {
        return Datatables::of($this->scholarship->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($scholarship) {
                return Carbon::parse($scholarship->created_at)->toDateString();
            })
            ->addColumn('actions', function ($scholarship) {
                return $scholarship->action_buttons;
            })
            ->make(true);
    }
}
