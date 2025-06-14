<?php

namespace App\Http\Controllers\Backend\ClassRooms;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ClassRooms\ClassRoomRepository;
use App\Http\Requests\Backend\ClassRooms\ManageClassRoomRequest;

/**
 * Class ClassRoomsTableController.
 */
class ClassRoomsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ClassRoomRepository
     */
    protected $classroom;

    /**
     * contructor to initialize repository object
     * @param ClassRoomRepository $classroom;
     */
    public function __construct(ClassRoomRepository $classroom)
    {
        $this->classroom = $classroom;
    }

    /**
     * This method return the data of the model
     * @param ManageClassRoomRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageClassRoomRequest $request)
    {
        return Datatables::of($this->classroom->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('branche', function ($classroom) {
                return $classroom?->branche?->name;
            })
            ->addColumn('school', function ($classroom) {
                return $classroom?->school?->name;
            })
            ->addColumn('level', function ($classroom) {
                return $classroom?->level?->name;
            })
            ->addColumn('created_at', function ($classroom) {
                return Carbon::parse($classroom->created_at)->toDateString();
            })
            ->addColumn('actions', function ($classroom) {
                return $classroom->action_buttons;
            })
            ->make(true);
    }
}
