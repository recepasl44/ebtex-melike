<?php

namespace App\Http\Controllers\Backend\Chapters;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Chapters\ChapterRepository;
use App\Http\Requests\Backend\Chapters\ManageChapterRequest;

/**
 * Class ChaptersTableController.
 */
class ChaptersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ChapterRepository
     */
    protected $chapter;

    /**
     * contructor to initialize repository object
     * @param ChapterRepository $chapter;
     */
    public function __construct(ChapterRepository $chapter)
    {
        $this->chapter = $chapter;
    }

    /**
     * This method return the data of the model
     * @param ManageChapterRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageChapterRequest $request)
    {
        return Datatables::of($this->chapter->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($chapter) {
                return Carbon::parse($chapter->created_at)->toDateString();
            })
            ->addColumn('actions', function ($chapter) {
                return $chapter->action_buttons;
            })
            ->make(true);
    }
}
