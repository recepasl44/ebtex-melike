<?php

namespace App\Http\Controllers\Backend\BookletTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\BookletTypes\BookletTypeRepository;
use App\Http\Requests\Backend\BookletTypes\ManageBookletTypeRequest;

/**
 * Class BookletTypesTableController.
 */
class BookletTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookletTypeRepository
     */
    protected $booklettype;

    /**
     * contructor to initialize repository object
     * @param BookletTypeRepository $booklettype;
     */
    public function __construct(BookletTypeRepository $booklettype)
    {
        $this->booklettype = $booklettype;
    }

    /**
     * This method return the data of the model
     * @param ManageBookletTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBookletTypeRequest $request)
    {
        return Datatables::of($this->booklettype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($booklettype) {
                return Carbon::parse($booklettype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($booklettype) {
                return $booklettype->action_buttons;
            })
            ->make(true);
    }
}
