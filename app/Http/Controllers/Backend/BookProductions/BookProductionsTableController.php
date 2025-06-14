<?php

namespace App\Http\Controllers\Backend\BookProductions;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\BookProductions\BookProductionRepository;
use App\Http\Requests\Backend\BookProductions\ManageBookProductionRequest;

/**
 * Class BookProductionsTableController.
 */
class BookProductionsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookProductionRepository
     */
    protected $bookproduction;

    /**
     * contructor to initialize repository object
     * @param BookProductionRepository $bookproduction;
     */
    public function __construct(BookProductionRepository $bookproduction)
    {
        $this->bookproduction = $bookproduction;
    }

    /**
     * This method return the data of the model
     * @param ManageBookProductionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBookProductionRequest $request)
    {
        return Datatables::of($this->bookproduction->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($bookproduction) {
                return Carbon::parse($bookproduction->created_at)->toDateString();
            })
            ->addColumn('actions', function ($bookproduction) {
                return $bookproduction->action_buttons;
            })
            ->make(true);
    }
}
