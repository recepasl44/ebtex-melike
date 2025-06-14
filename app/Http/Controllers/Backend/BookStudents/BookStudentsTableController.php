<?php

namespace App\Http\Controllers\Backend\BookStudents;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\BookStudents\BookStudentRepository;
use App\Http\Requests\Backend\BookStudents\ManageBookStudentRequest;

/**
 * Class BookStudentsTableController.
 */
class BookStudentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookStudentRepository
     */
    protected $bookstudent;

    /**
     * contructor to initialize repository object
     * @param BookStudentRepository $bookstudent;
     */
    public function __construct(BookStudentRepository $bookstudent)
    {
        $this->bookstudent = $bookstudent;
    }

    /**
     * This method return the data of the model
     * @param ManageBookStudentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBookStudentRequest $request)
    {
        return Datatables::of($this->bookstudent->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($bookstudent) {
                return Carbon::parse($bookstudent->created_at)->toDateString();
            })
            ->addColumn('actions', function ($bookstudent) {
                return $bookstudent->action_buttons;
            })
            ->make(true);
    }
}
