<?php

namespace App\Http\Controllers\Backend\Components;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Components\ComponentRepository;
use App\Http\Requests\Backend\Components\ManageComponentRequest;

/**
 * Class ComponentsTableController.
 */
class ComponentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ComponentRepository
     */
    protected $component;

    /**
     * contructor to initialize repository object
     * @param ComponentRepository $component;
     */
    public function __construct(ComponentRepository $component)
    {
        $this->component = $component;
    }

    /**
     * This method return the data of the model
     * @param ManageComponentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageComponentRequest $request)
    {
        return Datatables::of($this->component->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('cover', function ($component) {
                return $component->cover?'<img height="50" width="50" src="'.Storage::disk('public')->url($component->cover).'">':'';
            })
            ->addColumn('variables', function ($component) {
                return getJson2Text($component->variables);
            })
            ->addColumn('created_at', function ($component) {
                return Carbon::parse($component->created_at)->toDateString();
            })
            ->addColumn('actions', function ($component) {
                return $component->action_buttons;
            })
            ->make(true);
    }
}
