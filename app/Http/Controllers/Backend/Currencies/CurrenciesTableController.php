<?php

namespace App\Http\Controllers\Backend\Currencies;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Currencies\CurrencyRepository;
use App\Http\Requests\Backend\Currencies\ManageCurrencyRequest;

/**
 * Class CurrenciesTableController.
 */
class CurrenciesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var CurrencyRepository
     */
    protected $currency;

    /**
     * contructor to initialize repository object
     * @param CurrencyRepository $currency;
     */
    public function __construct(CurrencyRepository $currency)
    {
        $this->currency = $currency;
    }

    /**
     * This method return the data of the model
     * @param ManageCurrencyRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageCurrencyRequest $request)
    {
        return Datatables::of($this->currency->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($currency) {
                return Carbon::parse($currency->created_at)->toDateString();
            })
            ->addColumn('actions', function ($currency) {
                return $currency->action_buttons;
            })
            ->make(true);
    }
}
