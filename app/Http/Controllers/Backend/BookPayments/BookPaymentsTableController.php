<?php

namespace App\Http\Controllers\Backend\BookPayments;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\BookPayments\BookPaymentRepository;
use App\Http\Requests\Backend\BookPayments\ManageBookPaymentRequest;

/**
 * Class BookPaymentsTableController.
 */
class BookPaymentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookPaymentRepository
     */
    protected $bookpayment;

    /**
     * contructor to initialize repository object
     * @param BookPaymentRepository $bookpayment;
     */
    public function __construct(BookPaymentRepository $bookpayment)
    {
        $this->bookpayment = $bookpayment;
    }

    /**
     * This method return the data of the model
     * @param ManageBookPaymentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBookPaymentRequest $request)
    {
        return Datatables::of($this->bookpayment->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($bookpayment) {
                return Carbon::parse($bookpayment->created_at)->toDateString();
            })
            ->addColumn('actions', function ($bookpayment) {
                return $bookpayment->action_buttons;
            })
            ->make(true);
    }
}
