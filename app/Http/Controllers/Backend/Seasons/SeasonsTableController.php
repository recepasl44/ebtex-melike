<?php

namespace App\Http\Controllers\Backend\Seasons;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Seasons\SeasonRepository;
use App\Http\Requests\Backend\Seasons\ManageSeasonRequest;

/**
 * Class SeasonsTableController.
 */
class SeasonsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SeasonRepository
     */
    protected $season;

    /**
     * contructor to initialize repository object
     * @param SeasonRepository $season;
     */
    public function __construct(SeasonRepository $season)
    {
        $this->season = $season;
    }

    /**
     * This method return the data of the model
     * @param ManageSeasonRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSeasonRequest $request)
    {
        return Datatables::of($this->season->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($season) {
                return Carbon::parse($season->created_at)->toDateString();
            })
            ->addColumn('actions', function ($season) {
                return $season->action_buttons;
            })
            ->make(true);
    }
}
