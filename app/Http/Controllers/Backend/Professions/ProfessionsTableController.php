<?php

namespace App\Http\Controllers\Backend\Professions;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Professions\ProfessionRepository;
use App\Http\Requests\Backend\Professions\ManageProfessionRequest;

/**
 * Class ProfessionsTableController.
 */
class ProfessionsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ProfessionRepository
     */
    protected $profession;

    /**
     * contructor to initialize repository object
     * @param ProfessionRepository $profession;
     */
    public function __construct(ProfessionRepository $profession)
    {
        $this->profession = $profession;
    }

    /**
     * This method return the data of the model
     * @param ManageProfessionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageProfessionRequest $request)
    {
        return Datatables::of($this->profession->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($profession) {
                return Carbon::parse($profession->created_at)->toDateString();
            })
            ->addColumn('actions', function ($profession) {
                return $profession->action_buttons;
            })
            ->make(true);
    }
}
