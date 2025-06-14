<?php

namespace App\Http\Controllers\Backend\EventStudents;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\EventStudents\EventStudentRepository;
use App\Http\Requests\Backend\EventStudents\ManageEventStudentRequest;

/**
 * Class EventStudentsTableController.
 */
class EventStudentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var EventStudentRepository
     */
    protected $eventstudent;

    /**
     * contructor to initialize repository object
     * @param EventStudentRepository $eventstudent;
     */
    public function __construct(EventStudentRepository $eventstudent)
    {
        $this->eventstudent = $eventstudent;
    }

    /**
     * This method return the data of the model
     * @param ManageEventStudentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageEventStudentRequest $request)
    {
        return Datatables::of($this->eventstudent->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($eventstudent) {
                return Carbon::parse($eventstudent->created_at)->toDateString();
            })
            ->addColumn('actions', function ($eventstudent) {
                return $eventstudent->action_buttons;
            })
            ->make(true);
    }
}
