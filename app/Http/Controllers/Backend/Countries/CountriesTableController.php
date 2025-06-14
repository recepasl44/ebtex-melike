<?php

namespace App\Http\Controllers\Backend\Countries;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Countries\CountryRepository;
use App\Http\Requests\Backend\Countries\ManageCountryRequest;

/**
 * Class CountriesTableController.
 */
class CountriesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var CountryRepository
     */
    protected $country;

    /**
     * contructor to initialize repository object
     * @param CountryRepository $country;
     */
    public function __construct(CountryRepository $country)
    {
        $this->country = $country;
    }

    /**
     * This method return the data of the model
     * @param ManageCountryRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageCountryRequest $request)
    {
        return Datatables::of($this->country->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($country) {
                return Carbon::parseToDate($country->created_at);
            })
            ->addColumn('actions', function ($country) {
                return $country->action_buttons;
            })
            ->make(true);
    }
}
