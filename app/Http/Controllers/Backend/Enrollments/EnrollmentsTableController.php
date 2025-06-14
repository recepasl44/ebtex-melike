<?php

namespace App\Http\Controllers\Backend\Enrollments;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Enrollments\EnrollmentRepository;
use App\Http\Requests\Backend\Enrollments\ManageEnrollmentRequest;

/**
 * Class EnrollmentsTableController.
 */
class EnrollmentsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var EnrollmentRepository
     */
    protected $enrollment;

    /**
     * contructor to initialize repository object
     * @param EnrollmentRepository $enrollment;
     */
    public function __construct(EnrollmentRepository $enrollment)
    {
        $this->enrollment = $enrollment;
    }

    /**
     * This method return the data of the model
     * @param ManageEnrollmentRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageEnrollmentRequest $request)
    {
        return Datatables::of($this->enrollment->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('service', function ($enrollment) {
                return $enrollment?->service->name;
            })
            ->addColumn('student', function ($enrollment) {
                return $enrollment?->student->first_name.' '.$enrollment?->student->last_name;
            })
            ->addColumn('status_label', function ($enrollment) {
                return $enrollment->status_label ?? '';
            })
            ->addColumn('created_at', function ($enrollment) {
                return Carbon::parse($enrollment->created_at)->toDateString();
            })
            ->addColumn('actions', function ($enrollment) {
                return $enrollment->action_buttons;
            })
            ->make(true);
    }
}
