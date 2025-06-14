<?php

namespace App\Http\Controllers\Backend\PointTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\PointTypes\PointTypeRepository;
use App\Http\Requests\Backend\PointTypes\ManagePointTypeRequest;

/**
 * Class PointTypesTableController.
 */
class PointTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var PointTypeRepository
     */
    protected $pointtype;

    /**
     * contructor to initialize repository object
     * @param PointTypeRepository $pointtype;
     */
    public function __construct(PointTypeRepository $pointtype)
    {
        $this->pointtype = $pointtype;
    }

    /**
     * This method return the data of the model
     * @param ManagePointTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManagePointTypeRequest $request)
    {
        return Datatables::of($this->pointtype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($pointtype) {
                return Carbon::parse($pointtype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($pointtype) {
                return $pointtype->action_buttons;
            })
            ->make(true);
    }
}
