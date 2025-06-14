<?php

namespace App\Http\Controllers\Backend\Attendances;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Attendances\AttendanceRepository;
use App\Http\Requests\Backend\Attendances\ManageAttendanceRequest;

/**
 * Class AttendancesTableController.
 */
class AttendancesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AttendanceRepository
     */
    protected $attendance;

    /**
     * contructor to initialize repository object
     * @param AttendanceRepository $attendance;
     */
    public function __construct(AttendanceRepository $attendance)
    {
        $this->attendance = $attendance;
    }

    /**
     * This method return the data of the model
     * @param ManageAttendanceRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAttendanceRequest $request)
    {
        return Datatables::of($this->attendance->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($attendance) {
                return Carbon::parse($attendance->created_at)->toDateString();
            })
            ->addColumn('actions', function ($attendance) {
                return $attendance->action_buttons;
            })
            ->make(true);
    }
}
