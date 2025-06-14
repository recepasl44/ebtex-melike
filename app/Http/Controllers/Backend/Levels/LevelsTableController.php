<?php

namespace App\Http\Controllers\Backend\Levels;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Levels\LevelRepository;
use App\Http\Requests\Backend\Levels\ManageLevelRequest;

/**
 * Class LevelsTableController.
 */
class LevelsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var LevelRepository
     */
    protected $level;

    /**
     * contructor to initialize repository object
     * @param LevelRepository $level;
     */
    public function __construct(LevelRepository $level)
    {
        $this->level = $level;
    }

    /**
     * This method return the data of the model
     * @param ManageLevelRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageLevelRequest $request)
    {
        return Datatables::of($this->level->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('program', function ($level) {
                return $level?->program?->name;
            })
            ->addColumn('created_at', function ($level) {
                return Carbon::parse($level->created_at)->toDateString();
            })
            ->addColumn('actions', function ($level) {
                return $level->action_buttons;
            })
            ->make(true);
    }
}
