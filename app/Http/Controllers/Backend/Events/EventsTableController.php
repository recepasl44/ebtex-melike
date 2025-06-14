<?php

namespace App\Http\Controllers\Backend\Events;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Events\EventRepository;
use App\Http\Requests\Backend\Events\ManageEventRequest;

/**
 * Class EventsTableController.
 */
class EventsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var EventRepository
     */
    protected $event;

    /**
     * contructor to initialize repository object
     * @param EventRepository $event;
     */
    public function __construct(EventRepository $event)
    {
        $this->event = $event;
    }

    /**
     * This method return the data of the model
     * @param ManageEventRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageEventRequest $request)
    {
        return Datatables::of($this->event->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($event) {
                return Carbon::parse($event->created_at)->toDateString();
            })
            ->addColumn('actions', function ($event) {
                return $event->action_buttons;
            })
            ->make(true);
    }
}
