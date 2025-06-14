<?php

namespace App\Http\Controllers\Backend\Guidances;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Guidances\GuidanceRepository;
use App\Http\Requests\Backend\Guidances\ManageGuidanceRequest;

/**
 * Class GuidancesTableController.
 */
class GuidancesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var GuidanceRepository
     */
    protected $guidance;

    /**
     * contructor to initialize repository object
     * @param GuidanceRepository $guidance;
     */
    public function __construct(GuidanceRepository $guidance)
    {
        $this->guidance = $guidance;
    }

    /**
     * This method return the data of the model
     * @param ManageGuidanceRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageGuidanceRequest $request)
    {
        return Datatables::of($this->guidance->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($guidance) {
                return Carbon::parse($guidance->created_at)->toDateString();
            })
            ->addColumn('actions', function ($guidance) {
                return $guidance->action_buttons;
            })
            ->make(true);
    }
}
