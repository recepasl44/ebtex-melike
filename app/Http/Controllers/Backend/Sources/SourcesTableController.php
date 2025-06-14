<?php

namespace App\Http\Controllers\Backend\Sources;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Sources\SourceRepository;
use App\Http\Requests\Backend\Sources\ManageSourceRequest;

/**
 * Class SourcesTableController.
 */
class SourcesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SourceRepository
     */
    protected $source;

    /**
     * contructor to initialize repository object
     * @param SourceRepository $source;
     */
    public function __construct(SourceRepository $source)
    {
        $this->source = $source;
    }

    /**
     * This method return the data of the model
     * @param ManageSourceRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSourceRequest $request)
    {
        return Datatables::of($this->source->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($source) {
                return Carbon::parse($source->created_at)->toDateString();
            })
            ->addColumn('actions', function ($source) {
                return $source->action_buttons;
            })
            ->make(true);
    }
}
