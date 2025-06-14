<?php

namespace App\Http\Controllers\Backend\PageTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\PageTypes\PageTypeRepository;
use App\Http\Requests\Backend\PageTypes\ManagePageTypeRequest;

/**
 * Class PageTypesTableController.
 */
class PageTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var PageTypeRepository
     */
    protected $pagetype;

    /**
     * contructor to initialize repository object
     * @param PageTypeRepository $pagetype;
     */
    public function __construct(PageTypeRepository $pagetype)
    {
        $this->pagetype = $pagetype;
    }

    /**
     * This method return the data of the model
     * @param ManagePageTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManagePageTypeRequest $request)
    {
        return Datatables::of($this->pagetype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($pagetype) {
                return Carbon::parse($pagetype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($pagetype) {
                return $pagetype->action_buttons;
            })
            ->make(true);
    }
}
