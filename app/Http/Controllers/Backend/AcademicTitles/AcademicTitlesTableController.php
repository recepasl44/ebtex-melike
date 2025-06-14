<?php

namespace App\Http\Controllers\Backend\AcademicTitles;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\AcademicTitles\AcademicTitleRepository;
use App\Http\Requests\Backend\AcademicTitles\ManageAcademicTitleRequest;

/**
 * Class AcademicTitlesTableController.
 */
class AcademicTitlesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AcademicTitleRepository
     */
    protected $academictitle;

    /**
     * contructor to initialize repository object
     * @param AcademicTitleRepository $academictitle;
     */
    public function __construct(AcademicTitleRepository $academictitle)
    {
        $this->academictitle = $academictitle;
    }

    /**
     * This method return the data of the model
     * @param ManageAcademicTitleRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAcademicTitleRequest $request)
    {
        return Datatables::of($this->academictitle->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($academictitle) {
                return Carbon::parse($academictitle->created_at)->toDateString();
            })
            ->addColumn('actions', function ($academictitle) {
                return $academictitle->action_buttons;
            })
            ->make(true);
    }
}
