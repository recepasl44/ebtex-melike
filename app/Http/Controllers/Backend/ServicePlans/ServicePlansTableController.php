<?php

namespace App\Http\Controllers\Backend\ServicePlans;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ServicePlans\ServicePlanRepository;
use App\Http\Requests\Backend\ServicePlans\ManageServicePlanRequest;

/**
 * Class ServicePlansTableController.
 */
class ServicePlansTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServicePlanRepository
     */
    protected $serviceplan;

    /**
     * contructor to initialize repository object
     * @param ServicePlanRepository $serviceplan;
     */
    public function __construct(ServicePlanRepository $serviceplan)
    {
        $this->serviceplan = $serviceplan;
    }

    /**
     * This method return the data of the model
     * @param ManageServicePlanRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageServicePlanRequest $request)
    {
        return Datatables::of($this->serviceplan->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($serviceplan) {
                return Carbon::parse($serviceplan->created_at)->toDateString();
            })
            ->addColumn('actions', function ($serviceplan) {
                return $serviceplan->action_buttons;
            })
            ->make(true);
    }
}
