<?php

namespace App\Http\Controllers\Backend\AttendanceDays;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\AttendanceDays\AttendanceDayRepository;
use App\Http\Requests\Backend\AttendanceDays\ManageAttendanceDayRequest;

/**
 * Class AttendanceDaysTableController.
 */
class AttendanceDaysTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AttendanceDayRepository
     */
    protected $attendanceday;

    /**
     * contructor to initialize repository object
     * @param AttendanceDayRepository $attendanceday;
     */
    public function __construct(AttendanceDayRepository $attendanceday)
    {
        $this->attendanceday = $attendanceday;
    }

    /**
     * This method return the data of the model
     * @param ManageAttendanceDayRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAttendanceDayRequest $request)
    {
        return Datatables::of($this->attendanceday->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($attendanceday) {
                return Carbon::parse($attendanceday->created_at)->toDateString();
            })
            ->addColumn('actions', function ($attendanceday) {
                return $attendanceday->action_buttons;
            })
            ->make(true);
    }
}
