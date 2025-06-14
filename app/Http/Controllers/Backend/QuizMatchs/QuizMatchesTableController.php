<?php

namespace App\Http\Controllers\Backend\QuizMatchs;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizMatchs\QuizMatchRepository;
use App\Http\Requests\Backend\QuizMatchs\ManageQuizMatchRequest;

/**
 * Class QuizMatchesTableController.
 */
class QuizMatchesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizMatchRepository
     */
    protected $quizmatch;

    /**
     * contructor to initialize repository object
     * @param QuizMatchRepository $quizmatch;
     */
    public function __construct(QuizMatchRepository $quizmatch)
    {
        $this->quizmatch = $quizmatch;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizMatchRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizMatchRequest $request)
    {
        return Datatables::of($this->quizmatch->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizmatch) {
                return Carbon::parse($quizmatch->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizmatch) {
                return $quizmatch->action_buttons;
            })
            ->make(true);
    }
}
