<?php

namespace App\Http\Controllers\Backend\Tasks;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Tasks\TaskRepository;
use App\Http\Requests\Backend\Tasks\ManageTaskRequest;

/**
 * Class TasksTableController.
 */
class TasksTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var TaskRepository
     */
    protected $task;

    /**
     * contructor to initialize repository object
     * @param TaskRepository $task;
     */
    public function __construct(TaskRepository $task)
    {
        $this->task = $task;
    }

    /**
     * This method return the data of the model
     * @param ManageTaskRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageTaskRequest $request)
    {
        return Datatables::of($this->task->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($task) {
                return Carbon::parse($task->created_at)->toDateString();
            })
            ->addColumn('actions', function ($task) {
                return $task->action_buttons;
            })
            ->make(true);
    }
}
