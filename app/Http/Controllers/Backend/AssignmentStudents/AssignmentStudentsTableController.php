<?php

namespace App\Http\Controllers\Backend\AssignmentStudents;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\AssignmentStudents\AssignmentStudentRepository;
use App\Http\Requests\Backend\AssignmentStudents\ManageAssignmentStudentRequest;

/**
 * Class AssignmentStudentsTableController.
 */
class AssignmentStudentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AssignmentStudentRepository
     */
    protected $assignmentstudent;

    /**
     * contructor to initialize repository object
     * @param AssignmentStudentRepository $assignmentstudent;
     */
    public function __construct(AssignmentStudentRepository $assignmentstudent)
    {
        $this->assignmentstudent = $assignmentstudent;
    }

    /**
     * This method return the data of the model
     * @param ManageAssignmentStudentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAssignmentStudentRequest $request)
    {
        return Datatables::of($this->assignmentstudent->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($assignmentstudent) {
                return Carbon::parse($assignmentstudent->created_at)->toDateString();
            })
            ->addColumn('actions', function ($assignmentstudent) {
                return $assignmentstudent->action_buttons;
            })
            ->make(true);
    }
}
