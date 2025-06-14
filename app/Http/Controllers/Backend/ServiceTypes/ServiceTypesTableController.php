<?php

namespace App\Http\Controllers\Backend\ServiceTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ServiceTypes\ServiceTypeRepository;
use App\Http\Requests\Backend\ServiceTypes\ManageServiceTypeRequest;

/**
 * Class ServiceTypesTableController.
 */
class ServiceTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServiceTypeRepository
     */
    protected $servicetype;

    /**
     * contructor to initialize repository object
     * @param ServiceTypeRepository $servicetype;
     */
    public function __construct(ServiceTypeRepository $servicetype)
    {
        $this->servicetype = $servicetype;
    }

    /**
     * This method return the data of the model
     * @param ManageServiceTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageServiceTypeRequest $request)
    {
        return Datatables::of($this->servicetype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($servicetype) {
                return Carbon::parse($servicetype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($servicetype) {
                return $servicetype->action_buttons;
            })
            ->make(true);
    }
}
