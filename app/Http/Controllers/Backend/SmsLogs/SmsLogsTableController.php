<?php

namespace App\Http\Controllers\Backend\SmsLogs;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\SmsLogs\SmsLogRepository;
use App\Http\Requests\Backend\SmsLogs\ManageSmsLogRequest;

/**
 * Class SmsLogsTableController.
 */
class SmsLogsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SmsLogRepository
     */
    protected $smslog;

    /**
     * contructor to initialize repository object
     * @param SmsLogRepository $smslog;
     */
    public function __construct(SmsLogRepository $smslog)
    {
        $this->smslog = $smslog;
    }

    /**
     * This method return the data of the model
     * @param ManageSmsLogRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSmsLogRequest $request)
    {
        return Datatables::of($this->smslog->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($smslog) {
                return Carbon::parse($smslog->created_at)->toDateString();
            })
            ->addColumn('actions', function ($smslog) {
                return $smslog->action_buttons;
            })
            ->make(true);
    }
}
