<?php

namespace App\Http\Controllers\Backend\StudentPsychologicals;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\StudentPsychologicals\StudentPsychologicalRepository;
use App\Http\Requests\Backend\StudentPsychologicals\ManageStudentPsychologicalRequest;

/**
 * Class StudentPsychologicalsTableController.
 */
class StudentPsychologicalsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var StudentPsychologicalRepository
     */
    protected $studentpsychological;

    /**
     * contructor to initialize repository object
     * @param StudentPsychologicalRepository $studentpsychological;
     */
    public function __construct(StudentPsychologicalRepository $studentpsychological)
    {
        $this->studentpsychological = $studentpsychological;
    }

    /**
     * This method return the data of the model
     * @param ManageStudentPsychologicalRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageStudentPsychologicalRequest $request)
    {
        return Datatables::of($this->studentpsychological->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($studentpsychological) {
                return Carbon::parse($studentpsychological->created_at)->toDateString();
            })
            ->addColumn('actions', function ($studentpsychological) {
                return $studentpsychological->action_buttons;
            })
            ->make(true);
    }
}
