<?php

namespace App\Http\Controllers\Backend\BookQuizs;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\BookQuizs\BookQuizRepository;
use App\Http\Requests\Backend\BookQuizs\ManageBookQuizRequest;

/**
 * Class BookQuizzesTableController.
 */
class BookQuizzesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookQuizRepository
     */
    protected $bookquiz;

    /**
     * contructor to initialize repository object
     * @param BookQuizRepository $bookquiz;
     */
    public function __construct(BookQuizRepository $bookquiz)
    {
        $this->bookquiz = $bookquiz;
    }

    /**
     * This method return the data of the model
     * @param ManageBookQuizRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBookQuizRequest $request)
    {
        return Datatables::of($this->bookquiz->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($bookquiz) {
                return Carbon::parse($bookquiz->created_at)->toDateString();
            })
            ->addColumn('actions', function ($bookquiz) {
                return $bookquiz->action_buttons;
            })
            ->make(true);
    }
}
