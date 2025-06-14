<?php

namespace App\Http\Controllers\Backend\OpticalForms;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\OpticalForms\OpticalFormRepository;
use App\Http\Requests\Backend\OpticalForms\ManageOpticalFormRequest;

/**
 * Class OpticalFormsTableController.
 */
class OpticalFormsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var OpticalFormRepository
     */
    protected $opticalform;

    /**
     * contructor to initialize repository object
     * @param OpticalFormRepository $opticalform;
     */
    public function __construct(OpticalFormRepository $opticalform)
    {
        $this->opticalform = $opticalform;
    }

    /**
     * This method return the data of the model
     * @param ManageOpticalFormRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageOpticalFormRequest $request)
    {
        return Datatables::of($this->opticalform->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($opticalform) {
                return Carbon::parse($opticalform->created_at)->toDateString();
            })
            ->addColumn('actions', function ($opticalform) {
                return $opticalform->action_buttons;
            })
            ->make(true);
    }
}
