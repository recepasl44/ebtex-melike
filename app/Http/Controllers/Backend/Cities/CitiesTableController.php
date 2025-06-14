<?php

namespace App\Http\Controllers\Backend\Cities;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Cities\CityRepository;
use App\Http\Requests\Backend\Cities\ManageCityRequest;

/**
 * Class CitiesTableController.
 */
class CitiesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var CityRepository
     */
    protected $city;

    /**
     * contructor to initialize repository object
     * @param CityRepository $city;
     */
    public function __construct(CityRepository $city)
    {
        $this->city = $city;
    }

    /**
     * This method return the data of the model
     * @param ManageCityRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageCityRequest $request)
    {
        $data = $this->city->getForDataTable();
        if(request()->has('country_id') && !empty(request()->get('country_idt_type_id'))){
            $data->where('country_id', request('country_id'));
        }
        return Datatables::of($data)
            ->escapeColumns(['id'])
            ->addColumn('country', function ($city) {
                return $city->country?$city->country->name:'';
            })
            ->addColumn('created_at', function ($city) {
                return Carbon::parseToDate($city->created_at);
            })
            ->addColumn('actions', function ($city) {
                return $city->action_buttons;
            })
            ->make(true);
    }
}
