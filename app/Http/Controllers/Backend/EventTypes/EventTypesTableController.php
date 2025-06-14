<?php

namespace App\Http\Controllers\Backend\EventTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\EventTypes\EventTypeRepository;
use App\Http\Requests\Backend\EventTypes\ManageEventTypeRequest;

/**
 * Class EventTypesTableController.
 */
class EventTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var EventTypeRepository
     */
    protected $eventtype;

    /**
     * contructor to initialize repository object
     * @param EventTypeRepository $eventtype;
     */
    public function __construct(EventTypeRepository $eventtype)
    {
        $this->eventtype = $eventtype;
    }

    /**
     * This method return the data of the model
     * @param ManageEventTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageEventTypeRequest $request)
    {
        return Datatables::of($this->eventtype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($eventtype) {
                return Carbon::parse($eventtype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($eventtype) {
                return $eventtype->action_buttons;
            })
            ->make(true);
    }
}
