<?php

namespace App\Http\Controllers\Backend\Units;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Units\UnitRepository;
use App\Http\Requests\Backend\Units\ManageUnitRequest;

/**
 * Class UnitsTableController.
 */
class UnitsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var UnitRepository
     */
    protected $unit;

    /**
     * contructor to initialize repository object
     * @param UnitRepository $unit;
     */
    public function __construct(UnitRepository $unit)
    {
        $this->unit = $unit;
    }

    /**
     * This method return the data of the model
     * @param ManageUnitRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageUnitRequest $request)
    {
        return Datatables::of($this->unit->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($unit) {
                return Carbon::parse($unit->created_at)->toDateString();
            })
            ->addColumn('actions', function ($unit) {
                return $unit->action_buttons;
            })
            ->make(true);
    }
}
