<?php

namespace App\Http\Controllers\Backend\TestTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\TestTypes\TestTypeRepository;
use App\Http\Requests\Backend\TestTypes\ManageTestTypeRequest;

/**
 * Class TestTypesTableController.
 */
class TestTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestTypeRepository
     */
    protected $testtype;

    /**
     * contructor to initialize repository object
     * @param TestTypeRepository $testtype;
     */
    public function __construct(TestTypeRepository $testtype)
    {
        $this->testtype = $testtype;
    }

    /**
     * This method return the data of the model
     * @param ManageTestTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageTestTypeRequest $request)
    {
        return Datatables::of($this->testtype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($testtype) {
                return Carbon::parse($testtype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($testtype) {
                return $testtype->action_buttons;
            })
            ->make(true);
    }
}
