<?php

namespace App\Http\Controllers\Backend\InstitutionTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\InstitutionTypes\InstitutionTypeRepository;
use App\Http\Requests\Backend\InstitutionTypes\ManageInstitutionTypeRequest;

/**
 * Class InstitutionTypesTableController.
 */
class InstitutionTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var InstitutionTypeRepository
     */
    protected $institutiontype;

    /**
     * contructor to initialize repository object
     * @param InstitutionTypeRepository $institutiontype;
     */
    public function __construct(InstitutionTypeRepository $institutiontype)
    {
        $this->institutiontype = $institutiontype;
    }

    /**
     * This method return the data of the model
     * @param ManageInstitutionTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageInstitutionTypeRequest $request)
    {
        return Datatables::of($this->institutiontype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($institutiontype) {
                return Carbon::parse($institutiontype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($institutiontype) {
                return $institutiontype->action_buttons;
            })
            ->make(true);
    }
}
