<?php

namespace App\Http\Controllers\Backend\EmployeeAcademics;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\EmployeeAcademics\EmployeeAcademicRepository;
use App\Http\Requests\Backend\EmployeeAcademics\ManageEmployeeAcademicRequest;

/**
 * Class EmployeeAcademicsTableController.
 */
class EmployeeAcademicsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var EmployeeAcademicRepository
     */
    protected $employeeacademic;

    /**
     * contructor to initialize repository object
     * @param EmployeeAcademicRepository $employeeacademic;
     */
    public function __construct(EmployeeAcademicRepository $employeeacademic)
    {
        $this->employeeacademic = $employeeacademic;
    }

    /**
     * This method return the data of the model
     * @param ManageEmployeeAcademicRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageEmployeeAcademicRequest $request)
    {
        return Datatables::of($this->employeeacademic->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($employeeacademic) {
                return Carbon::parse($employeeacademic->created_at)->toDateString();
            })
            ->addColumn('actions', function ($employeeacademic) {
                return $employeeacademic->action_buttons;
            })
            ->make(true);
    }
}
