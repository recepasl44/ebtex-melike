<?php

namespace App\Http\Controllers\Backend\ServiceStudents;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ServiceStudents\ServiceStudentRepository;
use App\Http\Requests\Backend\ServiceStudents\ManageServiceStudentRequest;

/**
 * Class ServiceStudentsTableController.
 */
class ServiceStudentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServiceStudentRepository
     */
    protected $servicestudent;

    /**
     * contructor to initialize repository object
     * @param ServiceStudentRepository $servicestudent;
     */
    public function __construct(ServiceStudentRepository $servicestudent)
    {
        $this->servicestudent = $servicestudent;
    }

    /**
     * This method return the data of the model
     * @param ManageServiceStudentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageServiceStudentRequest $request)
    {
        return Datatables::of($this->servicestudent->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($servicestudent) {
                return Carbon::parse($servicestudent->created_at)->toDateString();
            })
            ->addColumn('actions', function ($servicestudent) {
                return $servicestudent->action_buttons;
            })
            ->make(true);
    }
}
