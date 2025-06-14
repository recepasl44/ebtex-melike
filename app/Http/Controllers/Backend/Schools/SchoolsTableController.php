<?php

namespace App\Http\Controllers\Backend\Schools;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Schools\SchoolRepository;
use App\Http\Requests\Backend\Schools\ManageSchoolRequest;

/**
 * Class SchoolsTableController.
 */
class SchoolsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SchoolRepository
     */
    protected $school;

    /**
     * contructor to initialize repository object
     * @param SchoolRepository $school;
     */
    public function __construct(SchoolRepository $school)
    {
        $this->school = $school;
    }

    /**
     * This method return the data of the model
     * @param ManageSchoolRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSchoolRequest $request)
    {
        return Datatables::of($this->school->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('country', function ($school) {
                return $school?->country?->name;
            })
            ->addColumn('city', function ($school) {
                return $school?->city?->name;
            })
            ->addColumn('county', function ($school) {
                return $school?->county?->name;
            })
            ->addColumn('type', function ($school) {
                return $school?->type?->name;
            })
            ->addColumn('created_at', function ($school) {
                return Carbon::parse($school->created_at)->toDateString();
            })
            ->addColumn('actions', function ($school) {
                return $school->action_buttons;
            })
            ->make(true);
    }
}
