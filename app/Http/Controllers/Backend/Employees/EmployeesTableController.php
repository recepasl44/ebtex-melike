<?php

namespace App\Http\Controllers\Backend\Employees;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Employees\EmployeeRepository;
use App\Http\Requests\Backend\Employees\ManageEmployeeRequest;

/**
 * Class EmployeesTableController.
 */
class EmployeesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var EmployeeRepository
     */
    protected $employee;

    /**
     * contructor to initialize repository object
     * @param EmployeeRepository $employee;
     */
    public function __construct(EmployeeRepository $employee)
    {
        $this->employee = $employee;
    }

    /**
     * This method return the data of the model
     * @param ManageEmployeeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageEmployeeRequest $request)
    {
        return Datatables::of($this->employee->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($employee) {
                return Carbon::parse($employee->created_at)->toDateString();
            })
            ->addColumn('actions', function ($employee) {
                return $employee->action_buttons;
            })
            ->make(true);
    }
}
