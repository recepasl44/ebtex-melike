<?php

namespace App\Http\Controllers\Backend\ContractEmployees;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ContractEmployees\ContractEmployeeRepository;
use App\Http\Requests\Backend\ContractEmployees\ManageContractEmployeeRequest;

/**
 * Class ContractEmployeesTableController.
 */
class ContractEmployeesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ContractEmployeeRepository
     */
    protected $contractemployee;

    /**
     * contructor to initialize repository object
     * @param ContractEmployeeRepository $contractemployee;
     */
    public function __construct(ContractEmployeeRepository $contractemployee)
    {
        $this->contractemployee = $contractemployee;
    }

    /**
     * This method return the data of the model
     * @param ManageContractEmployeeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageContractEmployeeRequest $request)
    {
        return Datatables::of($this->contractemployee->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($contractemployee) {
                return Carbon::parse($contractemployee->created_at)->toDateString();
            })
            ->addColumn('actions', function ($contractemployee) {
                return $contractemployee->action_buttons;
            })
            ->make(true);
    }
}
