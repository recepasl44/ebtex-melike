<?php

namespace App\Http\Controllers\Backend\Neighborhoods;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Neighborhoods\NeighborhoodRepository;
use App\Http\Requests\Backend\Neighborhoods\ManageNeighborhoodRequest;

/**
 * Class NeighborhoodsTableController.
 */
class NeighborhoodsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var NeighborhoodRepository
     */
    protected $neighborhood;

    /**
     * contructor to initialize repository object
     * @param NeighborhoodRepository $neighborhood;
     */
    public function __construct(NeighborhoodRepository $neighborhood)
    {
        $this->neighborhood = $neighborhood;
    }

    /**
     * This method return the data of the model
     * @param ManageNeighborhoodRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageNeighborhoodRequest $request)
    {
        $data = $this->neighborhood->getForDataTable();
        if(request()->has('district_id') && !empty(request()->get('district_id'))){
            $data->where('district_id', request('district_id'));
        }
        return Datatables::of($data)
            ->escapeColumns(['id'])
            ->addColumn('district', function ($neighborhood) {
                return $neighborhood?->district?->name;
            })
            ->addColumn('created_at', function ($neighborhood) {
                return Carbon::parse($neighborhood->created_at)->toDateString();
            })
            ->addColumn('actions', function ($neighborhood) {
                return $neighborhood->action_buttons;
            })
            ->make(true);
    }
}
