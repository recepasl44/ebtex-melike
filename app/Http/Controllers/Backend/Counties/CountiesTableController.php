<?php

namespace App\Http\Controllers\Backend\Counties;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Counties\CountyRepository;
use App\Http\Requests\Backend\Counties\ManageCountyRequest;

/**
 * Class CountiesTableController.
 */
class CountiesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var CountyRepository
     */
    protected $county;

    /**
     * contructor to initialize repository object
     * @param CountyRepository $county;
     */
    public function __construct(CountyRepository $county)
    {
        $this->county = $county;
    }

    /**
     * This method return the data of the model
     * @param ManageCountyRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageCountyRequest $request)
    {
        $data = $this->county->getForDataTable();
        if(request()->has('city_id') && !empty(request()->get('city_id'))){
            $data->where('city_id', request('city_id'));
        }
        return Datatables::of($data)
            ->escapeColumns(['id'])
            ->addColumn('city', function ($county) {
                return $county?->city?->name;
            })
            ->addColumn('created_at', function ($county) {
                return Carbon::parse($county->created_at)->toDateString();
            })
            ->addColumn('actions', function ($county) {
                return $county->action_buttons;
            })
            ->make(true);
    }
}
