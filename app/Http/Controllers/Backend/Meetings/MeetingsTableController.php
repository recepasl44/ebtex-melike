<?php

namespace App\Http\Controllers\Backend\Meetings;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Meetings\MeetingRepository;
use App\Http\Requests\Backend\Meetings\ManageMeetingRequest;

/**
 * Class MeetingsTableController.
 */
class MeetingsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var MeetingRepository
     */
    protected $meeting;

    /**
     * contructor to initialize repository object
     * @param MeetingRepository $meeting;
     */
    public function __construct(MeetingRepository $meeting)
    {
        $this->meeting = $meeting;
    }

    /**
     * This method return the data of the model
     * @param ManageMeetingRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageMeetingRequest $request)
    {
        return Datatables::of($this->meeting->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('season', function ($meeting) {
                return $meeting?->season?->name;
            })
            ->addColumn('branche', function ($meeting) {
                return $meeting?->branche?->name;
            })
            ->addColumn('student', function ($meeting) {
                return $meeting?->student?->first_name.' '.$meeting?->student?->last_name;
            })
            ->addColumn('type', function ($meeting) {
                return $meeting?->typeStatus;
            })
            ->addColumn('meeting_date', function ($meeting) {
                return Carbon::parse($meeting->meeting_date)->toDateString();
            })
            ->addColumn('createdby', function ($meeting) {
                return $meeting?->createdby?->first_name.' '.$meeting?->createdby?->last_name;
            })
            ->addColumn('created_at', function ($meeting) {
                return Carbon::parse($meeting->created_at)->toDateString();
            })
            ->addColumn('actions', function ($meeting) {
                return $meeting->action_buttons;
            })
            ->make(true);
    }
}
