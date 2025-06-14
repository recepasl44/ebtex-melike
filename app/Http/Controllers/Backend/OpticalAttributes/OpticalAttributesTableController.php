<?php

namespace App\Http\Controllers\Backend\OpticalAttributes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\OpticalAttributes\OpticalAttributeRepository;
use App\Http\Requests\Backend\OpticalAttributes\ManageOpticalAttributeRequest;

/**
 * Class OpticalAttributesTableController.
 */
class OpticalAttributesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var OpticalAttributeRepository
     */
    protected $opticalattribute;

    /**
     * contructor to initialize repository object
     * @param OpticalAttributeRepository $opticalattribute;
     */
    public function __construct(OpticalAttributeRepository $opticalattribute)
    {
        $this->opticalattribute = $opticalattribute;
    }

    /**
     * This method return the data of the model
     * @param ManageOpticalAttributeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageOpticalAttributeRequest $request)
    {
        return Datatables::of($this->opticalattribute->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($opticalattribute) {
                return Carbon::parse($opticalattribute->created_at)->toDateString();
            })
            ->addColumn('actions', function ($opticalattribute) {
                return $opticalattribute->action_buttons;
            })
            ->make(true);
    }
}
