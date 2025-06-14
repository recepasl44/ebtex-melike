<?php

namespace App\Http\Controllers\Backend\Routes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Routes\RouteRepository;
use App\Http\Requests\Backend\Routes\ManageRouteRequest;

/**
 * Class RoutesTableController.
 */
class RoutesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var RouteRepository
     */
    protected $route;

    /**
     * contructor to initialize repository object
     * @param RouteRepository $route;
     */
    public function __construct(RouteRepository $route)
    {
        $this->route = $route;
    }

    /**
     * This method return the data of the model
     * @param ManageRouteRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageRouteRequest $request)
    {
        return Datatables::of($this->route->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($route) {
                return Carbon::parse($route->created_at)->toDateString();
            })
            ->addColumn('actions', function ($route) {
                return $route->action_buttons;
            })
            ->make(true);
    }
}
