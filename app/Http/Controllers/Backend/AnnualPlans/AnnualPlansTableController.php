<?php

namespace App\Http\Controllers\Backend\AnnualPlans;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\AnnualPlans\AnnualPlanRepository;
use App\Http\Requests\Backend\AnnualPlans\ManageAnnualPlanRequest;

/**
 * Class AnnualPlansTableController.
 */
class AnnualPlansTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AnnualPlanRepository
     */
    protected $annualplan;

    /**
     * contructor to initialize repository object
     * @param AnnualPlanRepository $annualplan;
     */
    public function __construct(AnnualPlanRepository $annualplan)
    {
        $this->annualplan = $annualplan;
    }

    /**
     * This method return the data of the model
     * @param ManageAnnualPlanRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAnnualPlanRequest $request)
    {
        return Datatables::of($this->annualplan->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($annualplan) {
                return Carbon::parse($annualplan->created_at)->toDateString();
            })
            ->addColumn('actions', function ($annualplan) {
                return $annualplan->action_buttons;
            })
            ->make(true);
    }
}
