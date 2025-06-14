<?php

namespace App\Http\Controllers\Backend\EducationStatuses;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\EducationStatuses\EducationStatusRepository;
use App\Http\Requests\Backend\EducationStatuses\ManageEducationStatusRequest;

/**
 * Class EducationStatusesTableController.
 */
class EducationStatusesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var EducationStatusRepository
     */
    protected $educationstatus;

    /**
     * contructor to initialize repository object
     * @param EducationStatusRepository $educationstatus;
     */
    public function __construct(EducationStatusRepository $educationstatus)
    {
        $this->educationstatus = $educationstatus;
    }

    /**
     * This method return the data of the model
     * @param ManageEducationStatusRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageEducationStatusRequest $request)
    {
        return Datatables::of($this->educationstatus->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($educationstatus) {
                return Carbon::parse($educationstatus->created_at)->toDateString();
            })
            ->addColumn('actions', function ($educationstatus) {
                return $educationstatus->action_buttons;
            })
            ->make(true);
    }
}
