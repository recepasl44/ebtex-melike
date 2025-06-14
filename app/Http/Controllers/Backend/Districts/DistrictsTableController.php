<?php

namespace App\Http\Controllers\Backend\Districts;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Districts\DistrictRepository;
use App\Http\Requests\Backend\Districts\ManageDistrictRequest;

/**
 * Class DistrictsTableController.
 */
class DistrictsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var DistrictRepository
     */
    protected $district;

    /**
     * contructor to initialize repository object
     * @param DistrictRepository $district;
     */
    public function __construct(DistrictRepository $district)
    {
        $this->district = $district;
    }

    /**
     * This method return the data of the model
     * @param ManageDistrictRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageDistrictRequest $request)
    {
        $data = $this->district->getForDataTable();
        if(request()->has('county_id') && !empty(request()->get('county_id'))){
            $data->where('county_id', request('county_id'));
        }
        return Datatables::of($data)
            ->escapeColumns(['id'])
            ->addColumn('county', function ($district) {
                return $district?->county?->name;
            })
            ->addColumn('created_at', function ($district) {
                return Carbon::parse($district->created_at)->toDateString();
            })
            ->addColumn('actions', function ($district) {
                return $district->action_buttons;
            })
            ->make(true);
    }
}
