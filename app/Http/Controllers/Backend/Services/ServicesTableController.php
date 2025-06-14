<?php

namespace App\Http\Controllers\Backend\Services;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Services\ServiceRepository;
use App\Http\Requests\Backend\Services\ManageServiceRequest;

/**
 * Class ServicesTableController.
 */
class ServicesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ServiceRepository
     */
    protected $service;

    /**
     * contructor to initialize repository object
     * @param ServiceRepository $service;
     */
    public function __construct(ServiceRepository $service)
    {
        $this->service = $service;
    }

    /**
     * This method return the data of the model
     * @param ManageServiceRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageServiceRequest $request)
    {
        return Datatables::of($this->service->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('branche', function ($service) {
                return $service?->branche?->name;
            })
            ->addColumn('level', function ($service) {
                return $service?->branche?->name;
            })
            ->addColumn('course', function ($service) {
                return $service?->branche?->name;
            })
            ->addColumn('program', function ($service) {
                return $service?->branche?->name;
            })
            ->addColumn('price', function ($service) {
                return formatCurrency($service?->price);
            })
            ->addColumn('created_at', function ($service) {
                return Carbon::parse($service->created_at)->toDateString();
            })
            ->addColumn('actions', function ($service) {
                return $service->action_buttons;
            })
            ->make(true);
    }
}
