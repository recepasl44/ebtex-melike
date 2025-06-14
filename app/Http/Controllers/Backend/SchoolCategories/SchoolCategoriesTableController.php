<?php

namespace App\Http\Controllers\Backend\SchoolCategories;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\SchoolCategories\SchoolCategoryRepository;
use App\Http\Requests\Backend\SchoolCategories\ManageSchoolCategoryRequest;

/**
 * Class SchoolCategoriesTableController.
 */
class SchoolCategoriesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SchoolCategoryRepository
     */
    protected $schoolcategory;

    /**
     * contructor to initialize repository object
     * @param SchoolCategoryRepository $schoolcategory;
     */
    public function __construct(SchoolCategoryRepository $schoolcategory)
    {
        $this->schoolcategory = $schoolcategory;
    }

    /**
     * This method return the data of the model
     * @param ManageSchoolCategoryRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSchoolCategoryRequest $request)
    {
        return Datatables::of($this->schoolcategory->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($schoolcategory) {
                return Carbon::parse($schoolcategory->created_at)->toDateString();
            })
            ->addColumn('actions', function ($schoolcategory) {
                return $schoolcategory->action_buttons;
            })
            ->make(true);
    }
}
