<?php

namespace App\Http\Controllers\Backend\GuidanceObservations;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\GuidanceObservations\GuidanceObservationRepository;
use App\Http\Requests\Backend\GuidanceObservations\ManageGuidanceObservationRequest;

/**
 * Class GuidanceObservationsTableController.
 */
class GuidanceObservationsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var GuidanceObservationRepository
     */
    protected $guidanceobservation;

    /**
     * contructor to initialize repository object
     * @param GuidanceObservationRepository $guidanceobservation;
     */
    public function __construct(GuidanceObservationRepository $guidanceobservation)
    {
        $this->guidanceobservation = $guidanceobservation;
    }

    /**
     * This method return the data of the model
     * @param ManageGuidanceObservationRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageGuidanceObservationRequest $request)
    {
        return Datatables::of($this->guidanceobservation->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($guidanceobservation) {
                return Carbon::parse($guidanceobservation->created_at)->toDateString();
            })
            ->addColumn('actions', function ($guidanceobservation) {
                return $guidanceobservation->action_buttons;
            })
            ->make(true);
    }
}
