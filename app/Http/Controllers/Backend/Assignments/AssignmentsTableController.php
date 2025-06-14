<?php

namespace App\Http\Controllers\Backend\Assignments;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Assignments\AssignmentRepository;
use App\Http\Requests\Backend\Assignments\ManageAssignmentRequest;

/**
 * Class AssignmentsTableController.
 */
class AssignmentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AssignmentRepository
     */
    protected $assignment;

    /**
     * contructor to initialize repository object
     * @param AssignmentRepository $assignment;
     */
    public function __construct(AssignmentRepository $assignment)
    {
        $this->assignment = $assignment;
    }

    /**
     * This method return the data of the model
     * @param ManageAssignmentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAssignmentRequest $request)
    {
        return Datatables::of($this->assignment->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($assignment) {
                return Carbon::parse($assignment->created_at)->toDateString();
            })
            ->addColumn('actions', function ($assignment) {
                return $assignment->action_buttons;
            })
            ->make(true);
    }
}
