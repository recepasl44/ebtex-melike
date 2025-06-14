<?php

namespace App\Http\Controllers\Backend\ScolarshipAssigns;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ScolarshipAssigns\ScolarshipAssignRepository;
use App\Http\Requests\Backend\ScolarshipAssigns\ManageScolarshipAssignRequest;

/**
 * Class ScolarshipAssignsTableController.
 */
class ScolarshipAssignsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScolarshipAssignRepository
     */
    protected $scolarshipassign;

    /**
     * contructor to initialize repository object
     * @param ScolarshipAssignRepository $scolarshipassign;
     */
    public function __construct(ScolarshipAssignRepository $scolarshipassign)
    {
        $this->scolarshipassign = $scolarshipassign;
    }

    /**
     * This method return the data of the model
     * @param ManageScolarshipAssignRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageScolarshipAssignRequest $request)
    {
        return Datatables::of($this->scolarshipassign->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($scolarshipassign) {
                return Carbon::parse($scolarshipassign->created_at)->toDateString();
            })
            ->addColumn('actions', function ($scolarshipassign) {
                return $scolarshipassign->action_buttons;
            })
            ->make(true);
    }
}
