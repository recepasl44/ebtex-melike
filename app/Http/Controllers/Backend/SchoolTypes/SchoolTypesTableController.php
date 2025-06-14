<?php

namespace App\Http\Controllers\Backend\SchoolTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\SchoolTypes\SchoolTypeRepository;
use App\Http\Requests\Backend\SchoolTypes\ManageSchoolTypeRequest;

/**
 * Class SchoolTypesTableController.
 */
class SchoolTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SchoolTypeRepository
     */
    protected $schooltype;

    /**
     * contructor to initialize repository object
     * @param SchoolTypeRepository $schooltype;
     */
    public function __construct(SchoolTypeRepository $schooltype)
    {
        $this->schooltype = $schooltype;
    }

    /**
     * This method return the data of the model
     * @param ManageSchoolTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSchoolTypeRequest $request)
    {
        return Datatables::of($this->schooltype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($schooltype) {
                return Carbon::parse($schooltype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($schooltype) {
                return $schooltype->action_buttons;
            })
            ->make(true);
    }
}
