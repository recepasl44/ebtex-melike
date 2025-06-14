<?php

namespace App\Http\Controllers\Backend\PaymentStatuses;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\PaymentStatuses\PaymentStatusRepository;
use App\Http\Requests\Backend\PaymentStatuses\ManagePaymentStatusRequest;

/**
 * Class PaymentStatusesTableController.
 */
class PaymentStatusesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var PaymentStatusRepository
     */
    protected $paymentstatus;

    /**
     * contructor to initialize repository object
     * @param PaymentStatusRepository $paymentstatus;
     */
    public function __construct(PaymentStatusRepository $paymentstatus)
    {
        $this->paymentstatus = $paymentstatus;
    }

    /**
     * This method return the data of the model
     * @param ManagePaymentStatusRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManagePaymentStatusRequest $request)
    {
        return Datatables::of($this->paymentstatus->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($paymentstatus) {
                return Carbon::parse($paymentstatus->created_at)->toDateString();
            })
            ->addColumn('actions', function ($paymentstatus) {
                return $paymentstatus->action_buttons;
            })
            ->make(true);
    }
}
