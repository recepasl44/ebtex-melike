<?php

namespace App\Http\Controllers\Backend\AttendanceTeachers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\AttendanceTeachers\AttendanceTeacherRepository;
use App\Http\Requests\Backend\AttendanceTeachers\ManageAttendanceTeacherRequest;

/**
 * Class AttendanceTeachersTableController.
 */
class AttendanceTeachersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AttendanceTeacherRepository
     */
    protected $attendanceteacher;

    /**
     * contructor to initialize repository object
     * @param AttendanceTeacherRepository $attendanceteacher;
     */
    public function __construct(AttendanceTeacherRepository $attendanceteacher)
    {
        $this->attendanceteacher = $attendanceteacher;
    }

    /**
     * This method return the data of the model
     * @param ManageAttendanceTeacherRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAttendanceTeacherRequest $request)
    {
        return Datatables::of($this->attendanceteacher->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($attendanceteacher) {
                return Carbon::parse($attendanceteacher->created_at)->toDateString();
            })
            ->addColumn('actions', function ($attendanceteacher) {
                return $attendanceteacher->action_buttons;
            })
            ->make(true);
    }
}
