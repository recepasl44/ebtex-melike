<?php

namespace App\Http\Controllers\Backend\Installments;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Installments\InstallmentRepository;
use App\Http\Requests\Backend\Installments\ManageInstallmentRequest;

/**
 * Class InstallmentsTableController.
 */
class InstallmentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var InstallmentRepository
     */
    protected $installment;

    /**
     * contructor to initialize repository object
     * @param InstallmentRepository $installment;
     */
    public function __construct(InstallmentRepository $installment)
    {
        $this->installment = $installment;
    }

    /**
     * This method return the data of the model
     * @param ManageInstallmentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageInstallmentRequest $request)
    {
        return Datatables::of($this->installment->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($installment) {
                return Carbon::parse($installment->created_at)->toDateString();
            })
            ->addColumn('actions', function ($installment) {
                return $installment->action_buttons;
            })
            ->make(true);
    }
}
