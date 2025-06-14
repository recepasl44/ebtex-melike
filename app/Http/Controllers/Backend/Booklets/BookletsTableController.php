<?php

namespace App\Http\Controllers\Backend\Booklets;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Booklets\BookletRepository;
use App\Http\Requests\Backend\Booklets\ManageBookletRequest;

/**
 * Class BookletsTableController.
 */
class BookletsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookletRepository
     */
    protected $booklet;

    /**
     * contructor to initialize repository object
     * @param BookletRepository $booklet;
     */
    public function __construct(BookletRepository $booklet)
    {
        $this->booklet = $booklet;
    }

    /**
     * This method return the data of the model
     * @param ManageBookletRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBookletRequest $request)
    {
        return Datatables::of($this->booklet->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($booklet) {
                return Carbon::parse($booklet->created_at)->toDateString();
            })
            ->addColumn('actions', function ($booklet) {
                return $booklet->action_buttons;
            })
            ->make(true);
    }
}
