<?php

namespace App\Http\Controllers\Backend\FieldManagers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\FieldManagers\FieldManagerRepository;
use App\Http\Requests\Backend\FieldManagers\ManageFieldManagerRequest;

/**
 * Class FieldManagersTableController.
 */
class FieldManagersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var FieldManagerRepository
     */
    protected $fieldmanager;

    /**
     * contructor to initialize repository object
     * @param FieldManagerRepository $fieldmanager;
     */
    public function __construct(FieldManagerRepository $fieldmanager)
    {
        $this->fieldmanager = $fieldmanager;
    }

    /**
     * This method return the data of the model
     * @param ManageFieldManagerRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageFieldManagerRequest $request)
    {
        return Datatables::of($this->fieldmanager->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($fieldmanager) {
                return Carbon::parse($fieldmanager->created_at)->toDateString();
            })
            ->addColumn('actions', function ($fieldmanager) {
                return $fieldmanager->action_buttons;
            })
            ->make(true);
    }
}
