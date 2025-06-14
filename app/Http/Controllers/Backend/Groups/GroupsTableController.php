<?php

namespace App\Http\Controllers\Backend\Groups;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Groups\GroupRepository;
use App\Http\Requests\Backend\Groups\ManageGroupRequest;

/**
 * Class GroupsTableController.
 */
class GroupsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var GroupRepository
     */
    protected $group;

    /**
     * contructor to initialize repository object
     * @param GroupRepository $group;
     */
    public function __construct(GroupRepository $group)
    {
        $this->group = $group;
    }

    /**
     * This method return the data of the model
     * @param ManageGroupRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageGroupRequest $request)
    {
        return Datatables::of($this->group->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($group) {
                return Carbon::parse($group->created_at)->toDateString();
            })
            ->addColumn('actions', function ($group) {
                return $group->action_buttons;
            })
            ->make(true);
    }
}
