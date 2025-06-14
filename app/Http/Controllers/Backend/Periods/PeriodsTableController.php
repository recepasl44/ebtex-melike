<?php

namespace App\Http\Controllers\Backend\Periods;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Periods\PeriodRepository;
use App\Http\Requests\Backend\Periods\ManagePeriodRequest;

/**
 * Class PeriodsTableController.
 */
class PeriodsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var PeriodRepository
     */
    protected $period;

    /**
     * contructor to initialize repository object
     * @param PeriodRepository $period;
     */
    public function __construct(PeriodRepository $period)
    {
        $this->period = $period;
    }

    /**
     * This method return the data of the model
     * @param ManagePeriodRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManagePeriodRequest $request)
    {
        return Datatables::of($this->period->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($period) {
                return Carbon::parse($period->created_at)->toDateString();
            })
            ->addColumn('actions', function ($period) {
                return $period->action_buttons;
            })
            ->make(true);
    }
}
