<?php

namespace App\Http\Controllers\Backend\SmsProviders;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\SmsProviders\SmsProviderRepository;
use App\Http\Requests\Backend\SmsProviders\ManageSmsProviderRequest;

/**
 * Class SmsProvidersTableController.
 */
class SmsProvidersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SmsProviderRepository
     */
    protected $smsprovider;

    /**
     * contructor to initialize repository object
     * @param SmsProviderRepository $smsprovider;
     */
    public function __construct(SmsProviderRepository $smsprovider)
    {
        $this->smsprovider = $smsprovider;
    }

    /**
     * This method return the data of the model
     * @param ManageSmsProviderRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSmsProviderRequest $request)
    {
        return Datatables::of($this->smsprovider->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($smsprovider) {
                return Carbon::parse($smsprovider->created_at)->toDateString();
            })
            ->addColumn('actions', function ($smsprovider) {
                return $smsprovider->action_buttons;
            })
            ->make(true);
    }
}
