<?php

namespace App\Http\Controllers\Backend\StudentGroups;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\StudentGroups\StudentGroupRepository;
use App\Http\Requests\Backend\StudentGroups\ManageStudentGroupRequest;

/**
 * Class StudentGroupsTableController.
 */
class StudentGroupsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var StudentGroupRepository
     */
    protected $studentgroup;

    /**
     * contructor to initialize repository object
     * @param StudentGroupRepository $studentgroup;
     */
    public function __construct(StudentGroupRepository $studentgroup)
    {
        $this->studentgroup = $studentgroup;
    }

    /**
     * This method return the data of the model
     * @param ManageStudentGroupRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageStudentGroupRequest $request)
    {
        return Datatables::of($this->studentgroup->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($studentgroup) {
                return Carbon::parse($studentgroup->created_at)->toDateString();
            })
            ->addColumn('actions', function ($studentgroup) {
                return $studentgroup->action_buttons;
            })
            ->make(true);
    }
}
