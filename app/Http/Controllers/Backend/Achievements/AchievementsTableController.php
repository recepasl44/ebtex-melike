<?php

namespace App\Http\Controllers\Backend\Achievements;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Achievements\AchievementRepository;
use App\Http\Requests\Backend\Achievements\ManageAchievementRequest;

/**
 * Class AchievementsTableController.
 */
class AchievementsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AchievementRepository
     */
    protected $achievement;

    /**
     * contructor to initialize repository object
     * @param AchievementRepository $achievement;
     */
    public function __construct(AchievementRepository $achievement)
    {
        $this->achievement = $achievement;
    }

    /**
     * This method return the data of the model
     * @param ManageAchievementRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAchievementRequest $request)
    {
        return Datatables::of($this->achievement->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($achievement) {
                return Carbon::parse($achievement->created_at)->toDateString();
            })
            ->addColumn('actions', function ($achievement) {
                return $achievement->action_buttons;
            })
            ->make(true);
    }
}
