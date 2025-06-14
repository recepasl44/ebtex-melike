<?php

namespace App\Http\Controllers\Backend\ServiceStops;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ServiceStops\ServiceStopRepository;
use App\Http\Requests\Backend\ServiceStops\ManageServiceStopRequest;

/**
 * Class ServiceStopsTableController.
 */
class ServiceStopsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServiceStopRepository
     */
    protected $servicestop;

    /**
     * contructor to initialize repository object
     * @param ServiceStopRepository $servicestop;
     */
    public function __construct(ServiceStopRepository $servicestop)
    {
        $this->servicestop = $servicestop;
    }

    /**
     * This method return the data of the model
     * @param ManageServiceStopRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageServiceStopRequest $request)
    {
        return Datatables::of($this->servicestop->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($servicestop) {
                return Carbon::parse($servicestop->created_at)->toDateString();
            })
            ->addColumn('actions', function ($servicestop) {
                return $servicestop->action_buttons;
            })
            ->make(true);
    }
}
