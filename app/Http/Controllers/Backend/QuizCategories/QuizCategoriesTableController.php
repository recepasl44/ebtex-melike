<?php

namespace App\Http\Controllers\Backend\QuizCategories;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\QuizCategories\QuizCategoryRepository;
use App\Http\Requests\Backend\QuizCategories\ManageQuizCategoryRequest;

/**
 * Class QuizCategoriesTableController.
 */
class QuizCategoriesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizCategoryRepository
     */
    protected $quizcategory;

    /**
     * contructor to initialize repository object
     * @param QuizCategoryRepository $quizcategory;
     */
    public function __construct(QuizCategoryRepository $quizcategory)
    {
        $this->quizcategory = $quizcategory;
    }

    /**
     * This method return the data of the model
     * @param ManageQuizCategoryRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageQuizCategoryRequest $request)
    {
        return Datatables::of($this->quizcategory->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($quizcategory) {
                return Carbon::parse($quizcategory->created_at)->toDateString();
            })
            ->addColumn('actions', function ($quizcategory) {
                return $quizcategory->action_buttons;
            })
            ->make(true);
    }
}
