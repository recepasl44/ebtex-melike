<?php

namespace App\Http\Controllers\Backend\Branches;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Branches\BrancheRepository;
use App\Http\Requests\Backend\Branches\ManageBrancheRequest;

/**
 * Class BranchesTableController.
 */
class BranchesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BrancheRepository
     */
    protected $branche;

    /**
     * contructor to initialize repository object
     * @param BrancheRepository $branche;
     */
    public function __construct(BrancheRepository $branche)
    {
        $this->branche = $branche;
    }

    /**
     * This method return the data of the model
     * @param ManageBrancheRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBrancheRequest $request)
    {
        return Datatables::of($this->branche->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_by', function ($branche) {
                return $branche?->createdBy?->name;
            })
            ->addColumn('created_at', function ($branche) {
                return Carbon::parse($branche->created_at)->toDateString();
            })
            ->addColumn('actions', function ($branche) {
                return $branche->action_buttons;
            })
            ->make(true);
    }
}
