<?php

namespace App\Http\Controllers\Backend\TaskTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\TaskTypes\TaskTypeRepository;
use App\Http\Requests\Backend\TaskTypes\ManageTaskTypeRequest;

/**
 * Class TaskTypesTableController.
 */
class TaskTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var TaskTypeRepository
     */
    protected $tasktype;

    /**
     * contructor to initialize repository object
     * @param TaskTypeRepository $tasktype;
     */
    public function __construct(TaskTypeRepository $tasktype)
    {
        $this->tasktype = $tasktype;
    }

    /**
     * This method return the data of the model
     * @param ManageTaskTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageTaskTypeRequest $request)
    {
        return Datatables::of($this->tasktype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($tasktype) {
                return Carbon::parse($tasktype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($tasktype) {
                return $tasktype->action_buttons;
            })
            ->make(true);
    }
}
