<?php

namespace App\Http\Controllers\Backend\AttendanceStudents;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\AttendanceStudents\AttendanceStudentRepository;
use App\Http\Requests\Backend\AttendanceStudents\ManageAttendanceStudentRequest;

/**
 * Class AttendanceStudentsTableController.
 */
class AttendanceStudentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AttendanceStudentRepository
     */
    protected $attendancestudent;

    /**
     * contructor to initialize repository object
     * @param AttendanceStudentRepository $attendancestudent;
     */
    public function __construct(AttendanceStudentRepository $attendancestudent)
    {
        $this->attendancestudent = $attendancestudent;
    }

    /**
     * This method return the data of the model
     * @param ManageAttendanceStudentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAttendanceStudentRequest $request)
    {
        return Datatables::of($this->attendancestudent->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($attendancestudent) {
                return Carbon::parse($attendancestudent->created_at)->toDateString();
            })
            ->addColumn('actions', function ($attendancestudent) {
                return $attendancestudent->action_buttons;
            })
            ->make(true);
    }
}
