<?php

namespace App\Http\Controllers\Backend\GroupTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\GroupTypes\GroupTypeRepository;
use App\Http\Requests\Backend\GroupTypes\ManageGroupTypeRequest;

/**
 * Class GroupTypesTableController.
 */
class GroupTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var GroupTypeRepository
     */
    protected $grouptype;

    /**
     * contructor to initialize repository object
     * @param GroupTypeRepository $grouptype;
     */
    public function __construct(GroupTypeRepository $grouptype)
    {
        $this->grouptype = $grouptype;
    }

    /**
     * This method return the data of the model
     * @param ManageGroupTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageGroupTypeRequest $request)
    {
        return Datatables::of($this->grouptype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($grouptype) {
                return Carbon::parse($grouptype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($grouptype) {
                return $grouptype->action_buttons;
            })
            ->make(true);
    }
}
