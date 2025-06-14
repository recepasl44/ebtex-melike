<?php

namespace App\Http\Controllers\Backend\Colors;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Colors\ColorRepository;
use App\Http\Requests\Backend\Colors\ManageColorRequest;

/**
 * Class ColorsTableController.
 */
class ColorsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ColorRepository
     */
    protected $color;

    /**
     * contructor to initialize repository object
     * @param ColorRepository $color;
     */
    public function __construct(ColorRepository $color)
    {
        $this->color = $color;
    }

    /**
     * This method return the data of the model
     * @param ManageColorRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageColorRequest $request)
    {
        return Datatables::of($this->color->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($color) {
                return Carbon::parseToDate($color->created_at);
            })
            ->addColumn('actions', function ($color) {
                return $color->action_buttons;
            })
            ->make(true);
    }
}
