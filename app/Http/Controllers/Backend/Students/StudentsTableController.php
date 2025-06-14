<?php

namespace App\Http\Controllers\Backend\Students;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Students\StudentRepository;
use App\Http\Requests\Backend\Students\ManageStudentRequest;

/**
 * Class StudentsTableController.
 */
class StudentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var StudentRepository
     */
    protected $student;

    /**
     * contructor to initialize repository object
     * @param StudentRepository $student;
     */
    public function __construct(StudentRepository $student)
    {
        $this->student = $student;
    }

    /**
     * This method return the data of the model
     * @param ManageStudentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageStudentRequest $request)
    {
        $data = $this->student->getForDataTable();
        if ($request->has('student_ids')) {
            $data = $data->whereIn('id', $request->get('student_ids'));
        }
        return Datatables::of($data)
            ->escapeColumns(['id'])
            ->addColumn('checkbox', function ($student) {
                return '<div class="form-check form-check-lg d-flex align-items-center"><input class="form-check-input student_ids" id="'.$student->id.'" type="checkbox" name="student_ids[]" value="'.$student->id.'"></div>';
            })
            ->addColumn('branche', function ($student) {
                return $student?->branche?->name;
            })
            ->addColumn('nationality', function ($student) {
                return $student?->nationality?->name;
            })
            ->addColumn('gender', function ($student) {
                return $student?->gender;
            })
            ->addColumn('full_name', function ($student) {
                return $student?->first_name.' '.$student?->last_name;
            })
            ->addColumn('birthday', function ($student) {
                return Carbon::parse($student->birthday)->toDateString();
            })
            ->addColumn('program', function ($student) {
                return $student?->program?->name;
            })
            ->addColumn('level', function ($student) {
                return $student?->level?->name;
            })
            ->addColumn('course', function ($student) {
                return $student?->course?->name;
            })
            ->addColumn('school', function ($student) {
                return $student?->school?->name;
            })
            ->addColumn('created_by', function ($student) {
                return $student?->createdby?->first_name.' '.$student?->createdby?->last_name;
            })
            ->addColumn('created_at', function ($student) {
                return Carbon::parse($student->created_at)->toDateString();
            })
            ->addColumn('actions', function ($student) {
                return $student->action_buttons;
            })
            ->make(true);
    }
}
