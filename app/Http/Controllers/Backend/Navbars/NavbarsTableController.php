<?php

namespace App\Http\Controllers\Backend\Navbars;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Navbars\NavbarRepository;
use App\Http\Requests\Backend\Navbars\ManageNavbarRequest;

/**
 * Class NavbarsTableController.
 */
class NavbarsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var NavbarRepository
     */
    protected $navbar;
    protected $status;
    protected $spesific;

    /**
     * contructor to initialize repository object
     * @param NavbarRepository $navbar;
     */
    public function __construct(NavbarRepository $navbar)
    {
        $this->navbar = $navbar;
        $this->status = [
            0 => _tr('labels.backend.navbars.table.passive'),
            1 => _tr('labels.backend.navbars.table.active')
        ];
        $this->spesific = [
            0 => _tr('labels.backend.navbars.table.no'),
            1 => _tr('labels.backend.navbars.table.yes')
        ];
    }

    /**
     * This method return the data of the model
     * @param ManageNavbarRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageNavbarRequest $request)
    {
        return Datatables::of($this->navbar->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('parent', function ($navbar) {
                return $navbar->parent ? $navbar->parent->name : NULL;
            })
            ->addColumn('status', function ($navbar) {
                return isset($this->status[$navbar->status]) ? $this->status[$navbar->status] : $this->status[0] ;
            })
            ->addColumn('spesific', function ($navbar) {
                return isset($this->status[$navbar->is_spesific]) ? $this->status[$navbar->is_spesific] : $this->spesific[0] ;
            })
            ->addColumn('created_at', function ($navbar) {
                return Carbon::parseToDate($navbar->created_at);
            })
            ->addColumn('actions', function ($navbar) {
                return $navbar->action_buttons;
            })
            ->make(true);
    }
}
