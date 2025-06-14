<?php

namespace App\Http\Controllers\Backend\PagePositions;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\PagePositions\PagePositionRepository;
use App\Http\Requests\Backend\PagePositions\ManagePagePositionRequest;

/**
 * Class PagePositionsTableController.
 */
class PagePositionsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var PagePositionRepository
     */
    protected $pageposition;

    /**
     * contructor to initialize repository object
     * @param PagePositionRepository $pageposition;
     */
    public function __construct(PagePositionRepository $pageposition)
    {
        $this->pageposition = $pageposition;
    }

    /**
     * This method return the data of the model
     * @param ManagePagePositionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManagePagePositionRequest $request)
    {
        return Datatables::of($this->pageposition->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($pageposition) {
                return Carbon::parse($pageposition->created_at)->toDateString();
            })
            ->addColumn('actions', function ($pageposition) {
                return $pageposition->action_buttons;
            })
            ->make(true);
    }
}
