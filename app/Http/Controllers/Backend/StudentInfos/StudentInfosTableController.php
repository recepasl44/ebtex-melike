<?php

namespace App\Http\Controllers\Backend\StudentInfos;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\StudentInfos\StudentInfoRepository;
use App\Http\Requests\Backend\StudentInfos\ManageStudentInfoRequest;

/**
 * Class StudentInfosTableController.
 */
class StudentInfosTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var StudentInfoRepository
     */
    protected $studentinfo;

    /**
     * contructor to initialize repository object
     * @param StudentInfoRepository $studentinfo;
     */
    public function __construct(StudentInfoRepository $studentinfo)
    {
        $this->studentinfo = $studentinfo;
    }

    /**
     * This method return the data of the model
     * @param ManageStudentInfoRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageStudentInfoRequest $request)
    {
        return Datatables::of($this->studentinfo->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($studentinfo) {
                return Carbon::parse($studentinfo->created_at)->toDateString();
            })
            ->addColumn('actions', function ($studentinfo) {
                return $studentinfo->action_buttons;
            })
            ->make(true);
    }
}
