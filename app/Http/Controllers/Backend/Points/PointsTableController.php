<?php

namespace App\Http\Controllers\Backend\Points;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Points\PointRepository;
use App\Http\Requests\Backend\Points\ManagePointRequest;

/**
 * Class PointsTableController.
 */
class PointsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var PointRepository
     */
    protected $point;

    /**
     * contructor to initialize repository object
     * @param PointRepository $point;
     */
    public function __construct(PointRepository $point)
    {
        $this->point = $point;
    }

    /**
     * This method return the data of the model
     * @param ManagePointRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManagePointRequest $request)
    {
        return Datatables::of($this->point->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($point) {
                return Carbon::parse($point->created_at)->toDateString();
            })
            ->addColumn('actions', function ($point) {
                return $point->action_buttons;
            })
            ->make(true);
    }
}
