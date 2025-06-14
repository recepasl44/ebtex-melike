<?php

namespace App\Http\Controllers\Backend\BookPackages;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\BookPackages\BookPackageRepository;
use App\Http\Requests\Backend\BookPackages\ManageBookPackageRequest;

/**
 * Class BookPackagesTableController.
 */
class BookPackagesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookPackageRepository
     */
    protected $bookpackage;

    /**
     * contructor to initialize repository object
     * @param BookPackageRepository $bookpackage;
     */
    public function __construct(BookPackageRepository $bookpackage)
    {
        $this->bookpackage = $bookpackage;
    }

    /**
     * This method return the data of the model
     * @param ManageBookPackageRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBookPackageRequest $request)
    {
        return Datatables::of($this->bookpackage->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($bookpackage) {
                return Carbon::parse($bookpackage->created_at)->toDateString();
            })
            ->addColumn('actions', function ($bookpackage) {
                return $bookpackage->action_buttons;
            })
            ->make(true);
    }
}
