<?php

namespace App\Http\Controllers\Backend\Classes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Classes\ClassRepository;
use App\Http\Requests\Backend\Classes\ManageClassRequest;

/**
 * Class ClassesTableController.
 */
class ClassesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ClassRepository
     */
    protected $class;

    /**
     * contructor to initialize repository object
     * @param ClassRepository $class;
     */
    public function __construct(ClassRepository $class)
    {
        $this->class = $class;
    }

    /**
     * This method return the data of the model
     * @param ManageClassRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageClassRequest $request)
    {
        return Datatables::of($this->class->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($class) {
                return Carbon::parse($class->created_at)->toDateString();
            })
            ->addColumn('actions', function ($class) {
                return $class->action_buttons;
            })
            ->make(true);
    }
}
