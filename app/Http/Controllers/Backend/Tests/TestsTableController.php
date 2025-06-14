<?php

namespace App\Http\Controllers\Backend\Tests;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Tests\TestRepository;
use App\Http\Requests\Backend\Tests\ManageTestRequest;

/**
 * Class TestsTableController.
 */
class TestsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestRepository
     */
    protected $test;

    /**
     * contructor to initialize repository object
     * @param TestRepository $test;
     */
    public function __construct(TestRepository $test)
    {
        $this->test = $test;
    }

    /**
     * This method return the data of the model
     * @param ManageTestRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageTestRequest $request)
    {
        return Datatables::of($this->test->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($test) {
                return Carbon::parse($test->created_at)->toDateString();
            })
            ->addColumn('actions', function ($test) {
                return $test->action_buttons;
            })
            ->make(true);
    }
}
