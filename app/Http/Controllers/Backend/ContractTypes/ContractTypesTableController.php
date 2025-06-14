<?php

namespace App\Http\Controllers\Backend\ContractTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ContractTypes\ContractTypeRepository;
use App\Http\Requests\Backend\ContractTypes\ManageContractTypeRequest;

/**
 * Class ContractTypesTableController.
 */
class ContractTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ContractTypeRepository
     */
    protected $contracttype;

    /**
     * contructor to initialize repository object
     * @param ContractTypeRepository $contracttype;
     */
    public function __construct(ContractTypeRepository $contracttype)
    {
        $this->contracttype = $contracttype;
    }

    /**
     * This method return the data of the model
     * @param ManageContractTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageContractTypeRequest $request)
    {
        return Datatables::of($this->contracttype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($contracttype) {
                return Carbon::parse($contracttype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($contracttype) {
                return $contracttype->action_buttons;
            })
            ->make(true);
    }
}
