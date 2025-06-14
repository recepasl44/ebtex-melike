<?php

namespace App\Http\Controllers\Backend\ComponentValues;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ComponentValues\ComponentValueRepository;
use App\Http\Requests\Backend\ComponentValues\ManageComponentValueRequest;

/**
 * Class ComponentValuesTableController.
 */
class ComponentValuesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ComponentValueRepository
     */
    protected $componentvalue;

    /**
     * contructor to initialize repository object
     * @param ComponentValueRepository $componentvalue;
     */
    public function __construct(ComponentValueRepository $componentvalue)
    {
        $this->componentvalue = $componentvalue;
    }

    /**
     * This method return the data of the model
     * @param ManageComponentValueRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageComponentValueRequest $request)
    {
        return Datatables::of($this->componentvalue->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('lang', function ($card) {
                return $card->language_label ?? '';
            })
            ->addColumn('values', function ($componentvalue) {
                return getJson2Text($componentvalue->values);
            })
            ->addColumn('created_at', function ($componentvalue) {
                return Carbon::parse($componentvalue->created_at)->toDateString();
            })
            ->addColumn('actions', function ($componentvalue) {
                return $componentvalue->action_buttons;
            })
            ->make(true);
    }
}
