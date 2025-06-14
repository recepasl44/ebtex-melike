<?php

namespace App\Http\Controllers\Backend\BookQuestions;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\BookQuestions\BookQuestionRepository;
use App\Http\Requests\Backend\BookQuestions\ManageBookQuestionRequest;

/**
 * Class BookQuestionsTableController.
 */
class BookQuestionsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookQuestionRepository
     */
    protected $bookquestion;

    /**
     * contructor to initialize repository object
     * @param BookQuestionRepository $bookquestion;
     */
    public function __construct(BookQuestionRepository $bookquestion)
    {
        $this->bookquestion = $bookquestion;
    }

    /**
     * This method return the data of the model
     * @param ManageBookQuestionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBookQuestionRequest $request)
    {
        return Datatables::of($this->bookquestion->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($bookquestion) {
                return Carbon::parse($bookquestion->created_at)->toDateString();
            })
            ->addColumn('actions', function ($bookquestion) {
                return $bookquestion->action_buttons;
            })
            ->make(true);
    }
}
