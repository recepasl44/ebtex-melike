<?php

namespace App\Http\Controllers\Backend\Words;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Words\WordRepository;
use App\Http\Requests\Backend\Words\ManageWordRequest;

/**
 * Class WordsTableController.
 */
class WordsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var WordRepository
     */
    protected $word;

    /**
     * contructor to initialize repository object
     * @param WordRepository $word;
     */
    public function __construct(WordRepository $word)
    {
        $this->word = $word;
    }

    /**
     * This method return the data of the model
     * @param ManageWordRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageWordRequest $request)
    {
        return Datatables::of($this->word->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('lang', function ($word) {
                return $word->lang?_tr('labels.backend.words.table.'.$word->lang):'';
            })
            ->addColumn('created_at', function ($word) {
                return Carbon::parseToDate($word->created_at);
            })
            ->addColumn('actions', function ($word) {
                return $word->action_buttons;
            })
            ->make(true);
    }
}
