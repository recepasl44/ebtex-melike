<?php

namespace App\Http\Controllers\Backend\DiscountStudents;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\DiscountStudents\DiscountStudentRepository;
use App\Http\Requests\Backend\DiscountStudents\ManageDiscountStudentRequest;

/**
 * Class DiscountStudentsTableController.
 */
class DiscountStudentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var DiscountStudentRepository
     */
    protected $discountstudent;

    /**
     * contructor to initialize repository object
     * @param DiscountStudentRepository $discountstudent;
     */
    public function __construct(DiscountStudentRepository $discountstudent)
    {
        $this->discountstudent = $discountstudent;
    }

    /**
     * This method return the data of the model
     * @param ManageDiscountStudentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageDiscountStudentRequest $request)
    {
        return Datatables::of($this->discountstudent->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($discountstudent) {
                return Carbon::parse($discountstudent->created_at)->toDateString();
            })
            ->addColumn('actions', function ($discountstudent) {
                return $discountstudent->action_buttons;
            })
            ->make(true);
    }
}
