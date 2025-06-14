<?php

namespace App\Http\Controllers\Backend\GuidanceMeetings;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\GuidanceMeetings\GuidanceMeetingRepository;
use App\Http\Requests\Backend\GuidanceMeetings\ManageGuidanceMeetingRequest;

/**
 * Class GuidanceMeetingsTableController.
 */
class GuidanceMeetingsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var GuidanceMeetingRepository
     */
    protected $guidancemeeting;

    /**
     * contructor to initialize repository object
     * @param GuidanceMeetingRepository $guidancemeeting;
     */
    public function __construct(GuidanceMeetingRepository $guidancemeeting)
    {
        $this->guidancemeeting = $guidancemeeting;
    }

    /**
     * This method return the data of the model
     * @param ManageGuidanceMeetingRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageGuidanceMeetingRequest $request)
    {
        return Datatables::of($this->guidancemeeting->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($guidancemeeting) {
                return Carbon::parse($guidancemeeting->created_at)->toDateString();
            })
            ->addColumn('actions', function ($guidancemeeting) {
                return $guidancemeeting->action_buttons;
            })
            ->make(true);
    }
}
