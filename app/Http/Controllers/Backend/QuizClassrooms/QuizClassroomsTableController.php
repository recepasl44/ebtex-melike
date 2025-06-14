<?php

namespace App\Http\Controllers\Backend\QuizClassrooms;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizClassrooms\QuizClassroomRepository;
use App\Http\Requests\Backend\QuizClassrooms\ManageQuizClassroomRequest;

/**
 * Class QuizClassroomsTableController.
 */
class QuizClassroomsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizClassroomRepository
     */
    protected $scholarshipclassroom;

    /**
     * contructor to initialize repository object
     * @param QuizClassroomRepository $scholarshipclassroom;
     */
    public function __construct(QuizClassroomRepository $scholarshipclassroom)
    {
        $this->scholarshipclassroom = $scholarshipclassroom;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizClassroomRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizClassroomRequest $request)
    {
        return Datatables::of($this->scholarshipclassroom->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($scholarshipclassroom) {
                return Carbon::parse($scholarshipclassroom->created_at)->toDateString();
            })
            ->addColumn('actions', function ($scholarshipclassroom) {
                return $scholarshipclassroom->action_buttons;
            })
            ->make(true);
    }
}
