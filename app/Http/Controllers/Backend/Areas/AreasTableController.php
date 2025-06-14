<?php

namespace App\Http\Controllers\Backend\Areas;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Areas\AreaRepository;
use App\Http\Requests\Backend\Areas\ManageAreaRequest;

/**
 * Class AreasTableController.
 */
class AreasTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AreaRepository
     */
    protected $area;

    /**
     * contructor to initialize repository object
     * @param AreaRepository $area;
     */
    public function __construct(AreaRepository $area)
    {
        $this->area = $area;
    }

    /**
     * This method return the data of the model
     * @param ManageAreaRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAreaRequest $request)
    {
        return Datatables::of($this->area->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($area) {
                return Carbon::parse($area->created_at)->toDateString();
            })
            ->addColumn('actions', function ($area) {
                return $area->action_buttons;
            })
            ->make(true);
    }
}
