<?php

namespace App\Http\Controllers\Backend\SourceTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\SourceTypes\SourceTypeRepository;
use App\Http\Requests\Backend\SourceTypes\ManageSourceTypeRequest;

/**
 * Class SourceTypesTableController.
 */
class SourceTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SourceTypeRepository
     */
    protected $sourcetype;

    /**
     * contructor to initialize repository object
     * @param SourceTypeRepository $sourcetype;
     */
    public function __construct(SourceTypeRepository $sourcetype)
    {
        $this->sourcetype = $sourcetype;
    }

    /**
     * This method return the data of the model
     * @param ManageSourceTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSourceTypeRequest $request)
    {
        return Datatables::of($this->sourcetype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($sourcetype) {
                return Carbon::parse($sourcetype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($sourcetype) {
                return $sourcetype->action_buttons;
            })
            ->make(true);
    }
}
