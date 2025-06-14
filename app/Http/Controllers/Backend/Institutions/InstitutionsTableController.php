<?php

namespace App\Http\Controllers\Backend\Institutions;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Institutions\InstitutionRepository;
use App\Http\Requests\Backend\Institutions\ManageInstitutionRequest;

/**
 * Class InstitutionsTableController.
 */
class InstitutionsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var InstitutionRepository
     */
    protected $institution;

    /**
     * contructor to initialize repository object
     * @param InstitutionRepository $institution;
     */
    public function __construct(InstitutionRepository $institution)
    {
        $this->institution = $institution;
    }

    /**
     * This method return the data of the model
     * @param ManageInstitutionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageInstitutionRequest $request)
    {
        return Datatables::of($this->institution->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($institution) {
                return Carbon::parse($institution->created_at)->toDateString();
            })
            ->addColumn('actions', function ($institution) {
                return $institution->action_buttons;
            })
            ->make(true);
    }
}
