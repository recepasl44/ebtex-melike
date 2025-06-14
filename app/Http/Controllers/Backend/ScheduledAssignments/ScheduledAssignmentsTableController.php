<?php

namespace App\Http\Controllers\Backend\ScheduledAssignments;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ScheduledAssignments\ScheduledAssignmentRepository;
use App\Http\Requests\Backend\ScheduledAssignments\ManageScheduledAssignmentRequest;

/**
 * Class ScheduledAssignmentsTableController.
 */
class ScheduledAssignmentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScheduledAssignmentRepository
     */
    protected $scheduledassignment;

    /**
     * contructor to initialize repository object
     * @param ScheduledAssignmentRepository $scheduledassignment;
     */
    public function __construct(ScheduledAssignmentRepository $scheduledassignment)
    {
        $this->scheduledassignment = $scheduledassignment;
    }

    /**
     * This method return the data of the model
     * @param ManageScheduledAssignmentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageScheduledAssignmentRequest $request)
    {
        return Datatables::of($this->scheduledassignment->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($scheduledassignment) {
                return Carbon::parse($scheduledassignment->created_at)->toDateString();
            })
            ->addColumn('actions', function ($scheduledassignment) {
                return $scheduledassignment->action_buttons;
            })
            ->make(true);
    }
}
