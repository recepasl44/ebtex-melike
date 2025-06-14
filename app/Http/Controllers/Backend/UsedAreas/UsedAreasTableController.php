<?php

namespace App\Http\Controllers\Backend\UsedAreas;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\UsedAreas\UsedAreaRepository;
use App\Http\Requests\Backend\UsedAreas\ManageUsedAreaRequest;

/**
 * Class UsedAreasTableController.
 */
class UsedAreasTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var UsedAreaRepository
     */
    protected $usedarea;

    /**
     * contructor to initialize repository object
     * @param UsedAreaRepository $usedarea;
     */
    public function __construct(UsedAreaRepository $usedarea)
    {
        $this->usedarea = $usedarea;
    }

    /**
     * This method return the data of the model
     * @param ManageUsedAreaRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageUsedAreaRequest $request)
    {
        return Datatables::of($this->usedarea->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($usedarea) {
                return Carbon::parse($usedarea->created_at)->toDateString();
            })
            ->addColumn('actions', function ($usedarea) {
                return $usedarea->action_buttons;
            })
            ->make(true);
    }
}
