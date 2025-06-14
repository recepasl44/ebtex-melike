<?php

namespace App\Http\Controllers\Backend\QuizNotes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizNotes\QuizNoteRepository;
use App\Http\Requests\Backend\QuizNotes\ManageQuizNoteRequest;

/**
 * Class QuizNotesTableController.
 */
class QuizNotesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizNoteRepository
     */
    protected $quiznote;

    /**
     * contructor to initialize repository object
     * @param QuizNoteRepository $quiznote;
     */
    public function __construct(QuizNoteRepository $quiznote)
    {
        $this->quiznote = $quiznote;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizNoteRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizNoteRequest $request)
    {
        return Datatables::of($this->quiznote->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quiznote) {
                return Carbon::parse($quiznote->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quiznote) {
                return $quiznote->action_buttons;
            })
            ->make(true);
    }
}
