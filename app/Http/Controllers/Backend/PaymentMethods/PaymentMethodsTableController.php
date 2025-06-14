<?php

namespace App\Http\Controllers\Backend\PaymentMethods;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\PaymentMethods\PaymentMethodRepository;
use App\Http\Requests\Backend\PaymentMethods\ManagePaymentMethodRequest;

/**
 * Class PaymentMethodsTableController.
 */
class PaymentMethodsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var PaymentMethodRepository
     */
    protected $paymentmethod;

    /**
     * contructor to initialize repository object
     * @param PaymentMethodRepository $paymentmethod;
     */
    public function __construct(PaymentMethodRepository $paymentmethod)
    {
        $this->paymentmethod = $paymentmethod;
    }

    /**
     * This method return the data of the model
     * @param ManagePaymentMethodRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManagePaymentMethodRequest $request)
    {
        return Datatables::of($this->paymentmethod->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($paymentmethod) {
                return Carbon::parse($paymentmethod->created_at)->toDateString();
            })
            ->addColumn('actions', function ($paymentmethod) {
                return $paymentmethod->action_buttons;
            })
            ->make(true);
    }
}
