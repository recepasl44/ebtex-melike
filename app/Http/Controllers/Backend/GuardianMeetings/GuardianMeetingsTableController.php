<?php

namespace App\Http\Controllers\Backend\GuardianMeetings;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\GuardianMeetings\GuardianMeetingRepository;
use App\Http\Requests\Backend\GuardianMeetings\ManageGuardianMeetingRequest;

/**
 * Class GuardianMeetingsTableController.
 */
class GuardianMeetingsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var GuardianMeetingRepository
     */
    protected $guardianmeeting;

    /**
     * contructor to initialize repository object
     * @param GuardianMeetingRepository $guardianmeeting;
     */
    public function __construct(GuardianMeetingRepository $guardianmeeting)
    {
        $this->guardianmeeting = $guardianmeeting;
    }

    /**
     * This method return the data of the model
     * @param ManageGuardianMeetingRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageGuardianMeetingRequest $request)
    {
        return Datatables::of($this->guardianmeeting->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($guardianmeeting) {
                return Carbon::parse($guardianmeeting->created_at)->toDateString();
            })
            ->addColumn('actions', function ($guardianmeeting) {
                return $guardianmeeting->action_buttons;
            })
            ->make(true);
    }
}
