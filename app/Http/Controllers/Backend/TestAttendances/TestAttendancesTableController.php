<?php

namespace App\Http\Controllers\Backend\TestAttendances;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\TestAttendances\TestAttendanceRepository;
use App\Http\Requests\Backend\TestAttendances\ManageTestAttendanceRequest;

/**
 * Class TestAttendancesTableController.
 */
class TestAttendancesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestAttendanceRepository
     */
    protected $testattendance;

    /**
     * contructor to initialize repository object
     * @param TestAttendanceRepository $testattendance;
     */
    public function __construct(TestAttendanceRepository $testattendance)
    {
        $this->testattendance = $testattendance;
    }

    /**
     * This method return the data of the model
     * @param ManageTestAttendanceRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageTestAttendanceRequest $request)
    {
        return Datatables::of($this->testattendance->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($testattendance) {
                return Carbon::parse($testattendance->created_at)->toDateString();
            })
            ->addColumn('actions', function ($testattendance) {
                return $testattendance->action_buttons;
            })
            ->make(true);
    }
}
